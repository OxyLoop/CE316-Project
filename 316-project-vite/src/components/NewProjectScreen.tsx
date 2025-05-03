import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./HomeScreen.css";
import ConfigurationPanel from "./ConfigurationPanel";

const NewProjectScreen = () => {
  const [projectName, setProjectName] = useState("");
  const [selectedConfig, setSelectedConfig] = useState("");
  const [configList, setConfigList] = useState<{ name: string }[]>([]);
  const [showConfigPanel, setShowConfigPanel] = useState(false);
  const [selectedZips, setSelectedZips] = useState<FileList | null>(null);
  const navigate = useNavigate();

  // localStorage'dan config'leri yükle
  useEffect(() => {
    const configs = JSON.parse(localStorage.getItem("configurations") || "[]");
    setConfigList(configs);
  }, [showConfigPanel]);

  const handleCreateProject = () => {
    if (!projectName || !selectedConfig) {
      alert("Please, fill all fields.");
      return;
    }

    const newProject = {
      name: projectName,
      config: selectedConfig,
      createdAt: new Date().toISOString(),
    };

    const existingProjects = JSON.parse(localStorage.getItem("projects") || "[]");
    const updatedProjects = [...existingProjects, newProject];
    localStorage.setItem("projects", JSON.stringify(updatedProjects));

    alert("✅ Project Created!");
    setProjectName("");
    setSelectedConfig("");
  };

  return (
    <div className="container">
      <button className="back-btn" onClick={() => navigate("/")}>
        ⬅️ Home
      </button>

      {showConfigPanel && <ConfigurationPanel onClose={() => setShowConfigPanel(false)} />}

      <h2 className="title">Create New Project</h2>
      <p className="subtitle">Set up your project with configurations</p>

      <input
        type="text"
        placeholder="Project Name"
        value={projectName}
        onChange={(e) => setProjectName(e.target.value)}
        style={{
          padding: "10px",
          fontSize: "16px",
          marginBottom: "15px",
          borderRadius: "10px",
          width: "60%",
        }}
      />

      <select
        value={selectedConfig}
        onChange={(e) => setSelectedConfig(e.target.value)}
        style={{
          padding: "10px",
          fontSize: "16px",
          marginBottom: "15px",
          borderRadius: "10px",
          width: "60%",
        }}
      >
        <option value="">Select Configuration</option>
        {configList.map((conf, idx) => (
          <option key={idx} value={conf.name}>
            {conf.name}
          </option>
        ))}
      </select>

      <label>📦 Select ZIP File(s)</label>
      <input
        type="file"
        multiple
        accept=".zip"
        onChange={(e) => {
          const fileList = e.target.files;
          setSelectedZips(fileList);
        }}
        style={{ marginBottom: "15px" }}
      />

      <div style={{ display: "flex", gap: "10px" }}>
        <button className="btn new" onClick={handleCreateProject}>
          ➕ Create
        </button>
        <button className="btn help" onClick={() => setShowConfigPanel(true)}>
          ⚙️ Create New Configuration
        </button>
      </div>
    </div>
  );
};

export default NewProjectScreen;
