"use client";

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
import { contracts } from "@/backend";
import { useSignupMutation } from "@/features/auth/hooks/useSignupMutation";

export default function SignupPage() {
  // form
  const { form } = useZodForm(contracts.auth.signup, {
    defaultValues: {
      email: "",
      username: "",
      password: "",
    },
  });

  // mutation
  const { signup } = useSignupMutation(form);

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

      <Form
        form={form}
        onSubmit={(data) => {
          signup.mutate(data);
        }}
        className="flex flex-col gap-4"
      >
        <CardContent className="flex flex-col gap-4">
          <Form.Input
            name="username"
            label="Псевдонім"
            id="username"
            description="Ваше ім'я користувача"
            placeholder="Джон Доу"
          />

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
          <Form.Submit variant="outline">
            {signup.isPending && <Spinner />}
            <span>Реєстрація</span>
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
