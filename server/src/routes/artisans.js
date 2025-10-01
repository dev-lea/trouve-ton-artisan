import { Router } from "express";
import {
  listArtisans,
  getArtisan,
  contactArtisan,
  contactValidation,
} from "../controllers/artisans.controller.js";

const r = Router();

r.get("/", listArtisans);
r.get("/:id", getArtisan);
r.post("/:id/contact", contactValidation, contactArtisan);

export default r;
