"use client";

import { ThemeList } from "@/components/themes/ui/ThemeList";

export const Header = () => {
  return (
    <header className="fixed top-0 left-0 right-0 p-2 z-1">
      <nav className="flex bg-background/30 backdrop-blur-sm w-full max-w-128 mx-auto h-14 p-2 rounded-full items-center">
        <ThemeList className="ml-auto"/>
      </nav>
    </header>
  );
};
