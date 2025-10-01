import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import rateLimit from 'express-rate-limit';
import { connectDB } from './db.js';
import categoriesRoute from './routes/categories.js';
import specialitiesRoute from './routes/specialities.js';
import artisansRoute from './routes/artisans.js';

const app = express();
app.use(helmet());
app.use(cors({ origin: process.env.CORS_ORIGIN || true }));
app.use(express.json());
app.use(morgan('dev'));
app.use('/api', rateLimit({ windowMs: 60 * 1000, max: 100 }));

app.use('/api/categories', categoriesRoute);
app.use('/api/specialities', specialitiesRoute);
app.use('/api/artisans', artisansRoute);

app.use((req, res) => res.status(404).json({ message: 'Not found' }));

const port = process.env.PORT || 4000;
connectDB().then(() => app.listen(port, () => console.log(`API on http://localhost:${port}`)));
