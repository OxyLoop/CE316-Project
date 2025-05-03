import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./HomeScreen.css";
const NewProjectScreen = () => {
    const [projectName, setProjectName] = useState("");
    const [selectedConfig, setSelectedConfig] = useState("");
    const [configList] = useState(["C", "Java", "Python"]);
    const navigate = useNavigate();
    const handleCreateProject = () => {
        if (!projectName || !selectedConfig) {
            alert("Please, fill all fields.");
            return;
        }
        console.log("Project Created:", projectName, selectedConfig);
        // Burada proje verisi saklanabilir 
        navigate("/dashboard");
    };
    return (_jsxs("div", { className: "container", children: [_jsx("h2", { className: "title", children: "Create New Project" }), _jsx("p", { className: "subtitle", children: "Set up your project with configurations" }), _jsx("input", { type: "text", placeholder: "Project Name", value: projectName, onChange: (e) => setProjectName(e.target.value), style: {
                    padding: "10px",
                    fontSize: "16px",
                    marginBottom: "15px",
                    borderRadius: "10px",
                    width: "60%",
                } }), _jsxs("select", { value: selectedConfig, onChange: (e) => setSelectedConfig(e.target.value), style: {
                    padding: "10px",
                    fontSize: "16px",
                    marginBottom: "15px",
                    borderRadius: "10px",
                    width: "60%",
                }, children: [_jsx("option", { value: "", children: "Select Configuration" }), configList.map((conf, idx) => (_jsxs("option", { value: conf, children: [conf, " Programming"] }, idx)))] }), _jsxs("div", { style: { display: "flex", gap: "10px" }, children: [_jsx("button", { className: "btn new", onClick: handleCreateProject, children: "\u2795 Create" }), _jsx("button", { className: "btn help", onClick: () => alert("Creating new configuration!"), children: "\u2699\uFE0F New Configuration" })] })] }));
};
export default NewProjectScreen;
