import Task from "../models/taskModel.js";

// Get all tasks
export const getAllTasks = async (request, response) => {
    try {
        const tasks = await Task.find();
        response.status(200).json(tasks);
    } catch (err) {
        response.status(500).json({ error: "Failed to fetch tasks" });
    }
};

// Get completed tasks
export const getCompletedTasks = async (request, response) => {
    try {
        const tasks = await Task.find({ isCompleted: true });
        response.status(200).json(tasks);
    } catch (err) {
        response.status(500).json({ error: "Failed to fetch completed tasks" });
    }
};

// Create a new task
export const createTask = async (request, response) => {
    const { title, description, date } = request.body;

    if (!title || !description || !date) {
        return response.status(400).json({ error: "All fields are requestuired" });
    }

    try {
        const newTask = new Task({ title, description, date });
        await newTask.save();
        response.status(201).json(newTask);
    } catch (err) {
        response.status(500).json({ error: "Failed to create the task" });
    }
};

//Get task by id
export const getTaskById = async (request, response) => {
    try {
        const task = await Task.findById(request.params.id);

        if (!task) {
            return response.status(404).json({ error: "Task not found" });
        }
        response.status(200).json(task);
    } catch (err) {
        response.status(500).json({ error: "Failed to fetch the task" });
    }
};

// Update a task
export const updateTask = async (request, response) => {
    const { title, description, date } = request.body;
    
    try {
        const updatedTask = await Task.findByIdAndUpdate(
            request.params.id,
            { title, description, date },
            { new: true, runValidators: true }
        );

        if (!updatedTask) {
            return response.status(404).json({ error: "Task not found" });
        }

        response.status(200).json(updatedTask);
    } catch (err) {
        response.status(500).json({ error: "Failed to update the task" });
    }
};

// Mark task as completed
export const markTaskAsCompleted = async (request, response) => {
    try {
        const updatedTask = await Task.findByIdAndUpdate(
            request.params.id,
            { isCompleted: true },
            { new: true }
        );

        console.log(updateTask);
        

        if (!updatedTask) {
            console.log('coming from herre');
            
            return response.status(404).json({ error: "Task not found" });
        }

        response.status(200).json(updatedTask);
    } catch (err) {
        response.status(500).json({ error: "Failed to mark task as completed" });
    }
};

// Delete a task
export const deleteTask = async (request, response) => {
    try {
        const deletedTask = await Task.findByIdAndDelete(request.params.id);

        if (!deletedTask) {
            return response.status(404).json({ error: "Task not found" });
        }

        response.status(200).json({ message: "Task deleted successfully" });
    } catch (err) {
        response.status(500).json({ error: "Failed to delete the task" });
    }
};

