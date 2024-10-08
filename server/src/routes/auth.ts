import express from 'express';
import { login, register } from '../controllers/authController';
import { authenticateJWT } from '../middlewares/authorization';
const router = express.Router();

router.post('/register', register);
router.get('/login', login);

export default router;
