import express from 'express';
import { getCostItems, createCostItem } from '../controllers/costItemsController.js';
const router = express.Router();
router.get('/', getCostItems);
router.post('/', createCostItem);
export default router;
