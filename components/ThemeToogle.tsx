"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

export function ThemeToggleButton() {
  const { setTheme, theme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  // useEffect only runs on the client, so we can safely show the UI
  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    // To avoid hydration mismatch, render a placeholder or nothing on the server.
    return <div className="w-9 h-9"></div>;
  }

  return (
    <button
      onClick={() => (theme === "dark" ? setTheme("light") : setTheme("dark"))}
      className="p-2 rounded-full text-gray-300 hover:text-white hover:bg-slate-800 transition-colors"
      aria-label="Toggle theme"
    >
      {theme === "dark" ? (
        <Sun className="h-5 w-5 " />
      ) : (
        <Moon className="h-7 w-7 bg-slate-800 text-white rounded-full " />
      )}
    </button>
  );
}
