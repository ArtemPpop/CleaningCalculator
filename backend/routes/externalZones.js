import express from 'express';
import { getExternalZones, createExternalZone } from '../controllers/externalZonesController.js';
const router = express.Router();
router.get('/', getExternalZones);
router.post('/', createExternalZone);
export default router;