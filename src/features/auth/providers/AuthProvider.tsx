"use client";

import { contracts } from "@/backend";
import { queryClient } from "@/shared/ui/providers/QueryProvider";
import { createContext, useContext, useEffect, useRef, useState } from "react";

export const AuthContext = createContext<contracts.auth.GetResponse | null>(
  null,
);

export const AuthProvider = ({
  auth,
  children,
}: {
  auth: contracts.auth.GetResponse | null;
  children: React.ReactNode;
}) => {
  // states
  const [authState, setAuthState] = useState<contracts.auth.GetResponse | null>(
    auth,
  );
  const previousAuth = useRef(auth);

  // state syncing
  useEffect(() => {
    setAuthState(auth);
  }, [auth, setAuthState]);

  useEffect(() => {
    if (previousAuth.current?.user?.id !== auth?.user?.id) {
      queryClient.invalidateQueries({
        queryKey: ["reactions"],
      });
    }

    previousAuth.current = auth;
  }, [auth]);

  return (
    <AuthContext.Provider value={authState}>{children}</AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  return ctx;
};
