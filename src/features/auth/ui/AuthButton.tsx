"use client";

import { contracts } from "@/backend";
import { Button } from "@/shared/ui";
import { LogIn } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export const AuthButton = ({
  auth,
}: {
  auth: contracts.auth.GetResponse | null;
}) => {
  if (!auth?.user) {
    // not authenticated
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
    <Button
      variant="ghost"
      render={
        <Link href="/profile">
          <Image
            alt="avatar"
            src={auth.user.avatarUrl}
            width={16}
            height={16}
          />
          <span className="truncate max-w-12">{auth.user.username}</span>
        </Link>
      }
      nativeButton={false}
    />
  );
};
