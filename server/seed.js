import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const projectSchema = new mongoose.Schema(
  {
    title: String,
    description: String,
    technologies: [String],
    githubUrl: String,
    liveUrl: String
  },
  { timestamps: true }
);

const Project = mongoose.model("Project", projectSchema);

const projects = [
  {
    title: "Personal Portfolio",
    description:
      "A full-stack portfolio website built to showcase my skills, projects and contact information.",
    technologies: ["React", "Node.js", "Express", "MongoDB"],
    githubUrl: "https://github.com/yourusername/portfolio",
    liveUrl: ""
  },
  {
    title: "Task Management App",
    description:
      "A task management application where users can create, update and delete tasks.",
    technologies: ["React", "Express", "MongoDB"],
    githubUrl: "https://github.com/yourusername/task-app",
    liveUrl: ""
  },
  {
    title: "Student Management System",
    description:
      "A CRUD application for managing student records with a REST API and database.",
    technologies: ["JavaScript", "Node.js", "Express", "MongoDB"],
    githubUrl: "https://github.com/yourusername/student-management",
    liveUrl: ""
  }
];

async function seed() {
  try {
    if (!process.env.MONGO_URI) {
      throw new Error("MONGO_URI is missing");
    }

    await mongoose.connect(process.env.MONGO_URI);
    await Project.deleteMany({});
    await Project.insertMany(projects);

    console.log("Sample projects inserted successfully.");
    await mongoose.disconnect();
  } catch (error) {
    console.error(error.message);
    process.exit(1);
  }
}

seed();
