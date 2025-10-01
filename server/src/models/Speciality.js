import { DataTypes } from 'sequelize';
import { sequelize } from '../db.js';
import { Category } from './Category.js';
export const Speciality = sequelize.define('Speciality',{
  id:{type:DataTypes.INTEGER,autoIncrement:true,primaryKey:true},
  name:{type:DataTypes.STRING(100),allowNull:false,unique:true},
  category_id:{type:DataTypes.INTEGER,allowNull:false}
},{tableName:'specialities',timestamps:false});
Category.hasMany(Speciality,{foreignKey:'category_id'});
Speciality.belongsTo(Category,{foreignKey:'category_id'});
