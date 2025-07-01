import express from 'express';
import { calculateProposal } from '../controllers/calculateController.js';

const router = express.Router();

router.post('/', calculateProposal);

export default router;