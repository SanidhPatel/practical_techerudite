import express from 'express';
import { registerUser, loginUser,verifyUserEmail } from '../controllers/usersController.js';

const router = express.Router();

router.post('/register',registerUser);

router.post('/login',loginUser);

router.get('/verify-email', verifyUserEmail);

export default router;