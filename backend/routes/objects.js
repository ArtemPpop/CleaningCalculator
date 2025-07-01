import express from 'express';
import { getObjects, createObject } from '../controllers/objectsController.js';

const router = express.Router();

router.get('/', getObjects);
router.post('/', createObject);

export default router;