import React, { useEffect, useState } from "react";
import "./HomeScreen.css";

type Config = {
  name: string;
  language: string;
  inputFormat: string;
  expectedOutput: string;
};

type Props = {
  onClose: () => void;
  editConfig?: Config | null;
};

const ConfigurationPanel: React.FC<Props> = ({ onClose, editConfig }) => {
  const [configName, setConfigName] = useState("");
  const [language, setLanguage] = useState("");
  const [inputFormat, setInputFormat] = useState("");
  const [expectedOutput, setExpectedOutput] = useState("");

  // Düzenleme modundaysa var olan değerleri set et
  useEffect(() => {
    if (editConfig) {
      setConfigName(editConfig.name);
      setLanguage(editConfig.language);
      setInputFormat(editConfig.inputFormat);
      setExpectedOutput(editConfig.expectedOutput);
    }
  }, [editConfig]);

  // Kaydetme işlemi
  const handleSave = () => {
    if (!configName || !language) {
      alert("Please fill required fields.");
      return;
    }

    const newConfig: Config = {
      name: configName,
      language,
      inputFormat,
      expectedOutput,
    };

    const existing: Config[] = JSON.parse(localStorage.getItem("configurations") || "[]");

    const updated = editConfig
      ? existing.map((conf) =>
          conf.name === editConfig.name ? newConfig : conf
        )
      : [...existing, newConfig];

    localStorage.setItem("configurations", JSON.stringify(updated));
    alert(editConfig ? "✅ Configuration updated!" : "✅ Configuration added!");
    onClose();
  };

  return (
    <div className="config-panel-overlay">
      <div className="config-panel">
        <button className="close-btn" onClick={onClose}>❌</button>
        <h2>{editConfig ? "Edit Configuration" : "Create New Configuration"}</h2>

        <label>Configuration Name:</label>
        <input
          value={configName}
          onChange={(e) => setConfigName(e.target.value)}
          disabled={!!editConfig}
          placeholder="Example: Sorting Algorithm"
        />

        <label>Language:</label>
        <select value={language} onChange={(e) => setLanguage(e.target.value)}>
          <option value="">Select Language</option>
          <option value="C">C</option>
          <option value="Java">Java</option>
          <option value="Python">Python</option>
        </select>

        <label>Input Values:</label>
        <input
          value={inputFormat}
          onChange={(e) => setInputFormat(e.target.value)}
          placeholder="Example: 5 10 15"
        />

        <label>Expected Output:</label>
        <input
          value={expectedOutput}
          onChange={(e) => setExpectedOutput(e.target.value)}
          placeholder="Example: 30"
        />

        <button className="btn new" style={{ marginTop: "15px" }} onClick={handleSave}>
          {editConfig ? "💾 Save Changes" : "➕ Create Configuration"}
        </button>
      </div>
    </div>
  );
};

export default ConfigurationPanel;
