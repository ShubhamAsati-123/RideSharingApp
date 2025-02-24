"use client";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";


export function ThemeToggle() {
    const { theme, setTheme } = useTheme();


  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="rounded-full "
    >
      {theme === "dark" ? (
        <Sun className="h-6 w-6" />
      ) : (
        <Moon className="h-6 w-6" />
      )}
    </button>
  );
}
