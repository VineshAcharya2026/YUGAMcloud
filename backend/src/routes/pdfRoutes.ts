import { Router } from 'express';
import { generatePayslip } from '../controllers/pdfController';

const router = Router();

router.post('/payslip', generatePayslip);

export default router;
