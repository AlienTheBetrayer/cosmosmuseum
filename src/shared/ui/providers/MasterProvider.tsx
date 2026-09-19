import { ContextMenuGroup } from "@/shared/ui/context-menu";
import { ThemeProvider } from "@/shared/ui/providers/ThemeProvider";
import { TooltipProvider } from "@/shared/ui/tooltip";

export const MasterProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <ThemeProvider>
      <TooltipProvider>
        <ContextMenuGroup className="w-full">{children}</ContextMenuGroup>
      </TooltipProvider>
    </ThemeProvider>
  );
};
