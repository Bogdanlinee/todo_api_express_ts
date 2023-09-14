import express from "express";
import {
  getAllTasks,
  createOneTask,
  updateOneTask,
  deleteOneTask
} from '../controllers/tasksControllers';

const router = express.Router();

router.route('/')
  .get(getAllTasks)
  .post(createOneTask)
  .put(updateOneTask)
  .delete(deleteOneTask)

export default router;