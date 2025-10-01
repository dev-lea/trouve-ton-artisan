import { Speciality } from '../models/Speciality.js';
export async function listSpecialities(req,res){
  const { categoryId } = req.query;
  const where = categoryId ? { category_id: categoryId } : undefined;
  const rows = await Speciality.findAll({ where, order:[['name','ASC']] });
  res.json(rows);
}
