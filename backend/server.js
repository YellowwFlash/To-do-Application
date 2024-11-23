import dotenv from "dotenv";
dotenv.config({ path: 'backend/.env' });
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import taskRoutes from "./routes/taskRoutes.js";

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
console.log(process.env.PORT);

mongoose
    .connect(process.env.MONGO_URI)
    .then(() => console.log("Connected to MongoDB"))
    .catch((err) => console.error("MongoDB connection error:", err));

// Routes
app.use("/tasks", taskRoutes);

// Start Server
const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
