import express from 'express';
import { getInternalZones, createInternalZone } from '../controllers/internalZonesController.js';
const router = express.Router();
router.get('/', getInternalZones);
router.post('/', createInternalZone);
export default router;