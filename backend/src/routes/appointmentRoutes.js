import { Router } from 'express';
import { createAppointment } from '../controllers/appointmentController.js';

const router = Router();

router.post('/appointments', createAppointment);

export default router;
