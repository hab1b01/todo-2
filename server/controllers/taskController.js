import { insertTask, selectAllTasks, deleteTask } from "../models/task.js";
import { emptyOrRows } from "../helpers/utils.js";

const getTasks = async (req, res, next) => {
  try {
    const result = await selectAllTasks();
    return res.status(200).json(emptyOrRows(result));
  } catch (error) {
    next(error);
  }
};

const createTask = async (req, res, next) => {
  try {
    if (!req.body.description || req.body.description.length === 0) {
      return res.status(400).json({ error: "Description is required" });
    }
    const result = await insertTask(req.body.description);
    return res.status(200).json(result.rows[0]);
  } catch (error) {
    next(error);
  }
};

const removeTask = async (req, res, next) => {
  try {
    const id = Number.parseInt(req.params.id);
    console.log("deleteId", id);
    await deleteTask(id);
    res.status(200).json({ id });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export { getTasks, createTask, removeTask };
