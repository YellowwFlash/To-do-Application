import express from "express";
import {
    getAllTasks,
    getCompletedTasks,
    createTask,
    getTaskById,
    updateTask,
    deleteTask,
    markTaskAsCompleted,
} from "../controllers/taskController.js";

const router = express.Router();

router.get("/", getAllTasks);
router.get("/completed", getCompletedTasks);
router.post("/", createTask);
router.get("/:id", getTaskById);
router.put("/update/:id", updateTask);
router.put("/complete/:id", markTaskAsCompleted);
router.delete("/delete/:id", deleteTask);

export default router;
