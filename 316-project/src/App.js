import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProjectDashboard from "./components/ProjectDashboard";
import HomeScreen from "./components/HomeScreen";
import NewProjectScreen from "./components/NewProjectScreen";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomeScreen />} />
        <Route path="/new" element={<NewProjectScreen />} />
        <Route path="/dashboard" element={<ProjectDashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
