"use client";

import { contracts } from "@/backend";
import { useForgotPasswordMutation } from "@/features/auth/hooks/useForgotPasswordMutation";
import {
  Button,
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  Spinner,
} from "@/shared/ui";
import Form, { useZodForm } from "@/shared/ui/form/form";
import Link from "next/link";

export default function ForgotPasswordPage() {
  // form
  const { form } = useZodForm(contracts.auth.forgotPassword, {
    defaultValues: {
      email: "",
      password: "",
      code: "",
    },
  });

  // mutation
  const { forgotPassword } = useForgotPasswordMutation(form);

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

      <Form
        form={form}
        onSubmit={(data) => {
          forgotPassword.mutate(data);
        }}
        className="flex flex-col gap-4"
      >
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
            id="password"
            placeholder="••••••"
            description="Пароль для вашого облікового запису"
          />

          <Form.Input
            name="code"
            label="Код"
            id="code"
            placeholder="••••••"
            description="Код з листа надісланий на пошту"
          />
        </CardContent>

        <CardFooter className="flex flex-col gap-2">
          <Form.Submit>
            {forgotPassword.isPending && <Spinner />}
            <span>Відновити</span>
          </Form.Submit>
        </CardFooter>
      </Form>
    </Card>
  );
}
