"use client";

import { contracts } from "@/backend";
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

export const Header = ({
  auth,
}: {
  auth: contracts.auth.GetResponse | null;
}) => {
  const [openMenu, setOpenMenu] = useState<boolean>(false);

  // jsx

  return (
    <>
      <header className="sticky top-0 left-0 right-0 p-1 z-10 bg-background/50 backdrop-blur-3xl">
        <nav className="flex md:grid grid-cols-3 w-full mx-auto h-14 p-2 rounded-3xl items-center">
          <Button
            variant="ghost"
            className="h-full"
            nativeButton={false}
            render={
              <Link
                href="/"
                className="
    group relative flex items-center gap-2
    rounded-2xl px-2 
 justify-self-start
  "
              >
                {/* Orbital glow */}
                <span
                  className="
      pointer-events-none absolute -inset-1
      rounded-2xl
      bg-foreground/[0.04]
      opacity-0 blur-xl
      transition-opacity duration-500
      group-hover:opacity-100
    "
                />

                {/* Rocket mark */}
                <span
                  className="
      relative flex h-8 w-8 shrink-0
      items-center justify-center
      rounded-xl
      border border-foreground/[0.10]
      bg-foreground/[0.055]
      shadow-[0_2px_12px_rgba(0,0,0,0.08)]
      backdrop-blur-md
      transition-all duration-500
      group-hover:-rotate-6
      group-hover:scale-105
      group-hover:border-foreground/[0.18]
      group-hover:bg-foreground/[0.09]
      group-hover:shadow-[0_4px_20px_rgba(0,0,0,0.14)]
    "
                >
                  {/* tiny shine */}

                  <Rocket
                    size={17}
                    strokeWidth={2.2}
                    className="
        relative z-10
        transition-transform duration-500
        group-hover:rotate-6
      "
                  />

                  {/* orbit dot */}
                  <span
                    className="
        absolute right-1 top-0.5
        h-1 w-1 rounded-full
        bg-foreground/40
        transition-all duration-500
        group-hover:scale-150
        group-hover:bg-foreground/70
      "
                  />
                </span>

                {/* Wordmark */}
                <span
                  className="
      relative
      text-[19px] font-black
      tracking-[-0.055em]
      text-foreground
      transition-all duration-300
      group-hover:tracking-[-0.035em]
    "
                >
                  КОСМОС
                </span>
              </Link>
            }
          />

          <Button
            variant={openMenu ? "destructive" : "ghost"}
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

          <ul
            className="
    hidden md:flex
    items-center
    justify-self-center
    gap-0.5
    rounded-full
    border border-foreground/[0.08]
    bg-foreground/[0.035]
    px-2
    py-1
    shadow-[0_2px_16px_rgba(0,0,0,0.06)]
    backdrop-blur-xl
    transition-all duration-300
    hover:border-foreground/[0.12]
    hover:bg-foreground/[0.045]
  "
          >
            <MiddleLinks />
          </ul>

          <div className="flex gap-1 items-center justify-self-end md:flex hidden h-8">
            <div className="flex gap-1">
              <Socials />

              <ThemeList />

              <Separator orientation="vertical" className="h-6 my-auto mx-1" />
            </div>

            <AuthButton auth={auth} />
          </div>
        </nav>
      </header>

      <AnimatePresence>
        {openMenu && <Menu onClose={() => setOpenMenu(false)} auth={auth} />}
      </AnimatePresence>
    </>
  );
};
