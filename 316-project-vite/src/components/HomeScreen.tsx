import { useNavigate } from "react-router-dom";
import { useState } from "react";
import "./HomeScreen.css";
import OpenProjectPanel from "./OpenProjectPanel";
import ConfigurationsScreen from "./ConfigurationsScreen";

declare global {
  interface Window {
    electronAPI: {
      openUserManual: () => Promise<void>;
    };
  }
}

const HomeScreen = () => {
  const navigate = useNavigate();
  const [showOpenPanel, setShowOpenPanel] = useState(false);
  const [showConfigs, setShowConfigs] = useState(false);

  const openUserManual = () => {
    window.electronAPI.openUserManual();
  };

  return (
    <div className="container">
      {showOpenPanel && <OpenProjectPanel onClose={() => setShowOpenPanel(false)} />}
      {showConfigs && <ConfigurationsScreen onClose={() => setShowConfigs(false)} />}

      <h1 className="title">Integrated Assignment Environment</h1>
      <p className="subtitle">Organize, Manage and Evaluate Assignments Easily</p>

      <div className="button-group">
        <button className="btn new" onClick={() => navigate("/new")}>
          📁 New Project
        </button>

        <button className="btn open" onClick={() => setShowOpenPanel(true)}>
          📂 Open Project
        </button>

        <button className="btn help" onClick={() => setShowConfigs(true)}>
          ⚙️ Configurations
        </button>

        {/* Help butonu  */}
        <button className="btn help" onClick={openUserManual}>
       
          ❓ Help
        </button>
      </div>

      <div className="footer">© 2025 316-Project | Version 1.0.0</div>
    </div>
  );
};

export default HomeScreen;
