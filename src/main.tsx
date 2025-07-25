import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./app/app.tsx";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "sweetalert2/dist/sweetalert2.min.css";
import "leaflet/dist/leaflet.css";
import "./index.css";

const root = document.getElementById("root");

createRoot(root!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
