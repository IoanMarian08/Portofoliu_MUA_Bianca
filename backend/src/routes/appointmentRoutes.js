import { Router } from 'express';
import { createAppointment, createContactMessage } from '../controllers/appointmentController.js';

const router = Router();

router.post('/appointments', createAppointment);
router.post('/contact', createContactMessage);

export default router;
