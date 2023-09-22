import express from "express";
import controllers from '../controllers/controller';
import sessionMiddleware from '../middlewares/sessionMiddleware';

const router = express.Router();

router.route('/').post(sessionMiddleware, controllers);

export default router;