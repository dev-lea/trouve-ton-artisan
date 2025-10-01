import { Op } from "sequelize";
import { Artisan } from "../models/Artisan.js";
import { Speciality } from "../models/Speciality.js";
import { body, validationResult } from "express-validator";
import nodemailer from "nodemailer";

// GET /api/artisans
export async function listArtisans(req, res) {
  const { search = "", specialityId, department, category, is_top } = req.query;

  const where = {};
  if (search) where.name = { [Op.like]: `%${search}%` };
  if (department) where.department = department;
  if (specialityId) where.speciality_id = Number(specialityId);

  // support de ?is_top=1 / true / 0 / false
  if (typeof is_top !== "undefined") {
    const v = String(is_top).toLowerCase();
    where.is_top = v === "1" || v === "true";
  }

  const include = [
    {
      model: Speciality,
      ...(category ? { where: { category_id: Number(category) } } : {}),
    },
  ];

  const rows = await Artisan.findAll({
    where,
    include,
    order: [["name", "ASC"]],
  });

  res.json(rows);
}

// GET /api/artisans/:id
export async function getArtisan(req, res) {
  const row = await Artisan.findByPk(req.params.id, {
    include: [{ model: Speciality }],
  });
  if (!row) return res.status(404).json({ message: "Not found" });
  res.json(row);
}

// Validation pour POST /api/artisans/:id/contact
export const contactValidation = [
  body("name").isLength({ min: 2 }).trim().escape(),
  body("email").isEmail().normalizeEmail(),
  body("subject").isLength({ min: 2, max: 120 }).trim().escape(),
  body("message").isLength({ min: 10, max: 2000 }).trim(),
];

// POST /api/artisans/:id/contact
export async function contactArtisan(req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

  const artisan = await Artisan.findByPk(req.params.id);
  if (!artisan || !artisan.email) {
    return res.status(404).json({ message: "Artisan introuvable" });
  }

  // Si aucune config SMTP, on "simule" l'envoi pour ne pas planter en dev
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
}
