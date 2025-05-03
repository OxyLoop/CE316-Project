import { HashRouter as Router, Routes, Route } from "react-router-dom";
import HomeScreen from "./components/HomeScreen.tsx";
import NewProjectScreen from "./components/NewProjectScreen.tsx";
import ConfigurationsScreen from "./components/ConfigurationsScreen.tsx";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomeScreen />} />
        <Route path="/new" element={<NewProjectScreen />} />
        <Route path="/configurations" element={<ConfigurationsScreen />} />
      </Routes>
    </Router>
  );
}

export default App;
