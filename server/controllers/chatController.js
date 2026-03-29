import Task from "../models/Task.js";
import axios from "axios";

export const chat = async (req, res) => {
  try {
    const { message } = req.body;

    const tasks = await Task.find({ userId: req.user });

    const taskList = tasks.length
      ? tasks.map(t =>
          `${t.title} | Priority:${t.priority} | Status:${t.status}`
        ).join("\n")
      : "User currently has no tasks.";

    const prompt = `
You are a productivity assistant.

User tasks:
${taskList}

User question:
${message}

Respond clearly and helpfully.
`;

    const response = await axios.post(
      `${process.env.OLLAMA_URL}/api/generate`,
      {
        model: "llama3",
        prompt: prompt,
        stream: false
      }
    );

    res.json({
      reply: response.data.response
    });

  } catch (error) {
    console.error("OLLAMA ERROR:", error.message);

    res.status(500).json({
      error: "AI response failed"
    });
  }
};