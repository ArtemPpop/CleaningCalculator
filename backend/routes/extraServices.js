import express from 'express';
import { getExtraServices, createExtraService } from '../controllers/extraServicesController.js';
const router = express.Router();
router.get('/', getExtraServices);
router.post('/', createExtraService);
export default router;