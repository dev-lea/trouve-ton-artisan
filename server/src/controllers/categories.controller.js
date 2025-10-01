import { Category } from '../models/Category.js';
export async function listCategories(req,res){
  const rows = await Category.findAll({ order:[['name','ASC']] });
  res.json(rows);
}
