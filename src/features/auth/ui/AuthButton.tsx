"use client";

import { contracts } from "@/backend";
import { useLogoutMutation } from "@/backend/tanstack/mutations/auth/useLogoutMutation";
import {
  Button,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Spinner,
} from "@/shared/ui";
import { LogIn } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export const AuthButton = ({
  auth,
}: {
  auth: contracts.auth.GetResponse | null;
}) => {
  // mutation
  const { logout } = useLogoutMutation();

  // not authenticated
  if (!auth?.user) {
    return (
      <Button
        render={
          <Link href="/login">
            <span>Логін</span>
            <LogIn />
          </Link>
        }
        nativeButton={false}
      />
    );
  }

  // main jsx
  return (
    <Popover>
      <PopoverTrigger
        render={
          <Button variant="ghost">
            <Image
              alt="avatar"
              src={auth.user.avatarUrl}
              width={16}
              height={16}
            />
            <span className="truncate max-w-12">{auth.user.username}</span>
          </Button>
        }
      />

      <PopoverContent className="max-w-36 p-2">
        <ul className="flex flex-col gap-2 w-full">
          <li>
            <Button
              className="w-full"
              variant="destructive"
              onClick={() => {
                logout.mutate({});
              }}
            >
              {logout.isPending && <Spinner />}
              <span>Вийти</span>
            </Button>
          </li>
        </ul>
      </PopoverContent>
    </Popover>
  );
};
