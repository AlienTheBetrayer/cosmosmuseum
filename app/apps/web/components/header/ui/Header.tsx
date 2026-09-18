"use client";

import { ThemeList } from "@/components/themes/ui/ThemeList";

export const Header = () => {
  return (
    <header className="sticky top-0 left-0 right-0 p-1 z-1 bg-background/95 backdrop-blur-sm">
      <nav className="flex w-full mx-auto h-12 p-2 rounded-3xl items-center">
        <ThemeList className="ml-auto"/>
      </nav>
    </header>
  );
};
