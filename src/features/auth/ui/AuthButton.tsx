import { Button } from "@/shared/ui";
import { LogIn } from "lucide-react";
import Link from "next/link";

export const AuthButton = () => {
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
};
