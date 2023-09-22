import express from "express";
import { logout, register, login } from '../controllers/authControllers';
import sessionConfig from '../utils/sessionConfig';
import session from 'express-session';

const router = express.Router();

router.post('/logout', session(sessionConfig), logout);
router.post('/register', session(sessionConfig), register);
router.post('/login', session(sessionConfig), login);

export default router;