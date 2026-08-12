import React, { useEffect, useState } from "react";
import { getProjects, sendMessage } from "./api";
import { profile } from "./data/profile";

function Navbar() {
  return (
    <header className="navbar">
      <a href="#home" className="logo">
        {profile.name}
      </a>

      <nav>
        <a href="#about">About</a>
        <a href="#skills">Skills</a>
        <a href="#projects">Projects</a>
        <a href="#contact">Contact</a>
      </nav>
    </header>
  );
}

function Hero() {
  return (
    <section id="home" className="hero section">
      <div className="hero-text">
        <p className="eyebrow">HELLO, I'M</p>

        <h1>{profile.name}</h1>

        <h2>{profile.role}</h2>

        <p className="hero-description">
          {profile.tagline}
        </p>

        <div className="button-row">
          <a className="button primary" href="#projects">
            View Projects
          </a>

          <a className="button secondary" href="#contact">
            Contact Me
          </a>
        </div>
      </div>

      <div className="hero-card">
        <div className="avatar">
          {profile.name
            .split(" ")
            .filter(Boolean)
            .slice(0, 2)
            .map((word) => word[0])
            .join("")
            .toUpperCase()}
        </div>

        <p>{profile.location}</p>

        <span>Available for opportunities</span>
      </div>
    </section>
  );
}

function About() {
  return (
    <section id="about" className="section">
      <div className="section-heading">
        <p className="eyebrow">ABOUT ME</p>

        <h2>Building useful things with code.</h2>
      </div>

      <div className="about-grid">
        <p>{profile.about}</p>

        <div className="about-box">
          <strong>Focus</strong>
          <span>Frontend Development</span>
          <span>Backend APIs</span>
          <span>Database Integration</span>
          <span>Deployment</span>
        </div>
      </div>
    </section>
  );
}

function Skills() {
  return (
    <section id="skills" className="section muted-section">
      <div className="section-heading">
        <p className="eyebrow">MY SKILLS</p>

        <h2>Technologies I work with.</h2>
      </div>

      <div className="skills-grid">
        {Object.entries(profile.skills).map(([category, skills]) => (
          <div className="skill-card" key={category}>
            <h3>{category}</h3>

            <div className="chips">
              {skills.map((skill) => (
                <span className="chip" key={skill}>
                  {skill}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function Projects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    getProjects()
      .then((data) => {
        setProjects(data);
      })
      .catch((error) => {
        console.error(error);
        setError(
          "Could not load projects. Please make sure the backend is running."
        );
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <section id="projects" className="section">
      <div className="section-heading">
        <p className="eyebrow">PROJECTS</p>

        <h2>Things I have built.</h2>
      </div>

      {loading && <p>Loading projects...</p>}

      {error && <p className="error-text">{error}</p>}

      <div className="projects-grid">
        {projects.map((project, index) => (
          <article className="project-card" key={project.id}>
            <div className="project-number">
              {String(index + 1).padStart(2, "0")}
            </div>

            <h3>{project.title}</h3>

            <p>{project.description}</p>

            <div className="chips">
              {project.technologies
                ?.split(",")
                .map((technology) => technology.trim())
                .filter(Boolean)
                .map((technology) => (
                  <span className="chip" key={technology}>
                    {technology}
                  </span>
                ))}
            </div>

            <div className="project-links">
              {project.github_url && (
                <a
                  href={project.github_url}
                  target="_blank"
                  rel="noreferrer"
                >
                  GitHub ↗
                </a>
              )}

              {project.live_url && (
                <a
                  href={project.live_url}
                  target="_blank"
                  rel="noreferrer"
                >
                  Live Demo ↗
                </a>
              )}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: ""
  });

  const [status, setStatus] = useState("");

  function handleChange(event) {
    setForm({
      ...form,
      [event.target.name]: event.target.value
    });
  }

  async function handleSubmit(event) {
    event.preventDefault();

    setStatus("Sending...");

    try {
      await sendMessage(form);

      setStatus("Message sent successfully!");

      setForm({
        name: "",
        email: "",
        message: ""
      });
    } catch (error) {
      console.error(error);

      setStatus(
        error.message || "Could not send the message."
      );
    }
  }

  return (
    <section id="contact" className="section contact-section">
      <div className="section-heading">
        <p className="eyebrow">CONTACT</p>

        <h2>Let's work together.</h2>

        <p>
          Send me a message. Your message will be saved in the
          MySQL database through the Express backend.
        </p>
      </div>

      <form className="contact-form" onSubmit={handleSubmit}>
        <div className="form-row">
          <label>
            Name

            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Your name"
              required
              minLength="2"
            />
          </label>

          <label>
            Email

            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="you@example.com"
              required
            />
          </label>
        </div>

        <label>
          Message

          <textarea
            name="message"
            value={form.message}
            onChange={handleChange}
            placeholder="Write your message..."
            rows="6"
            required
            minLength="5"
          />
        </label>

        <button className="button primary" type="submit">
          Send Message
        </button>

        {status && (
          <p className="form-status">
            {status}
          </p>
        )}
      </form>
    </section>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <div>
        <strong>{profile.name}</strong>

        <p>Full-Stack Developer</p>
      </div>

      <div className="socials">
        <a
          href={profile.github}
          target="_blank"
          rel="noreferrer"
        >
          GitHub
        </a>

        <a
          href={profile.linkedin}
          target="_blank"
          rel="noreferrer"
        >
          LinkedIn
        </a>

        <a href={`mailto:${profile.email}`}>
          Email
        </a>
      </div>
    </footer>
  );
}

export default function App() {
  return (
    <>
      <Navbar />

      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Contact />
      </main>

      <Footer />
    </>
  );
}
