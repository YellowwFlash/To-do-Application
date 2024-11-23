import mongoose from "mongoose";
import dotenv from "dotenv";
import Task from "./models/taskModel.js"; // Adjust the path if needed

dotenv.config(); // Load environment variables

const seedTasks = async () => {
    const fakeTasks = [
        {
            title: "Prepare Meeting Notes",
            description: "Compile all the notes for the upcoming meeting.",
            date: new Date("2024-11-25"),
            isCompleted: false,
        },
        {
            title: "Code Review",
            description: "Review the pull requests on the new feature branch.",
            date: new Date("2024-11-24"),
            isCompleted: false,
        },
        {
            title: "Design Mockups",
            description: "Create initial design mockups for the new project.",
            date: new Date("2024-11-30"),
            isCompleted: true,
        },
        {
            title: "Team Retrospective",
            description: "Reflect on the past sprint and plan for the next.",
            date: new Date("2024-12-01"),
            isCompleted: false,
        },
        {
            title: "Finalize Presentation",
            description: "Finalize slides for the client presentation.",
            date: new Date("2024-12-05"),
            isCompleted: true,
        },
    ];

    try {
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("Connected to MongoDB");

        // Clear existing data
        await Task.deleteMany();
        console.log("Existing tasks cleared");

        // Insert fake tasks
        await Task.insertMany(fakeTasks);
        console.log("Fake tasks seeded successfully");

        // Close the connection
        mongoose.connection.close();
    } catch (err) {
        console.error("Error seeding data:", err);
        mongoose.connection.close();
    }
};

seedTasks();
