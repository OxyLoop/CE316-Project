import React, { useEffect, useState } from "react";
import "./HomeScreen.css";
import ResultModal from "./ResultModal";

type Project = {
  name: string;
  config: string;
  createdAt: string;
  filePath: string; // ZIP dosyası yolu
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
  const [showResult, setShowResult] = useState(false);
  const [resultInfo, setResultInfo] = useState<{
    isCorrect: boolean;
    expected: string;
    actual: string;
  } | null>(null);

  useEffect(() => {
    const configs: Config[] = JSON.parse(localStorage.getItem("configurations") || "[]");
    const found = configs.find((c) => c.name === project.config);
    if (found) setConfigDetails(found);
  }, [project.config]);

  const handleEvaluate = async () => {
    if (!configDetails) {
      alert("❌ Config detayları eksik!");
      return;
    }

    if (!project.filePath) {
      alert("❌ ZIP dosyası bulunamadı!");
      return;
    }

    const args = configDetails.inputFormat.trim().split(" ").filter(Boolean);
    const expected = configDetails.expectedOutput.trim();
    const language = configDetails.language.toLowerCase();

    try {
      const result = await window.electronAPI.extractAndRun(project.filePath, args, language);

      if (result.error) {
        alert("⛔ Hata:\n" + result.error);
      } else {
        const actual = result.output.trim();
        const isCorrect = actual === expected;
        setResultInfo({ isCorrect, expected, actual });
        setShowResult(true);
      }
    } catch (err: any) {
      alert("⚠️ Exception:\n" + err.message);
    }
  };

  return (
    <>
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

      {showResult && resultInfo && (
        <ResultModal
          isCorrect={resultInfo.isCorrect}
          expected={resultInfo.expected}
          actual={resultInfo.actual}
          onClose={() => setShowResult(false)}
        />
      )}
    </>
  );
};

export default ProjectDetailsPanel;
