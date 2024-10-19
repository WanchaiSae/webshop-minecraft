import express from 'express';
import { getUserId, login, register } from '../controllers/authController';
import { authenticateJWT } from '../middlewares/authorization';
const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/:userId', authenticateJWT, getUserId)

export default router;
