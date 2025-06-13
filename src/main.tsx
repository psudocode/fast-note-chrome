import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import "@razmisoft/react-confirm/styles.css";
import App from "app/app";
import { NotesProvider } from "./contexts/notes/notes-provider";
import { ConfirmProvider } from "@razmisoft/react-confirm";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ConfirmProvider>
      <NotesProvider>
        <App />
      </NotesProvider>
    </ConfirmProvider>
  </React.StrictMode>
);
