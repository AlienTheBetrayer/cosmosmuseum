"use client";

import { useThemes } from "@/features/ui/themes/hooks/useThemes";
import { ThemeButton } from "@/features/ui/themes/ui/ThemeButton";
import { useMounted } from "@/shared/hooks/useMounted";
import { cn } from "cn";
import { Monitor, Moon, Sun } from "lucide-react";
import { motion } from "motion/react";

const themes = [
  {
    value: "light",
    icon: Sun,
    label: "Світла тема",
  },
  {
    value: "system",
    icon: Monitor,
    label: "Системна тема",
  },
  {
    value: "dark",
    icon: Moon,
    label: "Темна тема",
  },
] as const;

export const ThemeList = ({ className }: { className?: string }) => {
  const { setTheme, theme } = useThemes();
  const { mounted } = useMounted();

  return (
    <ul
      suppressHydrationWarning
      className={cn(
        "relative flex h-8 items-center justify-center",
        "rounded-full",
        "border border-foreground/10",
        "bg-foreground/[0.035]",
        "p-0.5",
        "backdrop-blur-md",
        "shadow-sm",
        className ?? "",
      )}
    >
      {themes.map(({ value, icon: Icon, label }) => {
        const selected = mounted && theme === value;

        return (
          <li key={value} className="relative h-full">
            {selected && (
              <motion.div
                layoutId="theme-selection"
                className="
                  absolute inset-0
                  rounded-full
                  border border-foreground/[0.08]
                  bg-foreground/[0.08]
                  shadow-[0_1px_6px_rgba(0,0,0,0.08)]
                "
                transition={{
                  type: "spring",
                  stiffness: 500,
                  damping: 35,
                  mass: 0.7,
                }}
              />
            )}

            <ThemeButton
              aria-label={label}
              onClick={() => setTheme(value)}
              isSelected={selected}
              className="
                relative z-10
                h-full aspect-square
                rounded-full
                text-foreground/40
                transition-all duration-200
                hover:text-foreground/80
                data-[selected=true]:text-foreground
                active:scale-90
              "
            >
              <Icon
                size={14}
                strokeWidth={2}
                className="
                  transition-transform duration-200
                  group-hover:scale-105
                "
              />
            </ThemeButton>
          </li>
        );
      })}
    </ul>
  );
};
