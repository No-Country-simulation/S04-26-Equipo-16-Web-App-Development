"use client";

import { useTheme } from "next-themes";
import { Button } from "./ui/button";
import { Moon, Sun } from "lucide-react";
import { toast } from "sonner";

export default function ThemeBtn() {
  const { resolvedTheme, setTheme } = useTheme();

  function toggleTheme() {
    const newTheme = resolvedTheme === "light" ? "dark" : "light";
    setTheme(newTheme);
    toast(`Theme changed to ${newTheme}`, { duration: 500 });
  }

  return (
    <Button onClick={toggleTheme} variant="outline">
      {resolvedTheme === "light" ? <Moon /> : <Sun />}
    </Button>
  );
}
