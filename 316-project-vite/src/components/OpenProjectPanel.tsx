import React, { useEffect, useState } from "react";
import "./HomeScreen.css";
import ProjectDetailsPanel from "./ProjectDetailsPanel";

type Project = {
  name: string;
  config: string;
  createdAt: string;
  filePath: string;
};

type Props = {
  onClose: () => void;
};

const OpenProjectPanel: React.FC<Props> = ({ onClose }) => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("projects") || "[]");
    setProjects(saved);
  }, []);

  const handleOpen = (proj: any) => {
    const completeProject: Project = {
      ...proj,
      filePath: proj.filePath || "",
    };
    setSelectedProject(completeProject);
  };

  const handleDelete = (index: number) => {
    if (!window.confirm("⚠️ Are you sure you want to delete this project?")) return;

    const updated = [...projects];
    updated.splice(index, 1);

    localStorage.setItem("projects", JSON.stringify(updated));
    setProjects(updated);
  };

  return (
    <div className="open-panel-overlay">
      <div className="open-panel">
        <button className="close-btn" onClick={onClose}>❌</button>
        <h2>📁 Existing Projects</h2>

        {projects.length === 0 ? (
          <p>No projects found.</p>
        ) : (
          <ul className="project-list">
            {projects.map((proj, idx) => (
              <li key={idx} className="project-card">
                <h3>{proj.name}</h3>
                <p>🛠 Config: {proj.config}</p>
                <p>📅 Created: {new Date(proj.createdAt).toLocaleString()}</p>
                
                <div style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
                  <button className="btn open small" onClick={() => handleOpen(proj)}>
                    📂 Open Project
                  </button>
                  <button className="btn help small" onClick={() => handleDelete(idx)}>
                    🗑️ Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

      {selectedProject && (
        <ProjectDetailsPanel
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}
    </div>
  );
};

export default OpenProjectPanel;
