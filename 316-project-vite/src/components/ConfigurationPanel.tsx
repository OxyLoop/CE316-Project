import React, { useState } from "react";
import "./HomeScreen.css";

type Props = {
  onClose: () => void;
};

const ConfigurationPanel: React.FC<Props> = ({ onClose }) => {
  const [configName, setConfigName] = useState("");
  const [language, setLanguage] = useState("");
  const [inputFormat, setInputFormat] = useState("");
  const [expectedOutput, setExpectedOutput] = useState("");

  const handleAddConfig = () => {
    if (!configName || !language) {
      alert("Please fill required fields.");
      return;
    }

    const newConfig = {
      name: configName,
      language,
      inputFormat,
      expectedOutput,
    };

    // Mevcutları oku
    const existing = JSON.parse(localStorage.getItem("configurations") || "[]");

    // Yeni konfigürasyonu listeye ekle
    const updated = [...existing, newConfig];

    // Geri kaydet
    localStorage.setItem("configurations", JSON.stringify(updated));

    alert("✅ Configuration added!");
    onClose(); // Paneli kapat
  };

  return (
    <div className="config-panel-overlay">
      <div className="config-panel">
        <button className="close-btn" onClick={onClose}>
          ❌
        </button>
        <h2>Manage Configurations</h2>

        <label>Configuration Name:</label>
        <input value={configName} onChange={(e) => setConfigName(e.target.value)} />

        <label>Language:</label>
        <select value={language} onChange={(e) => setLanguage(e.target.value)}>
          <option value="">Select Language</option>
          <option value="C">C</option>
          <option value="Java">Java</option>
          <option value="Python">Python</option>
        </select>

        <label>Input Format:</label>
        <input value={inputFormat} onChange={(e) => setInputFormat(e.target.value)} />

        <label>Expected Output Format:</label>
        <input value={expectedOutput} onChange={(e) => setExpectedOutput(e.target.value)} />

        <button className="btn new" style={{ marginTop: "15px" }} onClick={handleAddConfig}>
          Add Configuration
        </button>
      </div>
    </div>
  );
};

export default ConfigurationPanel;
