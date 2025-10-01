import { Sequelize } from 'sequelize';
export const sequelize = new Sequelize(process.env.DATABASE_URL, { dialect: 'mysql', logging: false });
export async function connectDB(){ await sequelize.authenticate(); }
