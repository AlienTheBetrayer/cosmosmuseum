import { ContextMenuGroup } from "@/shared/ui/context-menu";
import { QueryProvider } from "@/shared/ui/providers/QueryProvider";
import { ThemeProvider } from "@/shared/ui/providers/ThemeProvider";
import { TooltipProvider } from "@/shared/ui/tooltip";
import { NuqsAdapter } from "nuqs/adapters/next";

export const MasterProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <ThemeProvider>
      <TooltipProvider>
        <ContextMenuGroup className="w-full">
          <QueryProvider>
            <NuqsAdapter>{children}</NuqsAdapter>
          </QueryProvider>
        </ContextMenuGroup>
      </TooltipProvider>
    </ThemeProvider>
  );
};
