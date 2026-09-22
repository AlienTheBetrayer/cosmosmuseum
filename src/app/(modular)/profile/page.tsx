"use client";

import { contracts } from "@/backend";
import { api } from "@/shared/lib/api";
import {
  Button,
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/shared/ui";
import { useMutation } from "@tanstack/react-query";
import Link from "next/link";

export default function ProfilePage() {
  const logout = useMutation({
    mutationFn: async (data: contracts.auth.Logout) => {
      const res = api.post("/api/auth/logout");
      return (await res).data;
    },
  });

  // jsx
  return (
    <Card className="w-128 gap-4 shadowed">
      <CardHeader>
        <CardTitle>Логін</CardTitle>
        <CardDescription>
          Введіть свою пошту та пароль, якщо все коректно, ви будете
          автентифіковані
        </CardDescription>
        <CardAction>
          <Button
            variant="link"
            render={<Link href="/signup">Реєстрація</Link>}
            nativeButton={false}
          />
        </CardAction>
      </CardHeader>

      <CardContent className="flex flex-col gap-4">
        <Button
          variant="destructive"
          onClick={() => {
            logout.mutate({});
          }}
        >
          Log out
        </Button>
      </CardContent>

      <CardFooter className="flex flex-col gap-2"></CardFooter>
    </Card>
  );
}
