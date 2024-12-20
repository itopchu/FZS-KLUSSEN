import { CSSProperties } from "react";
import { Routes, Route } from "react-router-dom";
import Home from "../../Pages/Home";
import Gallery from "../../Pages/Gallery";
import Contact from "../../Pages/Contact";
import Services from "../../Pages/Service";

interface MainProps {
  style?: CSSProperties;
}

function Main({ style }: MainProps) {
  return (
    <main style={style}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/services" element={<Services />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/gallery/*" element={<Gallery />} />
      </Routes>
    </main>
  );
}

export default Main;
