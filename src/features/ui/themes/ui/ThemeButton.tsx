"use client";

import { Button, ButtonProps } from "@/shared/ui";
import { cn } from "cn";

export const ThemeButton = ({
  onClick,
  children,
  className,
  isSelected,
}: Pick<ButtonProps, "children" | "onClick" | "className"> & {
  isSelected: boolean;
}) => {
  return (
    <Button
      className={cn(
        "aspect-square rounded-full hover:bg-background/30",
        isSelected ? "not-hover:bg-foreground/6" : "",
        className ?? "",
      )}
      variant="ghost"
      onClick={onClick}
    >
      {children}
    </Button>
  );
};
