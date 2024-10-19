import express from 'express';
import { getUserId, login, register } from '../controllers/authController';
const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/:userId', getUserId)

export default router;
