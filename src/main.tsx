import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Home } from "./pages/chat.tsx";
import { Index } from "./pages/index.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/chat/:name" element={<Home />} />
        <Route path='/home' element={<Index/>}/>
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
