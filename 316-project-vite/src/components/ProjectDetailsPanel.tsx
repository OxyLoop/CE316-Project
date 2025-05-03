import React, { useEffect, useState } from "react";
import "./HomeScreen.css"; // veya özel CSS dosyan varsa onu kullan

type Project = {
  name: string;
  config: string;
  createdAt: string;
};

type Config = {
  name: string;
  language: string;
  inputFormat: string;
  expectedOutput: string;
};

type Props = {
  project: Project;
  onClose: () => void;
};

const ProjectDetailsPanel: React.FC<Props> = ({ project, onClose }) => {
  const [configDetails, setConfigDetails] = useState<Config | null>(null);

  useEffect(() => {
    const configs: Config[] = JSON.parse(localStorage.getItem("configurations") || "[]");
    const found = configs.find((c) => c.name === project.config);
    if (found) setConfigDetails(found);
  }, [project.config]);

  const handleEvaluate = async () => {
    const language = (configDetails?.language || project.config).toLowerCase();
    const fileBase = `C:\\Users\\ardas\\Desktop\\CE316-Project\\test_programs\\Main`; // geçici yol
    const args = ["Arda"];

    if (!window.electronAPI) {
      alert("❌ Electron API bulunamadı!");
      return;
    }

    try {
      let result;

      if (language.includes("java")) {
        result = await window.electronAPI.runJava(`${fileBase}.java`, args);
      } else if (language.includes("c")) {
        result = await window.electronAPI.runC(`${fileBase}.c`, args);
      } else if (language.includes("python")) {
        result = await window.electronAPI.runPython(`${fileBase}.py`, args);
      } else {
        alert("⚠️ Bilinmeyen dil türü!");
        return;
      }

      if (result.error) {
        alert("⛔ Hata:\n" + result.error);
      } else {
        alert("✅ Çıktı:\n" + result.output);
      }
    } catch (err: any) {
      alert("⚠️ Exception:\n" + err.message);
    }
  };

  return (
    <div className="details-panel-overlay">
      <div className="details-panel">
        <button className="close-btn" onClick={onClose}>❌</button>
        <h2>📄 Project Details</h2>

        <p><strong>Name:</strong> {project.name}</p>
        <p><strong>Config:</strong> {project.config}</p>
        {configDetails && (
          <div className="config-info">
            <p>🧠 <strong>Language:</strong> {configDetails.language}</p>
            <p>📥 <strong>Input Format:</strong> {configDetails.inputFormat}</p>
            <p>📤 <strong>Expected Output:</strong> {configDetails.expectedOutput}</p>
          </div>
        )}
        <p><strong>Created At:</strong> {new Date(project.createdAt).toLocaleString()}</p>

        <button className="btn new" onClick={handleEvaluate}>
          ▶️ Evaluate
        </button>
      </div>
    </div>
  );
};

export default ProjectDetailsPanel;
