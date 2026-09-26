import { contracts } from "@/backend";
import { ContextMenuGroup } from "@/shared/ui/context-menu";
import { AuthProvider } from "@/features/auth/providers/AuthProvider";
import { QueryProvider } from "@/shared/ui/providers/QueryProvider";
import { ThemeProvider } from "@/shared/ui/providers/ThemeProvider";
import { TooltipProvider } from "@/shared/ui/tooltip";
import { NuqsAdapter } from "nuqs/adapters/next";

export const MasterProvider = ({
  auth,
  children,
}: {
  auth: contracts.auth.GetResponse | null;
  children: React.ReactNode;
}) => {
  return (
    <AuthProvider auth={auth}>
      <ThemeProvider>
        <TooltipProvider>
          <ContextMenuGroup className="w-full">
            <QueryProvider>
              <NuqsAdapter>{children}</NuqsAdapter>
            </QueryProvider>
          </ContextMenuGroup>
        </TooltipProvider>
      </ThemeProvider>
    </AuthProvider>
  );
};
