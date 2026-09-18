import { Button, ButtonProps } from "@/shared/ui";
import Link from "next/link";

export const MiddleLinks = ({
  variant,
}: {
  variant?: ButtonProps["variant"];
}) => {
  return (
    <>
      <li>
        <Button
          variant={variant ?? "ghost"}
          nativeButton={false}
          render={
            <Link href="#home">
              <span>Home</span>
            </Link>
          }
        >
          <span>Home</span>
        </Button>
      </li>

      <li>
        <Button
          variant={variant ?? "ghost"}
          nativeButton={false}
          render={
            <Link href="#exhibits">
              <span>Exhibits</span>
            </Link>
          }
        />
      </li>
    </>
  );
};
