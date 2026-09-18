"use client";

import { AuthButton } from "@/components/auth/ui/AuthButton";
import { ThemeList } from "@/components/themes/ui/ThemeList";
import { Button } from "@/shared/ui";
import { Rocket } from "lucide-react";
import Link from "next/link";

export const Header = () => {
  return (
    <header className="sticky top-0 left-0 right-0 p-1 z-10 bg-background/95">
      <nav className="grid grid-cols-3 w-full mx-auto h-12 p-2 rounded-3xl items-center">
        <Link href="/" className="flex items-center gap-1 justify-self-start">
          <Rocket className="size-7" />
          <span className="text-3xl font-extrabold">COSMOS</span>
        </Link>

        <ul className="flex items-center gap-2 justify-self-center">
          <li>
            <Button
              variant="ghost"
              render={
                <Link href="/home">
                  <span>Home</span>
                </Link>
              }
              nativeButton={false}
            />
          </li>

          <li>
            <Button
              variant="ghost"
              render={
                <Link href="/home">
                  <span>Blog</span>
                </Link>
              }
              nativeButton={false}
            />
          </li>

          <li>
            <Button
              variant="ghost"
              render={
                <Link href="/home">
                  <span>Community</span>
                </Link>
              }
              nativeButton={false}
            />
          </li>

          <li>
            <Button
              variant="ghost"
              render={
                <Link href="/home">
                  <span>Help</span>
                </Link>
              }
              nativeButton={false}
            />
          </li>
        </ul>

        <div className="flex gap-2 items-center justify-self-end">
          <ThemeList />
          <AuthButton />
        </div>
      </nav>
    </header>
  );
};
