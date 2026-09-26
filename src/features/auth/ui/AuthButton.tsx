"use client";

import { contracts } from "@/backend";
import { useLogoutMutation } from "@/features/auth/hooks/useLogoutMutation";
import {
  Button,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Spinner,
} from "@/shared/ui";
import { LogIn, LogOut, UserRound } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export const AuthButton = ({
  auth,
}: {
  auth: contracts.auth.GetResponse | null;
}) => {
  const { logout } = useLogoutMutation();

  // Not authenticated
  if (!auth?.user) {
    return (
      <Button
        render={
          <Link href="/login">
            <LogIn size={16} />
            <span>Логін</span>
          </Link>
        }
        nativeButton={false}
        className="
          h-full
          rounded-full
          px-3
          shadow-sm
          transition-all duration-200
          hover:-translate-y-0.5
          hover:shadow-md
          active:translate-y-0
          active:scale-95
        "
      />
    );
  }

  return (
    <Popover>
      <PopoverTrigger
        render={
          <Button
            variant="ghost"
            className="
              group
              h-full
              rounded-full
              bg-foreground/[0.035]
              px-1.5 pr-2
              backdrop-blur-md
                            border border-foreground/10
              hover:border-foreground/15
              transition-all duration-300
              hover:border-foreground/15
              hover:bg-foreground/[0.07]
              hover:shadow-[0_4px_20px_rgba(0,0,0,0.10)]
              active:scale-95
            "
          >
            <span
              className="
                relative
                flex items-center justify-center h-6 w-6 shrink-0
                shadow-sm
                transition-transform duration-300
                group-hover:scale-105
              "
            >
              <Image alt="" src={auth.user.avatarUrl} width={16} height={16} />

              <span
                className="
                  pointer-events-none
                  absolute inset-0
                "
              />
            </span>

            <span className="truncate text-xs max-w-48">
              {auth.user.username}
            </span>
          </Button>
        }
      />

      <PopoverContent
        align="end"
        sideOffset={8}
        className="
          w-64
          overflow-hidden
          rounded-2xl
          border border-foreground/[0.10]
          bg-background/90
          p-1.5
          shadow-[0_20px_60px_rgba(0,0,0,0.18)]
          backdrop-blur-2xl
        "
      >
        {/* User header */}
        <div
          className="
            relative overflow-hidden
            rounded-xl
            border border-foreground/[0.07]
            bg-foreground/[0.035]
            p-3
          "
        >
          {/* subtle glow */}
          <div
            className="
              pointer-events-none
              absolute -right-8 -top-8
              h-24 w-24
              bg-foreground/[0.06]
              blur-2xl
            "
          />

          <div className="relative flex items-center gap-3">
            <div
              className="
              flex items-center justify-center
                relative
                flex h-10 w-10 shrink-0
                overflow-hidden
                shadow-sm
              "
            >
              <Image alt="" src={auth.user.avatarUrl} width={36} height={36} />
            </div>

            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-semibold">
                {auth.user.username}
              </p>

              <p className="mt-0.5 flex items-center gap-1 text-xs text-muted-foreground">
                <UserRound size={16} />
                Обліковий запис
              </p>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="mt-1.5">
          <Button
            variant="ghost"
            disabled={logout.isPending}
            onClick={() => {
              logout.mutate({});
            }}
            className="
              group
              h-9
              w-full
              justify-start
              rounded-xl
              px-2.5
              text-muted-foreground
              transition-all duration-200
              hover:bg-destructive/10
              hover:text-destructive
            "
          >
            <span
              className="
                flex h-7 w-7
                items-center justify-center
                rounded-lg
                bg-foreground/[0.05]
                transition-colors duration-200
                group-hover:bg-destructive/10
              "
            >
              {logout.isPending ? (
                <Spinner className="size-3.5" />
              ) : (
                <LogOut size={14} />
              )}
            </span>

            <span className="ml-1 text-sm">
              {logout.isPending ? "Вихід..." : "Вийти"}
            </span>
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
};
