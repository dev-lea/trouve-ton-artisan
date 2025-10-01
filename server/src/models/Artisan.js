import { DataTypes } from 'sequelize';
import { sequelize } from '../db.js';
import { Speciality } from './Speciality.js';
export const Artisan = sequelize.define('Artisan',{
  id:{type:DataTypes.INTEGER,autoIncrement:true,primaryKey:true},
  name:{type:DataTypes.STRING(150),allowNull:false},
  rating:{type:DataTypes.DECIMAL(3,1),allowNull:false,defaultValue:0},
  about:{type:DataTypes.TEXT},
  email:{type:DataTypes.STRING(255)},
  website:{type:DataTypes.STRING(255)},
  city:{type:DataTypes.STRING(120)},
  department:{type:DataTypes.STRING(120)},
  speciality_id:{type:DataTypes.INTEGER,allowNull:false},
  is_top:{type:DataTypes.BOOLEAN,allowNull:false,defaultValue:false}
},{tableName:'artisans',timestamps:false});
Speciality.hasMany(Artisan,{foreignKey:'speciality_id'});
Artisan.belongsTo(Speciality,{foreignKey:'speciality_id'});
