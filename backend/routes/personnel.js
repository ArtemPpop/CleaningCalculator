import express from 'express';
import { getPersonnel, createPersonnel } from '../controllers/personnelController.js';
const router = express.Router();
router.get('/', getPersonnel);
router.post('/', createPersonnel);
export default router;