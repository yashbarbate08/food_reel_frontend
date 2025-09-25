import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import ThemeProvider from "./components/ThemeProvider";
import "./App.css";
import UserContext from "./context/UserContext.jsx";
import { User } from "lucide-react";

ReactDOM.createRoot(document.getElementById("root")).render(
  <UserContext>
    <ThemeProvider>
      <App />
    </ThemeProvider>
  </UserContext>
);
