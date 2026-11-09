import { about } from "./data/about";
import { contacts } from "./data/contact";
import { projects, Project } from "./data/projects";
import { skills } from "./data/skills";

function ProjectItem({ project }: { project: Project }) {
  return (
    <li className="project">
      <div className="project-head">
        <h3>
          {project.url ? (
            <a href={project.url} target="_blank" rel="noreferrer">
              {project.title}
              <span className="arrow" aria-hidden="true">↗</span>
            </a>
          ) : (
            project.title
          )}
        </h3>
        <p className="tech">{project.tech.join(" · ")}</p>
      </div>
      <p>{project.description}</p>
    </li>
  );
}

export default function App() {
  const work = projects.filter((p) => p.category === "WORK");
  const personal = projects.filter((p) => p.category === "PERSONAL");

  return (
    <main className="page">
      <header>
        <h1>{about.name}</h1>
        <p className="role">
          {about.role} · {about.location}
        </p>
        <p className="bio">{about.bio}</p>
        <nav className="links" aria-label="Contact">
          {contacts.map((c) => (
            <a
              key={c.label}
              href={c.href}
              {...(c.href.startsWith("http") ? { target: "_blank", rel: "noreferrer" } : {})}
            >
              {c.label}
            </a>
          ))}
          <a href="/resume.pdf" target="_blank" rel="noreferrer">
            Resume
          </a>
        </nav>
      </header>

      <section aria-labelledby="work">
        <h2 id="work">Work</h2>
        <ul className="projects">
          {work.map((p) => (
            <ProjectItem key={p.id} project={p} />
          ))}
        </ul>
      </section>

      <section aria-labelledby="personal">
        <h2 id="personal">Personal projects</h2>
        <ul className="projects">
          {personal.map((p) => (
            <ProjectItem key={p.id} project={p} />
          ))}
        </ul>
      </section>

      <section aria-labelledby="skills">
        <h2 id="skills">Skills</h2>
        <ul className="skills">
          {skills.map((s) => (
            <li key={s}>{s}</li>
          ))}
        </ul>
      </section>

      <footer>
        <p>
          Get in touch at{" "}
          <a href="mailto:siedervillareal@gmail.com">siedervillareal@gmail.com</a>
        </p>
        <p className="muted">© {new Date().getFullYear()} {about.name}</p>
      </footer>
    </main>
  );
}
