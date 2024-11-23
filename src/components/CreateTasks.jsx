import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

function CreateTasks() {
    const [task, setTask] = useState({
        title: "",
        description: "",
        date: "",
    });
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setTask((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!task.title || !task.description || !task.date) {
            setError("All fields are required!");
            return;
        }

        try {
            const response = await fetch("http://localhost:5000/tasks", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(task),
            });

            if (!response.ok) {
                throw new Error("Failed to create task");
            }

            navigate("/");
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <section
            style={{
                padding: "40px 20px",
                backgroundColor: "#ECF0F1",
                minHeight: "100vh",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
            }}
        >
            <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                style={{
                    backgroundColor: "#FFFFFF",
                    padding: "40px",
                    borderRadius: "12px",
                    boxShadow: "0 6px 10px rgba(0, 0, 0, 0.15)",
                    width: "100%",
                    maxWidth: "500px",
                }}
            >
                <h1
                    style={{
                        fontSize: "2rem",
                        color: "#2C3E50",
                        marginBottom: "20px",
                        textAlign: "center",
                        fontWeight: "bold",
                    }}
                >
                    Create a New Task
                </h1>
                {error && (
                    <p
                        style={{
                            color: "red",
                            textAlign: "center",
                            marginBottom: "20px",
                        }}
                    >
                        {error}
                    </p>
                )}
                <form onSubmit={handleSubmit}>
                    <div style={formGroupStyle}>
                        <label style={labelStyle} htmlFor="title">
                            Title
                        </label>
                        <input
                            style={inputStyle}
                            type="text"
                            id="title"
                            name="title"
                            value={task.title}
                            onChange={handleChange}
                        />
                    </div>
                    <div style={formGroupStyle}>
                        <label style={labelStyle} htmlFor="description">
                            Description
                        </label>
                        <textarea
                            style={{ ...inputStyle, height: "100px" }}
                            id="description"
                            name="description"
                            value={task.description}
                            onChange={handleChange}
                        />
                    </div>
                    <div style={formGroupStyle}>
                        <label style={labelStyle} htmlFor="date">
                            Date
                        </label>
                        <input
                            style={inputStyle}
                            type="date"
                            id="date"
                            name="date"
                            value={task.date}
                            onChange={handleChange}
                        />
                    </div>
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        style={submitButtonStyle}
                        type="submit"
                    >
                        Add Task
                    </motion.button>
                </form>
            </motion.div>
        </section>
    );
}

const formGroupStyle = {
    marginBottom: "20px",
    display: "flex",
    flexDirection: "column",
};

const labelStyle = {
    marginBottom: "8px",
    fontSize: "1rem",
    fontWeight: "bold",
    color: "#2C3E50",
};

const inputStyle = {
    padding: "10px",
    fontSize: "1rem",
    borderRadius: "8px",
    border: "1px solid #BDC3C7",
    outline: "none",
    transition: "border 0.3s",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
};

const submitButtonStyle = {
    width: "100%",
    padding: "10px",
    fontSize: "16px",
    fontWeight: "bold",
    color: "#FFFFFF",
    backgroundColor: "#3498DB",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    transition: "all 0.3s ease",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
};

export default CreateTasks;
