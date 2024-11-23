import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

function Navbar() {
    const navigate = useNavigate();

    const handleAllTasks = () => navigate('/');
    const handleCompletedTasks = () => navigate('/completed');
    const handleCreateTask = () => navigate('/create')

    return (
        <nav
            style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                gap: "20px",
                padding: "10px 20px",
                backgroundColor: "#2C3E50", // Dark blue-gray
                boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
            }}
        >
            <motion.button
                whileHover={{ scale: 1.1, backgroundColor: "#3498DB" }}
                whileTap={{ scale: 0.95 }}
                style={buttonStyle}
                onClick={handleAllTasks}
            >
                All Tasks
            </motion.button>
            <motion.button
                whileHover={{ scale: 1.1, backgroundColor: "#3498DB" }}
                whileTap={{ scale: 0.95 }}
                style={buttonStyle}
                onClick={handleCreateTask}
            >
               Create task
            </motion.button>
        </nav>
    );
}

const buttonStyle = {
    padding: "10px 20px",
    fontSize: "16px",
    fontWeight: "bold",
    color: "#FFFFFF", // White
    backgroundColor: "#34495E", // Muted dark blue
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
    transition: "all 0.3s ease",
};

export default Navbar;
