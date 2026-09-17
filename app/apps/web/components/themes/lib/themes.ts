export const ALLOWED_THEMES = ["light", "dark", "system"] as const;
export type Theme = (typeof ALLOWED_THEMES)[number];

export interface UseTypedThemeResponse {
  theme: Theme | undefined;
  setTheme: (theme: Theme) => void;
  resolvedTheme: Theme | undefined;
  themes: Theme[];
  systemTheme: "light" | "dark" | undefined;
  forcedTheme?: string;
}
