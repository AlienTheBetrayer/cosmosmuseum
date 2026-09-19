import { Theme } from "@/features/ui/themes/lib/themes";
import { useTheme } from "next-themes";

export const useThemes = () => {
  const { theme, setTheme, resolvedTheme, themes, systemTheme, forcedTheme } =
    useTheme();

  return {
    theme: theme as Theme | undefined,
    setTheme: setTheme as (theme: Theme) => void,
    resolvedTheme: resolvedTheme as Theme | undefined,
    themes: themes as Theme[],
    systemTheme: systemTheme as "light" | "dark" | undefined,
    forcedTheme,
  };
};
