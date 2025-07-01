import express from 'express';
import { getServicePeriods, createServicePeriod } from '../controllers/servicePeriodsController.js';
const router = express.Router();
router.get('/', getServicePeriods);
router.post('/', createServicePeriod);
export default router;