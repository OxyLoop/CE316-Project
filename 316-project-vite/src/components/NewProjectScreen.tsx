import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./HomeScreen.css";

const NewProjectScreen = () => {
  const [projectName, setProjectName] = useState("");
  const [selectedConfig, setSelectedConfig] = useState("");
  const [configList] = useState(["C", "Java", "Python"]);
  const navigate = useNavigate();

  const handleCreateProject = () => {
    if (!projectName || !selectedConfig) {
      alert("Please, fill all fields.");
      return;
    }

    console.log("Project Created:", projectName, selectedConfig);

    // Burada proje verisi saklanabilir 

    navigate("/dashboard");
  };

  return (
    <div className="container">
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
          <option key={idx} value={conf}>
            {conf} Programming
          </option>
        ))}
      </select>

      <div style={{ display: "flex", gap: "10px" }}>
        <button className="btn new" onClick={handleCreateProject}>
          ➕ Create
        </button>
        <button
          className="btn help"
          onClick={() => alert("Creating new configuration!")}
        >
          ⚙️ New Configuration
        </button>
      </div>
    </div>
  );
};

export default NewProjectScreen;
