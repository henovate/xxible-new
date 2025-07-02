"use client";

import { useRouter } from "next/navigation";
import React, { createContext, useContext, useEffect, useState } from "react";

const ThemeContext = createContext<{
  theme: string;
  toggleTheme: () => void;
}>({
  theme: "light",
  toggleTheme: () => {},
});

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const [theme, setTheme] = useState("light");

  // Check if `localStorage` is available and set theme
  useEffect(() => {
    if (typeof window !== "undefined" && localStorage) {
      const savedTheme = localStorage.getItem("theme") || "light";
      setTheme(savedTheme);

      // Apply the saved theme to the HTML root
      document.documentElement.classList.add(savedTheme);
    }
  }, [router]);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);


    if (typeof window !== "undefined" && localStorage) {
      localStorage.setItem("theme", newTheme);
    }

    // Update the HTML root classes
    document.documentElement.classList.remove(theme);
    document.documentElement.classList.add(newTheme);
  };

  useEffect(() => {
    // Ensure this runs only on the client side
    if (typeof window !== "undefined") {
      const savedTheme = localStorage.getItem("theme");
      const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light";
      const themeToApply = savedTheme || systemTheme;

      setTheme(themeToApply);
      document.documentElement.classList.add(themeToApply);
    }
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
