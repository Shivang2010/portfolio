import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mysql from "mysql2/promise";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173"
  })
);

app.use(express.json());

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

app.get("/", (req, res) => {
  res.json({
    message: "Portfolio API is running"
  });
});

app.get("/api/health", async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT 1 AS connected");

    res.json({
      database: "MySQL connected",
      result: rows
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      database: "MySQL connection failed",
      error: error.message
    });
  }
});

app.get("/api/projects", async (req, res) => {
  try {
    const [projects] = await pool.query(
      "SELECT * FROM projects ORDER BY created_at DESC"
    );

    res.json(projects);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to load projects"
    });
  }
});

app.post("/api/projects", async (req, res) => {
  try {
    const {
      title,
      description,
      technologies,
      github_url,
      live_url
    } = req.body;

    if (!title || !description) {
      return res.status(400).json({
        message: "Title and description are required"
      });
    }

    const [result] = await pool.query(
      `INSERT INTO projects
      (title, description, technologies, github_url, live_url)
      VALUES (?, ?, ?, ?, ?)`,
      [
        title,
        description,
        technologies || "",
        github_url || "",
        live_url || ""
      ]
    );

    res.status(201).json({
      message: "Project created successfully",
      id: result.insertId
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to create project"
    });
  }
});

app.put("/api/projects/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const {
      title,
      description,
      technologies,
      github_url,
      live_url
    } = req.body;

    const [result] = await pool.query(
      `UPDATE projects
      SET title = ?,
          description = ?,
          technologies = ?,
          github_url = ?,
          live_url = ?
      WHERE id = ?`,
      [
        title,
        description,
        technologies || "",
        github_url || "",
        live_url || "",
        id
      ]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({
        message: "Project not found"
      });
    }

    res.json({
      message: "Project updated successfully"
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to update project"
    });
  }
});

app.delete("/api/projects/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const [result] = await pool.query(
      "DELETE FROM projects WHERE id = ?",
      [id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({
        message: "Project not found"
      });
    }

    res.json({
      message: "Project deleted successfully"
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to delete project"
    });
  }
});

app.post("/api/messages", async (req, res) => {
  try {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({
        message: "Name, email and message are required"
      });
    }

    const [result] = await pool.query(
      `INSERT INTO messages (name, email, message)
      VALUES (?, ?, ?)`,
      [name, email, message]
    );

    res.status(201).json({
      message: "Message saved successfully",
      id: result.insertId
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to save message"
    });
  }
});

app.get("/api/messages", async (req, res) => {
  try {
    const [messages] = await pool.query(
      "SELECT * FROM messages ORDER BY created_at DESC"
    );

    res.json(messages);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to load messages"
    });
  }
});

async function startServer() {
  try {
    const connection = await pool.getConnection();

    console.log("MySQL connected successfully");

    connection.release();

    app.listen(PORT, () => {
      console.log(`Server running at http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("MySQL connection failed:", error.message);
    process.exit(1);
  }
}

startServer();