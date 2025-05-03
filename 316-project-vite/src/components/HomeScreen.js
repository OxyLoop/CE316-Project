import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useNavigate } from "react-router-dom";
import "./HomeScreen.css";
const HomeScreen = () => {
    const navigate = useNavigate();
    return (_jsxs("div", { className: "container", children: [_jsx("h1", { className: "title", children: "Integrated Assignment Environment" }), _jsx("p", { className: "subtitle", children: "Organize, Manage and Evaluate Assignments Easily" }), _jsxs("div", { className: "button-group", children: [_jsx("button", { className: "btn new", onClick: () => navigate("/new"), children: "\uD83D\uDCC1 New Project" }), _jsx("button", { className: "btn open", children: "\uD83D\uDCC2 Open Project" }), _jsx("button", { className: "btn help", children: "\u2753 Help" })] }), _jsx("div", { className: "footer", children: "\u00A9 2025 316-Project | Version 1.0.0" })] }));
};
export default HomeScreen;
