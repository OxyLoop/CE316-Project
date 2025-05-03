import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import "./HomeScreen.css";
const ProjectDashboard = () => {
    const [zipFolder, setZipFolder] = useState("");
    const [expectedOutput, setExpectedOutput] = useState("");
    const [results, setResults] = useState([]);
    const [cmdArgs, setCmdArgs] = useState("");
    const handleEvaluation = () => {
        if (!zipFolder || !expectedOutput) {
            alert("Please select both ZIP folder and expected output file.");
            return;
        }
        const argsArray = cmdArgs.trim().split(/\s+/);
        console.log("Evaluation Starting With:");
        console.log("ZIP Folder Path:", zipFolder);
        console.log("Expected Output File:", expectedOutput);
        console.log("Command Line Arguments:", argsArray);
        const dummyResults = [
            { studentID: "20230001", status: "✅ Success" },
            { studentID: "20230002", status: "❌ Compilation Error" },
            { studentID: "20230003", status: "⚠️ Wrong Output" },
        ];
        setResults(dummyResults);
    };
    const handleJavaTest = () => {
        const javaFilePath = "C:\Users\ardas\Desktop\CE316-Project\test_programs\Main.java";
        const args = cmdArgs.trim().split(/\s+/);
        if (!window.electronAPI?.runJava) {
            alert("Electron API tanımlı değil!");
            return;
        }
        window.electronAPI
            .runJava(javaFilePath, args)
            .then((result) => {
            if (result.error) {
                alert("⛔ Hata:\n" + result.error);
            }
            else {
                alert("✅ Çıktı:\n" + result.output);
            }
        });
    };
    return (_jsxs("div", { className: "container", children: [_jsx("h2", { className: "title", children: "\uD83D\uDCCA Project Dashboard" }), _jsx("p", { className: "subtitle", children: "Manage and evaluate student submissions" }), _jsx("label", { children: "\uD83D\uDCAC Enter Command Line Arguments" }), _jsx("input", { type: "text", placeholder: "e.g. banana apple lemon", value: cmdArgs, onChange: (e) => setCmdArgs(e.target.value), style: { padding: "10px", width: "60%", borderRadius: "10px", marginBottom: "15px" } }), _jsx("label", { children: "\uD83D\uDCE6 Select Student ZIP Folder" }), _jsx("input", { type: "file", multiple: true, ref: (ref) => {
                    if (ref)
                        ref.webkitdirectory = true;
                }, onChange: (e) => {
                    const fileList = e.target.files;
                    if (fileList && fileList.length > 0) {
                        setZipFolder(fileList[0].webkitRelativePath.split("/")[0]);
                    }
                }, style: { marginBottom: "15px" } }), _jsx("label", { children: "\uD83D\uDCC4 Select Expected Output File (.txt)" }), _jsx("input", { type: "file", accept: ".txt", onChange: (e) => {
                    const file = e.target.files?.[0];
                    if (file)
                        setExpectedOutput(file.name);
                }, style: { marginBottom: "20px" } }), _jsx("button", { className: "btn open", onClick: handleEvaluation, children: "\u25B6\uFE0F Start Evaluation" }), _jsx("button", { className: "btn help", style: { marginTop: "20px" }, onClick: handleJavaTest, children: "\uD83E\uDDEA Java Dosyas\u0131n\u0131 Test Et" }), results.length > 0 && (_jsxs("div", { style: { marginTop: "30px", width: "80%" }, children: [_jsx("h3", { children: "\uD83E\uDDFE Evaluation Results:" }), _jsxs("table", { style: { width: "100%", marginTop: "10px", borderCollapse: "collapse" }, children: [_jsx("thead", { children: _jsxs("tr", { children: [_jsx("th", { style: { borderBottom: "1px solid #ccc", padding: "10px" }, children: "Student ID" }), _jsx("th", { style: { borderBottom: "1px solid #ccc", padding: "10px" }, children: "Status" })] }) }), _jsx("tbody", { children: results.map((res, i) => (_jsxs("tr", { children: [_jsx("td", { style: { padding: "10px", textAlign: "center" }, children: res.studentID }), _jsx("td", { style: { padding: "10px", textAlign: "center" }, children: res.status })] }, i))) })] })] }))] }));
};
export default ProjectDashboard;
