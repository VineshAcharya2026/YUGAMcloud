import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import dotenv from 'dotenv';
import authRoutes from './routes/authRoutes';
import pdfRoutes from './routes/pdfRoutes';
import { sequelize } from './config/database';

dotenv.config();
const app = express();

// Security Middlewares
app.use(helmet());
app.use(cors({ origin: process.env.FRONTEND_URL, credentials: true }));
app.use(express.json());

// Rate Limiting (DDoS Protection)
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP
});
app.use(limiter);

// Routes
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/documents', pdfRoutes);

const PORT = process.env.PORT || 3001;
sequelize.sync().then(() => {
  app.listen(PORT, () => console.log(`🚀 API active on port ${PORT}`));
}).catch(console.error);
