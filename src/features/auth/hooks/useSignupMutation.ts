"use client";

import { contracts } from "@/backend";
import { api } from "@/shared/lib/api";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useMemo } from "react";
import { UseFormReturn } from "react-hook-form";

export const useSignupMutation = (
  form: UseFormReturn<contracts.auth.Signup>,
) => {
    // router
  const router = useRouter();
  
  // mutation
  const signup = useMutation({
    mutationFn: async (data: contracts.auth.Signup) => {
      const res = api.post("/api/auth/signup", data);
      return (await res).data;
    },
    onError: (e) => {
      const err = axios.isAxiosError(e) ? e.response : undefined;
      const field = err?.data?.errorData?.field;

      form.setError(field, { message: err?.data.error });
    },
    onSuccess: () => {
      router.push("/login");
    }
  });

  return useMemo(() => ({ signup }), [signup]);
};
