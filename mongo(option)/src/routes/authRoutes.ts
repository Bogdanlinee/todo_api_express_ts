import express from "express";
import { logout, register, login } from '../controllers/authControllers';

const router = express.Router();

router.post('/logout', logout);
router.post('/register', register);
router.post('/login', login);

export default router;