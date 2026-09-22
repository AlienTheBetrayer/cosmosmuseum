"use client";

import { contracts } from "@/backend";
import { useCodeMutation } from "@/backend/tanstack/mutations/auth/useCodeMutation";
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
  const { form } = useZodForm(contracts.auth.code, {
    defaultValues: {
      email: "",
    },
  });

  // mutation
  const { code } = useCodeMutation(form);

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
          code.mutate(data);
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
        </CardContent>

        <CardFooter className="flex flex-col gap-2">
          <Form.Submit>
            {code.isPending && <Spinner />}
            <span>Відновити</span>
          </Form.Submit>
        </CardFooter>
      </Form>
    </Card>
  );
}
