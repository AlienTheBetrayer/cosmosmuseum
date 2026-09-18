import { Button } from "@/shared/ui";
import { LogIn } from "lucide-react";

export const AuthButton = () => {
  return (
    <Button>
      <span>Log In</span>
      <LogIn />
    </Button>
  );
};
