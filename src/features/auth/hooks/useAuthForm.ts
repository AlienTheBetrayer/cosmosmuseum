import { contracts } from "@/backend";
import { useZodForm } from "@/shared/ui/form/form";
import { useMemo } from "react";

export const useAuthForm = () => {
  const { form } = useZodForm(contracts.auth.signup, {
    defaultValues: {
      email: "",
      username: "",
      password: "",
    },
  });

  return useMemo(() => ({ form }), []);
};
