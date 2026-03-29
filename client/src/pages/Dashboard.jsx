import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { gsap } from "gsap";

import {
  getTasks,
  createTask,
  deleteTask,
  completeTask,
} from "../services/taskService";

import Chatbot from "../components/Chatbot";

function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [priority, setPriority] = useState("Medium");

  const [showChat, setShowChat] = useState(false); // ✅ AI state

  const navigate = useNavigate();

  useEffect(() => {
    loadTasks();

    gsap.from(".fade-in", {
     
      y: 30,
      duration: 0.8,
      stagger: 0.1,
    });
  }, []);

  const loadTasks = async () => {
    const data = await getTasks();
    setTasks(data);
  };

  const handleCreate = async () => {
    if (!title) return alert("Title required");

    await createTask({ title, description, priority, dueDate });

    setTitle("");
    setDescription("");
    setDueDate("");

    loadTasks();
  };

  const handleDelete = async (id) => {
    await deleteTask(id);
    loadTasks();
  };

  const handleComplete = async (id) => {
    await completeTask(id);
    loadTasks();
  };

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div className="container">

      {/* Header */}
      <div className="header fade-in">
        <h1>DARD Dashboard</h1>
        <button className="logout-btn" onClick={logout}>Logout</button>
      </div>

      {/* Create Task */}
      <div className="card create-card fade-in">
        <h3>Create Task</h3>

        <div className="grid grid-2">
          <input
            placeholder="Task Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <input
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        <div className="grid grid-2">
          <select value={priority} onChange={(e) => setPriority(e.target.value)}>
            <option>Low</option>
            <option>Medium</option>
            <option>High</option>
          </select>

          <input
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
          />
        </div>

        <button className="primary-btn" onClick={handleCreate}>
          Create Task
        </button>
      </div>

      {/* Tasks */}
      <div className="tasks-section fade-in">
        <h3>Your Tasks</h3>

        {tasks.length === 0 && (
          <p style={{ marginTop: "10px" }}>No tasks yet</p>
        )}

        <div className="grid">
          {tasks.map((task) => (
            <div key={task._id} className="card task-card">
              <h3>{task.title}</h3>
              <p>{task.description}</p>

              <div className="task-meta">
                <span className={`badge ${task.priority.toLowerCase()}`}>
                  {task.priority}
                </span>
                <span>{task.status}</span>
              </div>

              <div className="task-actions">
                <button onClick={() => handleComplete(task._id)}>
                  Complete
                </button>
                <button
                  className="danger"
                  onClick={() => handleDelete(task._id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ===== AI BUTTON ===== */}
      <br />
      <div className="ai-button" onClick={() => setShowChat(!showChat)}>
        <Chatbot/>
        
      </div>

      <br />

      {/* ===== CHAT POPUP ===== */}
      {/* {showChat && (
        <div className="chat-container">
          <Chatbot />
        </div>
      )} */}

    </div>
  );
}

export default Dashboard;