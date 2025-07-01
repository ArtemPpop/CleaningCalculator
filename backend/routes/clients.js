import express from 'express';
import { getAllClients, createClient } from '../controllers/clientsController.js';

const router = express.Router();

router.get('/', getAllClients);
router.post('/', createClient);

export default router;