"use client";

import { contracts } from "@/backend";
import { useLoginMutation } from "@/backend/tanstack/mutations/auth/useLoginMutation";
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
  Spinner,
} from "@/shared/ui";
import Form, { useZodForm } from "@/shared/ui/form/form";
import Image from "next/image";
import Link from "next/link";

export default function LoginPage() {
  // form
  const { form } = useZodForm(contracts.auth.login, {
    defaultValues: {
      identifier: "",
      password: "",
    },
  });

  // mutation
  const { login } = useLoginMutation(form);

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
        onSubmit={(data) => {
          login.mutate(data);
        }}
        className="flex flex-col gap-4"
      >
        <CardContent className="flex flex-col gap-4">
          <Form.Input
            name="identifier"
            label="Iдентифікатор"
            id="identifier"
            description="Ваша електронна пошта або псевдонiм"
            placeholder="m@email.com / Джон Доу"
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
          <Form.Submit variant="outline">
            {login.isPending && <Spinner />}
            <span>Логін</span>
          </Form.Submit>

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
