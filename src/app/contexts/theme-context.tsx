"use client";
import React, { createContext, useState, useEffect, ReactNode } from "react";

import { COLORS_LIGHT, COLORS_DARK } from "../constants/colors";

type ThemeType = typeof COLORS_LIGHT | typeof COLORS_DARK;

interface ThemeContextProps {
  theme: ThemeType;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextProps | undefined>(undefined);

const ThemeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<ThemeType>(COLORS_LIGHT);

  useEffect(() => {
    const loadTheme = () => {
      // Отримуємо тему з localStorage, якщо вона є
      const storedTheme = localStorage.getItem("theme");
      if (storedTheme) {
        setTheme(storedTheme === "light" ? COLORS_LIGHT : COLORS_DARK);
      }
    };
    loadTheme();
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === COLORS_LIGHT ? COLORS_DARK : COLORS_LIGHT;
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme === COLORS_LIGHT ? "light" : "dark");
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export { ThemeProvider, ThemeContext };
