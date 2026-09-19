import { Button } from "@/shared/ui";
import Image from "next/image";
import Link from "next/link";

export const SocialLink = ({
  src,
  href,
  children,
}: {
  src: string;
  href: string;
  children: React.ReactNode;
}) => {
  return (
    <Button
      className="w-full justify-start"
      variant="ghost"
      render={
        <Link href={href} target="_blank" rel="noopener noreferrer">
          <Image alt="social" src={src} width={16} height={16} />
          {children}
        </Link>
      }
      nativeButton={false}
    />
  );
};
