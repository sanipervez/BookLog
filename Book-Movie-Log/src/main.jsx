import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { StrictMode } from "react";

const htmlContainer = document.getElementById("root");
const root = ReactDOM.createRoot(htmlContainer);

root.render(
  <StrictMode>
    <App />
  </StrictMode>
);