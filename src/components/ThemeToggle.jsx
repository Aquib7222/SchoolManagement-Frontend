import React from "react";
import { FaMoon, FaSun } from "react-icons/fa";
import { useTheme } from "../context/ThemeContext";


const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      type="button"
      className="theme-toggle"
      onClick={toggleTheme}
      title={
        theme === "light"
          ? "Enable Dark Mode"
          : "Enable Light Mode"
      }
      aria-label={
        theme === "light"
          ? "Enable Dark Mode"
          : "Enable Light Mode"
      }
    >
      {theme === "light" ? <FaMoon /> : <FaSun />}
    </button>
  );
};

export default ThemeToggle;