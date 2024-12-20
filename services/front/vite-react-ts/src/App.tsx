import { useEffect } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import Header from "./Sections/Header";
import Footer from "./Sections/Footer";
import Main from "./Sections/Main";
import "./reset.css";

function App() {
  useEffect(() => {
    const clearCache = () => {
      if ('caches' in window) {
        caches.keys().then((names) => {
          names.forEach((name) => {
            caches.delete(name);
          });
        });
      }
    };

    window.addEventListener("beforeunload", clearCache);

    return () => {
      window.removeEventListener("beforeunload", clearCache);
    };
  }, []);

  return (
      <Router>
        <div
          style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}
        >
          <Header />
          <Main style={{ flex: "1" }} />
          <Footer />
        </div>
      </Router>
  );
}

export default App;
