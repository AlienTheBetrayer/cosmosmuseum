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
} from "@/shared/ui";
import Form from "@/shared/ui/form/form";
import Link from "next/link";

export default function ForgotPasswordPage() {
  // form
  const { form } = useAuthForm();

  // jsx
  return (
    <Card className="w-128 gap-4 shadowed">
      <CardHeader>
        <CardTitle>Відновлення пароля</CardTitle>
        <CardDescription>
          Буде відправлено посилання на вашу пошту, перейдіть по ньому
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
            placeholder="m@email.com"
            description="Ваша електронна пошта"
          />

          <Form.Input
            name="password"
            label="Пароль"
            description="Новий пароль для вашого облікового запису"
            id="password"
            placeholder="••••••"
          />
        </CardContent>

        <CardFooter className="flex flex-col gap-2">
          <Form.Submit>Відновити</Form.Submit>
        </CardFooter>
      </Form>
    </Card>
  );
}
