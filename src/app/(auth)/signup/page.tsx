"use client";

import { useAuthForm } from "@/features/auth/hooks/useAuthForm";
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
import Image from "next/image";
import Link from "next/link";

export default function SignupPage() {
  // form
  const { form } = useAuthForm();

  // jsx
  return (
    <Card className="w-128 gap-4 shadowed">
      <CardHeader>
        <CardTitle>Реєстрація</CardTitle>
        <CardDescription>
          Ви створите свій обліковий запис, буде згенеровано ваш профіль
        </CardDescription>
        <CardAction>
          <Button
            variant="link"
            render={<Link href="/login">Логін</Link>}
            nativeButton={false}
          />
        </CardAction>
      </CardHeader>

      <Form form={form} onSubmit={(data) => {}} className="flex flex-col gap-4">
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
            description="Пароль для вашого облікового запису"
            placeholder="••••••"
          />
        </CardContent>

        <CardFooter className="flex flex-col gap-2">
          <Form.Submit variant="outline">Реєстрація</Form.Submit>

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
