import { cn } from "cn";
import { Button, type ButtonProps } from "../button";

export default function FormSubmit({ type = "submit", children, className, ...props }: ButtonProps) {
  return (
    <Button
      type={type}
      className={cn("w-full", className ?? "")}
      {...props}
    >
      {children}
    </Button>
  );
}
