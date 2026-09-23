"use client";

import { contracts } from "@/backend";
import { login } from "@/backend/contracts/auth";
import { api } from "@/shared/lib/api";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useMemo } from "react";
import { UseFormReturn } from "react-hook-form";

export const useForgotPasswordMutation = (
  form: UseFormReturn<contracts.auth.ForgotPassword>,
) => {
  // mutation
  const forgotPassword = useMutation({
    mutationFn: async (data: contracts.auth.ForgotPassword) => {
      const res = api.post("/api/auth/forgot-password", data);
      return (await res).data;
    },
    onError: (e) => {
      const err = axios.isAxiosError(e) ? e.response : undefined;
      const field = err?.data?.errorData?.field;

      form.setError(field, { message: err?.data.error });
    },
  });

  return useMemo(() => ({ forgotPassword }), [login]);
};
