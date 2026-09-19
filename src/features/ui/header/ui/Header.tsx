"use client";

import { AuthButton } from "@/features/auth/ui/AuthButton";
import { Menu } from "@/features/ui/header/ui/Menu";
import { MiddleLinks } from "@/features/ui/header/ui/MiddleLinks";
import { Socials } from "@/features/ui/header/ui/socials/Socials";
import { ThemeList } from "@/features/ui/themes/ui/ThemeList";
import { Button, Separator } from "@/shared/ui";
import { Menu as MenuIcon, Rocket, X } from "lucide-react";
import { AnimatePresence } from "motion/react";
import Link from "next/link";
import { useState } from "react";

export const Header = () => {
  const [openMenu, setOpenMenu] = useState<boolean>(false);

  // jsx
  return (
    <>
      <header className="sticky top-0 left-0 right-0 p-1 z-10 bg-background/95 backdrop-blur-sm">
        <nav className="flex md:grid grid-cols-3 w-full mx-auto h-12 p-2 rounded-3xl items-center">
          <Link href="/" className="flex items-center gap-1 justify-self-start">
            <Rocket width={26} height={26} />
            <span className="text-2xl font-extrabold">КОСМОС</span>
          </Link>

          <Button
            variant="default"
            className="ml-auto md:hidden flex"
            onClick={() => setOpenMenu((prev) => !prev)}
          >
            {openMenu ? (
              <>
                <X />
                <span>Закрити</span>
              </>
            ) : (
              <>
                <MenuIcon />
                <span>Меню</span>
              </>
            )}
          </Button>

          <ul className="md:flex hidden items-center gap-2 justify-self-center ">
            <MiddleLinks />
          </ul>

          <div className="flex gap-1 items-center justify-self-end md:flex hidden">
            <Socials />
            <ThemeList />

            <Separator orientation="vertical" className="h-6 my-auto mx-1" />

            <AuthButton />
          </div>
        </nav>
      </header>

      <AnimatePresence>
        {openMenu && <Menu onClose={() => setOpenMenu(false)} />}
      </AnimatePresence>
    </>
  );
};
