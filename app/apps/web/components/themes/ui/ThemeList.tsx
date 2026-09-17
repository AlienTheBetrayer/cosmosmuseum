"use client";

import { useThemes } from "@/components/themes/hooks/useThemes";
import { ThemeButton } from "@/components/themes/ui/ThemeButton";
import { cn } from "cn";
import { Monitor, Moon, Sun } from "lucide-react";

export const ThemeList = ({ className }: { className?: string }) => {
  // theme logic
  const { setTheme, theme } = useThemes();

  // jsx
  return (
    <ul
      className={cn(
        "flex rounded-full border-1 border-foreground/10 h-8",
        className ?? "",
      )}
    >
      <li>
        <ThemeButton
          onClick={() => setTheme("light")}
          isSelected={theme === "light"}
        >
          <Sun />
        </ThemeButton>
      </li>

      <li>
        <ThemeButton
          onClick={() => setTheme("system")}
          isSelected={theme === "system"}
        >
          <Monitor />
        </ThemeButton>
      </li>

      <li>
        <ThemeButton
          onClick={() => setTheme("dark")}
          isSelected={theme === "dark"}
        >
          <Moon />
        </ThemeButton>
      </li>
    </ul>
  );
};
