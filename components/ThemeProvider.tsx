"use client";

import { createContext, useContext, useEffect, useState } from "react";

type Theme = "light" | "dark" | "mint" | "neon";

type ThemeContextType = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
};

const ThemeContext = createContext<ThemeContextType | null>(null);

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) throw new Error("useTheme must be used inside ThemeProvider");
  return context;
}

export default function ThemeProvider({ children }: any) {
  const [theme, setTheme] = useState<Theme>("dark");

  // 🔥 Load saved theme
  useEffect(() => {
    const saved = localStorage.getItem("theme") as Theme;
    if (saved) setTheme(saved);
  }, []);

  // 🔥 Apply + persist
useEffect(() => {

  document.documentElement.classList.remove(
    "light",
    "dark",
    "mint",
    "neon"
  );

  document.documentElement.classList.add(theme);

  document.documentElement.setAttribute(
    "data-theme",
    theme
  );

  localStorage.setItem(
    "theme",
    theme
  );

}, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}