"use client";

import { contracts } from "@/backend";
import { useAuthForm } from "@/features/auth/hooks/useAuthForm";
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
  Separator,
} from "@/shared/ui";
import Form from "@/shared/ui/form/form";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";

export default function LoginPage() {
  // form
  const { form } = useAuthForm();

  const login = useMutation({
    mutationFn: async (data: contracts.auth.Login) => {
      const res = api.post("/api/auth/login", data);
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

      <Form
        form={form}
        onSubmit={async (data) => {
          try {
            const result = (await login.mutateAsync(
              data,
            )) as contracts.auth.LoginResponse;

          } catch (e) {
            const err = axios.isAxiosError(e) ? e.response : undefined;

          }
        }}
        className="flex flex-col gap-4"
      >
        <CardContent className="flex flex-col gap-4">
          <Form.Input
            name="email"
            label="Пошта"
            id="email"
            description="Ваша електронна пошта"
            placeholder="m@email.com"
          />

          <Form.Input
            name="password"
            label="Пароль"
            id="password"
            placeholder="••••••"
            description="Пароль для вашого облікового запису"
            action={
              <Button
                variant="link"
                render={
                  <Link href="/forgot-password">
                    <span>Забули пароль?</span>
                  </Link>
                }
                nativeButton={false}
              ></Button>
            }
          />
        </CardContent>

        <CardFooter className="flex flex-col gap-2">
          <Form.Submit variant="outline">Логін</Form.Submit>

          <Separator />

          <Button
            className="w-full"
            type="button"
            render={
              <Link href="">
                <Image
                  src="/logos/google.png"
                  alt="Google"
                  width={16}
                  height={16}
                />

                <span>Продовжити з Google</span>
              </Link>
            }
            nativeButton={false}
          />

          <Button
            className="w-full"
            type="button"
            render={
              <Link href="">
                <Image
                  src="/logos/discord.png"
                  alt="Discord"
                  width={24}
                  height={24}
                />

                <span>Продовжити з Discord</span>
              </Link>
            }
            nativeButton={false}
          />
        </CardFooter>
      </Form>
    </Card>
  );
}
