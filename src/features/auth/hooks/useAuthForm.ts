import { useZodForm } from "@/shared/ui/form/form";
import { useMemo } from "react";
import z from "zod";

export const useAuthForm = () => {
  const { form } = useZodForm(
    z.object({
      email: z.email(),
      password: z
        .string()
        .min(8, "Password must be at least 8 characters")
        .max(128, "Password must be at most 128 characters"),
    }),
    {
      defaultValues: {
        email: "",
        password: "",
      },
    },
  );

  return useMemo(() => ({ form }), []);
};
