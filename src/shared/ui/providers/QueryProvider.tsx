"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useRef } from "react";

export const QueryProvider = ({ children }: { children: React.ReactNode }) => {
  // client creation
  const client = useRef<QueryClient | null>(null);

  if (client.current === null) {
    client.current = new QueryClient();
  }

  // jsx
  return (
    <QueryClientProvider client={client.current}>
      {children}
    </QueryClientProvider>
  );
};
