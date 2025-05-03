import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import ProjectDashboard from "./components/ProjectDashboard.tsx";
import HomeScreen from "./components/HomeScreen.tsx";
import NewProjectScreen from "./components/NewProjectScreen.tsx";
function App() {
    return (_jsx(Router, { children: _jsxs(Routes, { children: [_jsx(Route, { path: "/", element: _jsx(HomeScreen, {}) }), _jsx(Route, { path: "/new", element: _jsx(NewProjectScreen, {}) }), _jsx(Route, { path: "/dashboard", element: _jsx(ProjectDashboard, {}) })] }) }));
}
export default App;
