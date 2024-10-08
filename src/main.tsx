import React from "react";
import ReactDOM from "react-dom/client";

import App from "./App";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <header>
      <h1>Ved Photo Albums</h1>
    </header>
    <main>
      <App />
    </main>
  </React.StrictMode>,
);
