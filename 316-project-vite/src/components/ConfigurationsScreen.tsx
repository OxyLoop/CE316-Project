// 📁 src/ConfigurationsScreen.tsx
import React, { useState, useEffect } from "react";
import "./HomeScreen.css";

type Config = {
  name: string;
  language: string;
  inputFormat: string;
  expectedOutput: string;
};

type Props = {
  onClose?: () => void;
};

const ConfigurationsScreen: React.FC<Props> = ({ onClose }) => {
  const [configs, setConfigs] = useState<Config[]>([]);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [editData, setEditData] = useState<Config>({
    name: "",
    language: "",
    inputFormat: "",
    expectedOutput: "",
  });

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("configurations") || "[]");
    setConfigs(stored);
  }, []);

  const handleDelete = (index: number) => {
    const updated = configs.filter((_, i) => i !== index);
    setConfigs(updated);
    localStorage.setItem("configurations", JSON.stringify(updated));
  };

  const handleEdit = (index: number) => {
    setEditingIndex(index);
    setEditData(configs[index]);
  };

  const handleSaveEdit = () => {
    if (editingIndex === null) return;
    const updated = [...configs];
    updated[editingIndex] = editData;
    setConfigs(updated);
    localStorage.setItem("configurations", JSON.stringify(updated));
    setEditingIndex(null);
  };

  // ✅ Export: config'leri JSON dosyası olarak indir
  const handleExport = () => {
    const blob = new Blob([JSON.stringify(configs, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "configurations_backup.json";
    a.click();
    URL.revokeObjectURL(url);
  };

  // ✅ Import: seçilen JSON dosyasından config'leri içeri al
  const handleImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const json = JSON.parse(event.target?.result as string);
        if (Array.isArray(json)) {
          localStorage.setItem("configurations", JSON.stringify(json));
          setConfigs(json);
          alert("✅ Configurations imported successfully!");
        } else {
          alert("⚠️ Invalid configuration file.");
        }
      } catch (err) {
        alert("❌ Failed to import configuration file.");
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className="open-panel-overlay">
      <div className="open-panel">
        {onClose && (
          <button className="close-btn" onClick={onClose}>
            ❌
          </button>
        )}
        <h2>📚 Configuration List</h2>
        <p className="subtitle">Manage your saved configurations</p>

        <div style={{ display: "flex", gap: "10px", marginBottom: "15px" }}>
  <button className="config-action-btn" onClick={handleExport}>
    📤 Export
  </button>
  <label className="config-action-btn">
    📥 Import
    <input type="file" accept=".json" onChange={handleImport} />
  </label>
</div>

        {configs.length === 0 ? (
          <p>No configurations saved yet.</p>
        ) : (
          configs.map((conf, idx) => (
            <div key={idx} className="config-card">
              {editingIndex === idx ? (
                <>
                  <input
                    value={editData.name}
                    onChange={(e) => setEditData({ ...editData, name: e.target.value })}
                    placeholder="Name"
                  />
                  <select
                    value={editData.language}
                    onChange={(e) => setEditData({ ...editData, language: e.target.value })}
                  >
                    <option value="C">C</option>
                    <option value="Java">Java</option>
                    <option value="Python">Python</option>
                  </select>
                  <input
                    value={editData.inputFormat}
                    onChange={(e) => setEditData({ ...editData, inputFormat: e.target.value })}
                    placeholder="Input Format"
                  />
                  <input
                    value={editData.expectedOutput}
                    onChange={(e) => setEditData({ ...editData, expectedOutput: e.target.value })}
                    placeholder="Expected Output"
                  />
                  <button className="btn new" onClick={handleSaveEdit}>
                    💾 Save
                  </button>
                </>
              ) : (
                <>
                  <h4>🛠 {conf.name}</h4>
                  <p><strong>Language:</strong> {conf.language}</p>
                  <p><strong>Input Format:</strong> {conf.inputFormat}</p>
                  <p><strong>Expected Output:</strong> {conf.expectedOutput}</p>
                  <div style={{ display: "flex", gap: "10px" }}>
                    <button className="btn help" onClick={() => handleEdit(idx)}>✏️ Edit</button>
                    <button className="btn help" onClick={() => handleDelete(idx)}>🗑 Delete</button>
                  </div>
                </>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ConfigurationsScreen;
