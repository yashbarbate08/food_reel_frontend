import React, { useContext } from "react";
import { ThemeContext } from "./ThemeProvider";

export default function ThemeToggle() {
  const { theme, setTheme } = useContext(ThemeContext);
  return (
    <button
      className="theme-toggle"
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
      aria-label="Toggle theme"
      title="Toggle theme"
    >
      {theme === "light" ? "🌙" : "☀️"}
    </button>
  );
}