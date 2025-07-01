import express from 'express';
import { getObjectsByClient, createObject } from '../controllers/objectsController.js';

const router = express.Router();

router.get('/client/:clientId', getObjectsByClient);
router.post('/', createObject);

export default router;