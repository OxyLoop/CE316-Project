import { useNavigate } from "react-router-dom";
import { useState } from "react";
import "./HomeScreen.css";
import OpenProjectPanel from "./OpenProjectPanel";

const HomeScreen = () => {
  const navigate = useNavigate();
  const [showOpenPanel, setShowOpenPanel] = useState(false);

  return (
    <div className="container">
      {showOpenPanel && <OpenProjectPanel onClose={() => setShowOpenPanel(false)} />}

      <h1 className="title">Integrated Assignment Environment</h1>
      <p className="subtitle">Organize, Manage and Evaluate Assignments Easily</p>

      <div className="button-group">
        <button className="btn new" onClick={() => navigate("/new")}>
          📁 New Project
        </button>

        <button className="btn open" onClick={() => setShowOpenPanel(true)}>
          📂 Open Project
        </button>

        <button className="btn help" onClick={() => navigate("/configurations")}>
        🛠️ Configurations
        </button>

        <button className="btn help">❓ Help</button>
      </div>

      <div className="footer">© 2025 316-Project | Version 1.0.0</div>
    </div>
  );
};

export default HomeScreen;
