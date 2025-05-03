import React, { useEffect, useState } from "react";
import "./HomeScreen.css";
import ProjectDetailsPanel from "./ProjectDetailsPanel"; // yeni bileşeni ekliyoruz

type Project = {
  name: string;
  config: string;
  createdAt: string;
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
                <button className="btn open small" onClick={() => setSelectedProject(proj)}>
                  📂 Open Project
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Eğer bir proje seçildiyse detay panelini göster */}
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
