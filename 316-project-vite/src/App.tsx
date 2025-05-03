import { HashRouter as Router, Routes, Route } from "react-router-dom";
import ProjectDashboard from "./components/ProjectDashboard.tsx";
import HomeScreen from "./components/HomeScreen.tsx";
import NewProjectScreen from "./components/NewProjectScreen.tsx";

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
