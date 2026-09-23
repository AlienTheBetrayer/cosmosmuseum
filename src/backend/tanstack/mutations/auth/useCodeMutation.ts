"use client";

import { contracts } from "@/backend";
import { login } from "@/backend/contracts/auth";
import { api } from "@/shared/lib/api";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useMemo } from "react";
import { UseFormReturn } from "react-hook-form";

export const useCodeMutation = (form: UseFormReturn<contracts.auth.Code>) => {
  // router
  const router = useRouter();

  // mutation
  const code = useMutation({
    mutationFn: async (data: contracts.auth.Code) => {
      const res = api.post("/api/auth/code", data);
      return (await res).data;
    },
    onError: (e) => {
      const err = axios.isAxiosError(e) ? e.response : undefined;
      const field = err?.data?.errorData?.field;

      form.setError(field, { message: err?.data.error });
    },
    onSuccess: (e) => {
      router.push("/forgot-password");
    },
  });

  return useMemo(() => ({ code }), [login]);
};
