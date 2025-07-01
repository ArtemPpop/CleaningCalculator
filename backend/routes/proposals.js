import express from 'express';
import { getProposals, createProposal } from '../controllers/proposalsController.js';

const router = express.Router();

router.get('/', getProposals);
router.post('/', createProposal);

export default router;