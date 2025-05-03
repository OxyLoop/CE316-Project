import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import HomeScreen from "./components/HomeScreen.tsx";
import NewProjectScreen from "./components/NewProjectScreen.tsx";
import ConfigurationsScreen from "./components/ConfigurationsScreen.tsx"; // ✅ yeni sayfa

function App() {
  return _jsx(Router, {
    children: _jsxs(Routes, {
      children: [
        _jsx(Route, { path: "/", element: _jsx(HomeScreen, {}) }),
        _jsx(Route, { path: "/new", element: _jsx(NewProjectScreen, {}) }),
        _jsx(Route, { path: "/configurations", element: _jsx(ConfigurationsScreen, {}) }) 
      ]
    })
  });
}

export default App;
