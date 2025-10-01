import { Router } from 'express';
import { listSpecialities } from '../controllers/specialities.controller.js';
const r = Router();
r.get('/', listSpecialities);
export default r;
