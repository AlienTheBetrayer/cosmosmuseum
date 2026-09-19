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
            <Link href="/home/#home">
              <span>Дім</span>
            </Link>
          }
        >
          <span>Дім</span>
        </Button>
      </li>

      <li>
        <Button
          variant={variant ?? "ghost"}
          nativeButton={false}
          render={
            <Link href="/home/#exhibits">
              <span>Експонати</span>
            </Link>
          }
        />
      </li>
    </>
  );
};
