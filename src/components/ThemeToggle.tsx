// src/components/ThemeToggle.tsx

import { useEffect, useState } from "react";

// ============================================================
// 📌 Theme Toggle Component
// Switches between light and dark mode.
// Saves preference in localStorage so it persists across reloads.
// ============================================================

type Theme = "light" | "dark";

export default function ThemeToggle() {
  // Read the saved theme on first render (defaults to "light")
  const [theme, setTheme] = useState<Theme>(() => {
    const saved = localStorage.getItem("theme") as Theme | null;
    return saved === "dark" ? "dark" : "light";
  });

  // Apply theme to the <html> element and save the choice
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  // Flip the theme
  function toggleTheme() {
    setTheme((current) => (current === "light" ? "dark" : "light"));
  }

  return (
    <button
      type="button"
      className="theme-toggle"
      onClick={toggleTheme}
      aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
      title={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
    >
      {theme === "light" ? "🌙" : "☀️"}
    </button>
  );
}