import React from "react";

export type ResultModalProps = {
  isCorrect: boolean;
  expected: string;
  actual: string;
  projectName: string;
  onClose: () => void;
};

const ResultModal: React.FC<ResultModalProps> = ({ isCorrect, expected, actual, projectName, onClose }) => {
  return (
    <div
      style={{
        position: "fixed",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        backgroundColor: "#fff",
        color: "#000",
        padding: "30px",
        borderRadius: "12px",
        boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
        zIndex: 9999,
        width: "400px",
        textAlign: "center"
      }}
    >
      <h2 style={{ color: isCorrect ? "#4caf50" : "#f44336" }}>
        {isCorrect ? "✅ Correct Output" : "❌ Incorrect Output"}
      </h2>

      <h4 style={{ marginTop: "10px", color: "#333" }}>
        Project: <strong>{projectName}</strong>
      </h4>

      <div style={{ textAlign: "left", marginTop: "20px" }}>
        <p><strong>Expected:</strong> {expected}</p>
        <p><strong>Actual:</strong> {actual}</p>
      </div>

      <button
        onClick={onClose}
        style={{
          marginTop: "20px",
          backgroundColor: "#6200ea",
          color: "#fff",
          padding: "10px 20px",
          border: "none",
          borderRadius: "8px",
          cursor: "pointer"
        }}
      >
        OK
      </button>
    </div>
  );
};

export default ResultModal;
