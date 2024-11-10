import { auth } from "../helpers/auth.js";
import pool from "../helpers/db.js";
import { Router } from "express";
import { emptyOrRows } from "../helpers/utils.js";
import {
  createTask,
  getTasks,
  removeTask,
} from "../controllers/taskController.js";

const router = Router();

router.get("/", getTasks);

router.post("/create", auth, createTask);

router.delete("/delete/:id", removeTask);

export default router;
