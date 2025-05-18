import React, { useEffect, useState } from "react";
import "./HomeScreen.css";
import ProjectDetailsPanel from "./ProjectDetailsPanel";
import ResultModal from "./ResultModal"


type Project = {
  name: string;
  config: string;
  createdAt: string;
  filePath: string;
};

type Config = {
  name: string;
  language: string;
  inputFormat: string;
  expectedOutput: string;
};

type Props = {
  onClose: () => void;
};

const OpenProjectPanel: React.FC<Props> = ({ onClose }) => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [currentResult, setCurrentResult] = useState<{
    projectName: string;
    isCorrect: boolean;
    expected: string;
    actual: string;
  } | null>(null);
  const [queueIndex, setQueueIndex] = useState(0);

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

  const handleEvaluateAllQueue = async (index: number) => {
    const configs: Config[] = JSON.parse(localStorage.getItem("configurations") || "[]");
    if (index >= projects.length) {
      alert("🎉 All evaluations completed.");
      return;
    }

    const project = projects[index];
    const config = configs.find(c => c.name === project.config);
    if (!config) {
      console.warn(`Config '${project.config}' not found.`);
      handleEvaluateAllQueue(index + 1);
      return;
    }

    const args = config.inputFormat.trim().split(" ").filter(Boolean);
    const expected = config.expectedOutput.trim();
    const language = config.language.toLowerCase();

const electronAPI = window.electronAPI as unknown as {
  extractAndRun: (zipPath: string, args: string[], language: string) => Promise<{ output: string; error: string }>;
};

const result = await electronAPI.extractAndRun(project.filePath, args, language);
    const actual = result.output.trim();
    const isCorrect = actual === expected;

    setCurrentResult({
      projectName: project.name,
      isCorrect,
      expected,
      actual,
    });

    setQueueIndex(index + 1);
  };

  const handleEvaluateAll = () => {
    setQueueIndex(0);
    handleEvaluateAllQueue(0);
  };

  return (
    <div className="open-panel-overlay">
      <div className="open-panel" style={{ display: "flex", flexDirection: "column", height: "100%" }}>
        <button className="close-btn" onClick={onClose}>❌</button>
        <h2>📁 Existing Projects</h2>

        {projects.length === 0 ? (
          <p>No projects found.</p>
        ) : (
          <>
            <div style={{ flex: 1, overflowY: "auto" }}>
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
            </div>

            <div style={{ paddingTop: "10px" }}>
              <button
                className="btn new"
                onClick={handleEvaluateAll}
                style={{
                  padding: "12px",
                  fontWeight: "bold",
                  fontSize: "15px",
                  backgroundColor: "#4caf50",
                  color: "white",
                  width: "100%",
                  borderRadius: "8px"
                }}
              >
                ▶️ Evaluate All Projects
              </button>
            </div>
          </>
        )}
      </div>

      {selectedProject && (
        <ProjectDetailsPanel
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}

      {currentResult && (
        <ResultModal
          isCorrect={currentResult.isCorrect}
          expected={currentResult.expected}
          actual={currentResult.actual}
          projectName={currentResult.projectName}
          onClose={() => {
            setCurrentResult(null);
            setTimeout(() => handleEvaluateAllQueue(queueIndex), 150);
          }}
        />
      )}
    </div>
  );
};

export default OpenProjectPanel;
