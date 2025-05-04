import React from "react";
import ReactDOM from "react-dom";
import "./HomeScreen.css";

type Props = {
  isCorrect: boolean;
  expected: string;
  actual: string;
  onClose: () => void;
};

const ResultModal: React.FC<Props> = ({ isCorrect, expected, actual, onClose }) => {
  return ReactDOM.createPortal(
    <div className="result-modal-overlay">
      <div className="result-modal">
        <h2>{isCorrect ? "✅ Doğru Çıktı" : "❌ Yanlış Çıktı"}</h2>
        <p><strong>Çıktı:</strong> {actual}</p>
        {!isCorrect && <p><strong>Beklenen:</strong> {expected}</p>}
        <button onClick={onClose}>Tamam</button>
      </div>
    </div>,
    document.body
  );
};

export default ResultModal;
