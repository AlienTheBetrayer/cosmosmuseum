"use client";

import { ThemeList } from "@/components/themes/ui/ThemeList";

export const Header = () => {
  return (
    <header className="fixed top-0 left-0 right-0 p-1 z-1">
      <nav className="flex bg-background/30 backdrop-blur-sm w-full max-w-2xl mx-auto h-12 p-2 rounded-3xl items-center">
        <ThemeList className="ml-auto"/>
      </nav>
    </header>
  );
};
