import React, { useState, ChangeEvent } from "react";
import "./HomeScreen.css";

type StudentResult = {
  studentID: string;
  status: string;
};

const ProjectDashboard: React.FC = () => {
  const [zipFolder, setZipFolder] = useState<string>("");
  const [expectedOutput, setExpectedOutput] = useState<string>("");
  const [results, setResults] = useState<StudentResult[]>([]);
  const [cmdArgs, setCmdArgs] = useState<string>("");

  const handleEvaluation = () => {
    if (!zipFolder || !expectedOutput) {
      alert("Please select both ZIP folder and expected output file.");
      return;
    }

    const argsArray = cmdArgs.trim().split(/\s+/);
    console.log("Evaluation Starting With:");
    console.log("ZIP Folder Path:", zipFolder);
    console.log("Expected Output File:", expectedOutput);
    console.log("Command Line Arguments:", argsArray);

    const dummyResults: StudentResult[] = [
      { studentID: "20230001", status: "✅ Success" },
      { studentID: "20230002", status: "❌ Compilation Error" },
      { studentID: "20230003", status: "⚠️ Wrong Output" },
    ];

    setResults(dummyResults);
  };

  return (
    <div className="container">
      <h2 className="title">📊 Project Dashboard</h2>
      <p className="subtitle">Manage and evaluate student submissions</p>

      <label>💬 Enter Command Line Arguments</label>
      <input
        type="text"
        placeholder="e.g. banana apple lemon"
        value={cmdArgs}
        onChange={(e: ChangeEvent<HTMLInputElement>) => setCmdArgs(e.target.value)}
        style={{ padding: "10px", width: "60%", borderRadius: "10px", marginBottom: "15px" }}
      />

      <label>📦 Select Student ZIP Folder</label>
      <input
        type="file"
        multiple
        ref={(ref) => {
          if (ref) (ref as any).webkitdirectory = true;
        }}
        onChange={(e: ChangeEvent<HTMLInputElement>) => {
          const fileList = e.target.files;
          if (fileList && fileList.length > 0) {
            setZipFolder(fileList[0].webkitRelativePath.split("/")[0]);
          }
        }}
        style={{ marginBottom: "15px" }}
      />

      <label>📄 Select Expected Output File (.txt)</label>
      <input
        type="file"
        accept=".txt"
        onChange={(e: ChangeEvent<HTMLInputElement>) => {
          const file = e.target.files?.[0];
          if (file) setExpectedOutput(file.name);
        }}
        style={{ marginBottom: "20px" }}
      />

      <button className="btn open" onClick={handleEvaluation}>
        ▶️ Start Evaluation
      </button>

      {results.length > 0 && (
        <div style={{ marginTop: "30px", width: "80%" }}>
          <h3>🧾 Evaluation Results:</h3>
          <table style={{ width: "100%", marginTop: "10px", borderCollapse: "collapse" }}>
            <thead>
              <tr>
                <th style={{ borderBottom: "1px solid #ccc", padding: "10px" }}>Student ID</th>
                <th style={{ borderBottom: "1px solid #ccc", padding: "10px" }}>Status</th>
              </tr>
            </thead>
            <tbody>
              {results.map((res, i) => (
                <tr key={i}>
                  <td style={{ padding: "10px", textAlign: "center" }}>{res.studentID}</td>
                  <td style={{ padding: "10px", textAlign: "center" }}>{res.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ProjectDashboard;
