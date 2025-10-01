import { Op } from "sequelize";
import { Artisan } from "../models/Artisan.js";
import { Speciality } from "../models/Speciality.js";
import { body, validationResult } from "express-validator";
import nodemailer from "nodemailer";

/* ========= Utils ========= */

function parseBool(v) {
  if (v === undefined || v === null) return undefined;
  const s = String(v).toLowerCase();
  return s === "1" || s === "true";
}

function clamp(n, min, max) {
  const x = Number(n);
  if (Number.isNaN(x)) return min;
  return Math.max(min, Math.min(max, x));
}

/* ========= GET /api/artisans ========= */
/**
 * Query params supportés:
 * - search: string (LIKE sur name)
 * - department: string (égalité)
 * - specialityId: number (égalité)
 * - category: number (filtre via la table Speciality.category_id)
 * - is_top: boolean-like (1/true/0/false)
 * - limit: number (1..100)
 * - offset: number (>=0)
 */
export async function listArtisans(req, res) {
  try {
    const {
      search = "",
      specialityId,
      department,
      category,
      is_top,
      limit,
      offset,
    } = req.query;

    const where = {};
    if (search) where.name = { [Op.like]: `%${search}%` };
    if (department) where.department = department;
    if (specialityId) where.speciality_id = Number(specialityId);

    const isTop = parseBool(is_top);
    if (typeof isTop === "boolean") where.is_top = isTop;

    const include = [
      {
        model: Speciality,
        attributes: ["id", "name", "category_id"],
        ...(category ? { where: { category_id: Number(category) } } : {}),
      },
    ];

    const findOptions = {
      where,
      include,
      attributes: [
        "id",
        "name",
        "rating",
        "about",
        "email",
        "website",
        "photo",       // <-- champ image
        "city",
        "department",
        "is_top",
      ],
      order: [["name", "ASC"]],
    };

    // pagination optionnelle
    if (limit !== undefined) findOptions.limit = clamp(limit, 1, 100);
    if (offset !== undefined) findOptions.offset = Math.max(0, Number(offset) || 0);

    const rows = await Artisan.findAll(findOptions);
    res.json(rows);
  } catch (err) {
    console.error("listArtisans error:", err);
    res.status(500).json({ message: "Erreur serveur" });
  }
}

/* ========= GET /api/artisans/:id ========= */
export async function getArtisan(req, res) {
  try {
    const row = await Artisan.findByPk(req.params.id, {
      include: [{ model: Speciality, attributes: ["id", "name", "category_id"] }],
      attributes: [
        "id",
        "name",
        "rating",
        "about",
        "email",
        "website",
        "photo",      // <-- champ image
        "city",
        "department",
        "is_top",
      ],
    });
    if (!row) return res.status(404).json({ message: "Not found" });
    res.json(row);
  } catch (err) {
    console.error("getArtisan error:", err);
    res.status(500).json({ message: "Erreur serveur" });
  }
}

/* ========= Validation POST /api/artisans/:id/contact ========= */
export const contactValidation = [
  body("name").isLength({ min: 2 }).trim().escape(),
  body("email").isEmail().normalizeEmail(),
  body("subject").isLength({ min: 2, max: 120 }).trim().escape(),
  body("message").isLength({ min: 10, max: 2000 }).trim(),
];

/* ========= POST /api/artisans/:id/contact ========= */
export async function contactArtisan(req, res) {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(400).json({ errors: errors.array() });

    const artisan = await Artisan.findByPk(req.params.id);
    if (!artisan || !artisan.email) {
      return res.status(404).json({ message: "Artisan introuvable" });
    }

    // En dev: si pas de config SMTP, on loggue simplement
    if (!process.env.SMTP_HOST) {
      console.log("[MAIL DEV] ->", {
        to: artisan.email,
        from: process.env.SMTP_FROM || "no-reply@exemple.fr",
        subject: `[Trouve ton artisan] ${req.body.subject}`,
        replyTo: req.body.email,
        text: `${req.body.name} (${req.body.email})\n\n${req.body.message}`,
      });
      return res.json({ ok: true, dev: true });
    }

    // Envoi réel via SMTP
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT || 587),
      secure: false,
      auth: process.env.SMTP_USER
        ? { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS }
        : undefined,
    });

    await transporter.sendMail({
      from: process.env.SMTP_FROM || "no-reply@exemple.fr",
      to: artisan.email,
      subject: `[Trouve ton artisan] ${req.body.subject}`,
      replyTo: req.body.email,
      text: `${req.body.name} (${req.body.email})\n\n${req.body.message}`,
    });

    res.json({ ok: true });
  } catch (err) {
    console.error("contactArtisan error:", err);
    res.status(500).json({ message: "Erreur serveur" });
  }
}
