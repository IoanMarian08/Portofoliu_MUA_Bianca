import express from 'express';
import cors from 'cors';
import { env } from './config/env.js';
import appointmentRoutes from './routes/appointmentRoutes.js';

const app = express();

app.use(
  cors({
    origin: env.frontendUrl
  })
);
app.use(express.json());

app.get('/api/health', (_req, res) => {
  res.json({ success: true, message: 'Backend is running.' });
});

app.use('/api', appointmentRoutes);

app.use((err, _req, res, _next) => {
  console.error('Unhandled server error:', err.message);
  res.status(500).json({
    success: false,
    message: 'Unexpected server error.'
  });
});

export default app;
