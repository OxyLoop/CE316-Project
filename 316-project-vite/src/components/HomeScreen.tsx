import { useNavigate } from "react-router-dom";
import "./HomeScreen.css";


const HomeScreen = () => {
  const navigate = useNavigate();

  const handleJavaTest = () => {
    const javaFilePath = "C:\\Users\\ardas\\Desktop\\CE316-Project\\test_programs\\Main.java";
    const args = ["Arda"]; // Şimdilik sabit argüman
  
    if (!window.electronAPI?.runJava) {
      alert("Electron API tanımlı değil!");
      return;
    }
  
    window.electronAPI
      .runJava(javaFilePath, args)
      .then((result) => {
        if (result.error) {
          alert("⛔ Hata:\n" + result.error);
        } else {
          alert("✅ Çıktı:\n" + result.output);
        }
      });
  };

  return (
    <div className="container">


      <h1 className="title">Integrated Assignment Environment</h1>
      <p className="subtitle">
        Organize, Manage and Evaluate Assignments Easily
      </p>
      <div className="button-group">
        <button className="btn new" onClick={() => navigate("/new")}>
          📁 New Project
        </button>
        <button className="btn open">📂 Open Project</button>
        <button className="btn help">❓ Help</button>
        <button className="btn help" onClick={handleJavaTest}>
        🧪 Java Dosyasını Test Et
        </button>

      </div>
      <div className="footer">© 2025 316-Project | Version 1.0.0</div>
    </div>
  );
};

export default HomeScreen;
