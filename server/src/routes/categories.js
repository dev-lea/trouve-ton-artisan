import { Router } from 'express';
import { listCategories } from '../controllers/categories.controller.js';
const r = Router();
r.get('/', listCategories);
export default r;
