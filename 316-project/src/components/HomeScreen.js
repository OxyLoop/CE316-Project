import React from "react";
import "./HomeScreen.css";

const HomeScreen = () => {
  return (
    <div className="container">
      <h1 className="title">Integrated Assignment Environment</h1>
      <p className="subtitle">
        Organize, Manage and Evaluate Assignments Easily
      </p>
      <div className="button-group">
        <button className="btn new">📁 New Project</button>
        <button className="btn open">📂 Open Project</button>
        <button className="btn help">❓ Help</button>
      </div>
      <div className="footer">© 2025 316-Project | Version 1.0.0</div>
    </div>
  );
};

export default HomeScreen;
