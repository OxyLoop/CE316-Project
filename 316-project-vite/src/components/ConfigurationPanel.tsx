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
  editConfig?: Config | null; // varsa düzenlenecek config
};

const ConfigurationPanel: React.FC<Props> = ({ onClose, editConfig }) => {
  const [configName, setConfigName] = useState("");
  const [language, setLanguage] = useState("");
  const [inputFormat, setInputFormat] = useState("");
  const [expectedOutput, setExpectedOutput] = useState("");

  // Eğer düzenleme modundaysa, alanları doldur
  useEffect(() => {
    if (editConfig) {
      setConfigName(editConfig.name);
      setLanguage(editConfig.language);
      setInputFormat(editConfig.inputFormat);
      setExpectedOutput(editConfig.expectedOutput);
    }
  }, [editConfig]);

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

    let updated;
    if (editConfig) {
      // 🔁 Düzenleme modu: eskiyi sil, yeniyi ekle
      updated = existing.map((conf) =>
        conf.name === editConfig.name ? newConfig : conf
      );
    } else {
      // ➕ Yeni ekleme
      updated = [...existing, newConfig];
    }

    localStorage.setItem("configurations", JSON.stringify(updated));

    alert(editConfig ? "✅ Configuration updated!" : "✅ Configuration added!");
    onClose();
  };

  return (
    <div className="config-panel-overlay">
      <div className="config-panel">
        <button className="close-btn" onClick={onClose}>❌</button>
        <h2>{editConfig ? "Edit Configuration" : "Add New Configuration"}</h2>

        <label>Configuration Name:</label>
        <input
          value={configName}
          onChange={(e) => setConfigName(e.target.value)}
          disabled={!!editConfig} // ismi değişmesin
        />

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

        <button className="btn new" style={{ marginTop: "15px" }} onClick={handleSave}>
          {editConfig ? "💾 Save Changes" : "➕ Add Configuration"}
        </button>
      </div>
    </div>
  );
};

export default ConfigurationPanel;
