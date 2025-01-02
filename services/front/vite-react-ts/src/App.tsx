import { useEffect } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import Header from "./Sections/Header";
import Footer from "./Sections/Footer";
import Main from "./Sections/Main";
import "./reset.css";
import axios from "axios";

export const getEnvVariables = () => {
  const envVars = Object.entries(import.meta.env)
    .filter(([key]) => key.startsWith("VITE_"))
    .reduce((acc, [key, value]) => {
      const cleanKey = key.replace("VITE_", "");
      acc[cleanKey] = value;
      return acc;
    }, {} as Record<string, string>);
  return envVars;
};

export const envVars = getEnvVariables();

export interface sectionDTO {
  title: string;
  description: string[];
}

export const fetchInfo = async (type: string): Promise<sectionDTO | null> => {
  try {
    const response = await axios.get(`${envVars.URL_BACKEND}/services/${type}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching about us info:", error);
    return null;
  }
};


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
