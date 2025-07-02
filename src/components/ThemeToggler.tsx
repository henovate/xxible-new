import { useTheme } from "@/context/ThemeContext";
import React from "react";
import { Button } from "./ui/button";

const ThemeToggler = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <Button onClick={toggleTheme} className="p-2 text-sm border rounded">
      Switch to {theme === "light" ? "dark" : "light"} mode
    </Button>
  );
};

export default ThemeToggler;
