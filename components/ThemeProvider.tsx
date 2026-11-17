
"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

type Theme = "light" | "dark" | "mint" | "neon";

type ThemeContextType = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
};

const ThemeContext = createContext<ThemeContextType | null>(null);

const THEMES: Theme[] = ["light", "dark", "mint", "neon"];

function isTheme(value: string | null): value is Theme {
  return value !== null && THEMES.includes(value as Theme);
}

export function useTheme() {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error("useTheme must be used inside ThemeProvider");
  }

  return context;
}

export default function ThemeProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [theme, setTheme] = useState<Theme>("dark");
  const [hasLoadedPreference, setHasLoadedPreference] = useState(false);

  // Read the saved preference before persisting or applying a theme.
  useEffect(() => {
    try {
      const savedTheme = localStorage.getItem("theme");

      if (isTheme(savedTheme)) {
        setTheme(savedTheme);
      }
    } catch {
      // Keep the default theme if browser storage is unavailable.
    } finally {
      setHasLoadedPreference(true);
    }
  }, []);

  // Apply the selected theme and persist subsequent changes.
  useEffect(() => {
    if (!hasLoadedPreference) return;

    const root = document.documentElement;

    root.classList.remove(...THEMES);
    root.classList.add(theme);
    root.dataset.theme = theme;

    try {
      localStorage.setItem("theme", theme);
    } catch {
      // The theme still works for this session without persistent storage.
    }
  }, [theme, hasLoadedPreference]);

  // Globally show scrollbars while scrolling, then hide after inactivity.
  useEffect(() => {
    const root = document.documentElement;

    let hideTimer: ReturnType<typeof setTimeout> | undefined;

    const handleScroll = () => {
      root.classList.add("scrollbars-visible");

      if (hideTimer) {
        clearTimeout(hideTimer);
      }

      hideTimer = setTimeout(() => {
        root.classList.remove("scrollbars-visible");
      }, 1300);
    };

    // Capture scroll events from nested containers and the main page.
    document.addEventListener("scroll", handleScroll, {
      capture: true,
      passive: true,
    });

    return () => {
      document.removeEventListener("scroll", handleScroll, true);

      if (hideTimer) {
        clearTimeout(hideTimer);
      }

      root.classList.remove("scrollbars-visible");
    };
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
