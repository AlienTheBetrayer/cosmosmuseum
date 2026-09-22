"use client";

import { contracts } from "@/backend";
import { api } from "@/shared/lib/api";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useMemo } from "react";

export const useLogoutMutation = () => {
  // router
  const router = useRouter();

  // mutation
  const logout = useMutation({
    mutationFn: async (data: contracts.auth.Logout) => {
      const res = api.post("/api/auth/logout");
      return (await res).data;
    },

    onSuccess: () => {
      router.refresh();
    },
  });

  return useMemo(() => ({ logout }), [logout]);
};
