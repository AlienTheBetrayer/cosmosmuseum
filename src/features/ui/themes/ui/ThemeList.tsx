"use client";

import { useThemes } from "@/features/ui/themes/hooks/useThemes";
import { ThemeButton } from "@/features/ui/themes/ui/ThemeButton";
import { useMounted } from "@/shared/hooks/useMounted";
import { cn } from "cn";
import { Monitor, Moon, Sun } from "lucide-react";

export const ThemeList = ({ className }: { className?: string }) => {
  // theme logic
  const { setTheme, theme } = useThemes();
  const { mounted } = useMounted();

  // jsx
  return (
    <ul
      className={cn(
        "flex rounded-full border-1 border-foreground/10 h-8",
        className ?? "",
      )}
      suppressHydrationWarning
    >
      <li>
        <ThemeButton
          onClick={() => setTheme("light")}
          isSelected={mounted && theme === "light"}
        >
          <Sun />
        </ThemeButton>
      </li>

      <li>
        <ThemeButton
          onClick={() => setTheme("system")}
          isSelected={mounted && theme === "system"}
        >
          <Monitor />
        </ThemeButton>
      </li>

      <li>
        <ThemeButton
          onClick={() => setTheme("dark")}
          isSelected={mounted && theme === "dark"}
        >
          <Moon />
        </ThemeButton>
      </li>
    </ul>
  );
};
