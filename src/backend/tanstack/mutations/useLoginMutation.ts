"use client";

import { contracts } from "@/backend";
import { api } from "@/shared/lib/api";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useMemo } from "react";
import { UseFormReturn } from "react-hook-form";

export const useLoginMutation = (form: UseFormReturn<contracts.auth.Login>) => {
  // router
  const router = useRouter();

  // mutation
  const login = useMutation({
    mutationFn: async (data: contracts.auth.Login) => {
      const res = api.post("/api/auth/login", data);
      return (await res).data;
    },
    onError: (e) => {
      const err = axios.isAxiosError(e) ? e.response : undefined;
      const field = err?.data?.errorData?.field;

      form.setError(field, { message: err?.data.error });
    },

    onSuccess: () => {
      router.refresh();
    },
  });

  return useMemo(() => ({ login }), [login]);
};
