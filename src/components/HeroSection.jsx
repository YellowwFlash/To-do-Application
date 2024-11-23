import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

function HeroSection() {
    const [tasks, setTasks] = useState([]);
    const [filteredTasks, setFilteredTasks] = useState([]); // For filtered tasks
    const [searchTerm, setSearchTerm] = useState(""); // Title search term
    const [filterDate, setFilterDate] = useState(""); // Date filter
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const response = await fetch("http://localhost:5000/tasks");
                if (!response.ok) {
                    throw new Error("Failed to fetch tasks");
                }
                const data = await response.json();
                setTasks(data);
                setFilteredTasks(data); // Initialize filtered tasks
            } catch (err) {
                setError(err.message);
            } finally {
                setIsLoading(false);
            }
        };

        fetchTasks();
    }, []);

    // Filter tasks when search term or filter date changes
    useEffect(() => {
        let filtered = tasks;

        // Filter by title if search term exists
        if (searchTerm) {
            filtered = filtered.filter((task) =>
                task.title.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        // Filter by date if a filter date exists
        if (filterDate) {
            filtered = filtered.filter(
                (task) => new Date(task.date).toDateString() === new Date(filterDate).toDateString()
            );
        }

        setFilteredTasks(filtered);
    }, [searchTerm, filterDate, tasks]);

    const handleEdit = (id) => navigate(`/update/${id}`);
    const handleDelete = async (id) => {
        try {
            const response = await fetch(`http://localhost:5000/tasks/delete/${id}`, {
                method: "DELETE",
            });

            if (!response.ok) {
                throw new Error("Failed to delete task");
            }

            setTasks((tasks) => tasks.filter((task) => task._id !== id));
        } catch (error) {
            console.error(error.message);
        }
    };

    const handleComplete = async (id) => {
        try {
            const response = await fetch(`http://localhost:5000/tasks/complete/${id}`, {
                method: "PUT",
            });
            if (!response.ok) {
                throw new Error("Failed to mark task as complete");
            }
            const data = await response.json();

            setTasks((tasks) =>
                tasks.map((task) =>
                    task._id === id ? { ...data } : task
                )
            );
        } catch (err) {
            console.error(err.message);
        }
    };

    const isDueSoon = (taskDate) => {
        const today = new Date();
        const dateDiff = Math.ceil((new Date(taskDate) - today) / (1000 * 60 * 60 * 24));
        return dateDiff >= 0 && dateDiff <= 2; // Within 2 days from today
    };

    if (isLoading) {
        return (
            <div style={loaderStyle}>
                <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                    style={spinnerStyle}
                />
                <p style={loadingTextStyle}>Loading tasks...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div style={{ textAlign: "center", padding: "40px" }}>
                <p style={{ color: "red", fontSize: "18px" }}>
                    {error || "An error occurred while fetching tasks."}
                </p>
            </div>
        );
    }

    return (
        <section
            style={{
                padding: "40px 20px",
                backgroundColor: "#ECF0F1",
                minHeight: "100vh",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "20px",
            }}
        >
            <h1
                style={{
                    fontSize: "2.5rem",
                    color: "#2C3E50",
                    marginBottom: "20px",
                    fontWeight: "bold",
                }}
            >
                Your Tasks
            </h1>

            {/* Filter Section */}
            <div style={filterContainerStyle}>
                <input
                    type="text"
                    placeholder="Search by Title"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    style={filterInputStyle}
                />
                <input
                    type="date"
                    value={filterDate}
                    onChange={(e) => setFilterDate(e.target.value)}
                    style={filterDateStyle}
                />
            </div>

            <div
                style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
                    gap: "20px",
                    width: "100%",
                    maxWidth: "1200px",
                }}
            >
                {filteredTasks.map((task) => (
                    <motion.div
                        key={task._id}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        style={{
                            ...cardStyle,
                            boxShadow: "0 6px 10px rgba(0, 0, 0, 0.15)",
                            border: isDueSoon(task.date) ? "2px solid #E74C3C" : "none",
                        }}
                    >
                        <h2 style={cardTitleStyle}>{task.title}</h2>
                        <p style={cardDescriptionStyle}>{task.description}</p>
                        <p style={cardDateStyle}>
                            {new Date(task.date).toLocaleDateString("en-IN")}
                        </p>
                        <div style={cardActionsStyle}>
                            {!task.isCompleted &&
                                <motion.button
                                    whileHover={{ backgroundColor: "#3498DB" }}
                                    whileTap={{ scale: 0.95 }}
                                    style={buttonStyle}
                                    onClick={() => handleEdit(task._id)}
                                >
                                    Edit
                                </motion.button>
                            }
                            <motion.button
                                whileHover={{ backgroundColor: "#E74C3C" }}
                                whileTap={{ scale: 0.95 }}
                                style={{ ...buttonStyle, backgroundColor: "#C0392B" }}
                                onClick={() => handleDelete(task._id)}
                            >
                                Delete
                            </motion.button>
                            {!task.isCompleted &&
                                (
                                    <motion.button
                                        whileHover={{ backgroundColor: "#2ECC71" }}
                                        whileTap={{ scale: 0.95 }}
                                        style={{
                                            ...buttonStyle,
                                            backgroundColor: "#27AE60",
                                        }}
                                        onClick={() => handleComplete(task._id)}
                                    >
                                        Mark Complete
                                    </motion.button>
                                )}
                        </div>
                    </motion.div>
                ))}
            </div>
        </section>
    );
}

const filterContainerStyle = {
    display: "flex",
    gap: "10px",
    marginBottom: "20px",
    width: "100%",
    maxWidth: "1200px",
    justifyContent: "space-between",
};

const filterInputStyle = {
    flex: 1,
    padding: "10px",
    fontSize: "16px",
    borderRadius: "8px",
    border: "1px solid #BDC3C7",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
};

const filterDateStyle = {
    padding: "10px",
    fontSize: "16px",
    borderRadius: "8px",
    border: "1px solid #BDC3C7",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
};

const loaderStyle = {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    backgroundColor: "#ECF0F1",
};

const spinnerStyle = {
    width: "50px",
    height: "50px",
    border: "6px solid #BDC3C7",
    borderTop: "6px solid #3498DB",
    borderRadius: "50%",
    marginBottom: "20px",
};

const loadingTextStyle = {
    fontSize: "18px",
    color: "#2C3E50",
    fontWeight: "bold",
};

const cardStyle = {
    padding: "20px",
    backgroundColor: "#FFFFFF",
    borderRadius: "12px",
    transition: "all 0.3s ease",
};

const cardTitleStyle = {
    fontSize: "1.5rem",
    color: "#2C3E50",
    marginBottom: "10px",
    fontWeight: "bold",
};

const cardDescriptionStyle = {
    fontSize: "1rem",
    color: "#7F8C8D",
    marginBottom: "10px",
};

const cardDateStyle = {
    fontSize: "0.9rem",
    color: "#BDC3C7",
    marginBottom: "15px",
};

const cardActionsStyle = {
    display: "flex",
    gap: "10px",
    justifyContent: "flex-end",
};

const buttonStyle = {
    padding: "10px 20px",
    fontSize: "14px",
    fontWeight: "bold",
    color: "#FFFFFF",
    backgroundColor: "#34495E",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
    transition: "all 0.3s ease",
};

export default HeroSection;
