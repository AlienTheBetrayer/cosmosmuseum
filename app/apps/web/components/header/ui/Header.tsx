"use client";

import { AuthButton } from "@/components/auth/ui/AuthButton";
import { Menu } from "@/components/header/ui/Menu";
import { MiddleLinks } from "@/components/header/ui/MiddleLinks";
import { ThemeList } from "@/components/themes/ui/ThemeList";
import { Button } from "@/shared/ui";
import { Menu as MenuIcon } from "lucide-react";
import { AnimatePresence } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export const Header = () => {
  const [openMenu, setOpenMenu] = useState<boolean>(false);

  // jsx
  return (
    <>
      <AnimatePresence>
        {openMenu && <Menu onClose={() => setOpenMenu(false)} />}
      </AnimatePresence>

      <header className="sticky top-0 left-0 right-0 p-1 z-10 bg-background/95 backdrop-blur-sm">
        <nav className="flex md:grid grid-cols-3 w-full mx-auto h-12 p-2 rounded-3xl items-center">
          <Link
            href="/"
            className="md:flex hidden items-center gap-1 justify-self-start"
          >
            <Image alt="nasa" src="/logos/nasa.png" width={48} height={48} />
            <span className="text-3xl font-extrabold">COSMOS</span>
          </Link>

          <Button
            variant="default"
            className="mr-auto md:hidden flex"
            onClick={() => setOpenMenu((prev) => !prev)}
          >
            <MenuIcon />
            <span>Menu</span>
          </Button>

          <ul className="md:flex hidden items-center gap-2 justify-self-center ">
            <MiddleLinks />
          </ul>

          <div className="flex gap-2 items-center justify-self-end">
            <ThemeList />
            <AuthButton />
          </div>
        </nav>
      </header>
    </>
  );
};
