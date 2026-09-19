import { socials } from "@/features/ui/header/lib/socials";
import { SocialLink } from "@/features/ui/header/ui/socials/SocialLink";
import { cn } from "cn";

export const SocialLinksList = ({ className }: { className?: string }) => {
  return (
    <ul className={cn("flex flex-col", className ?? "")}>
      <li>
        <SocialLink href={socials.facebook} src="/logos/facebook.png">
          <span>Facebook</span>
        </SocialLink>
      </li>

      <li>
        <SocialLink href={socials.youtube} src="/logos/youtube.png">
          <span>Youtube</span>
        </SocialLink>
      </li>

      <li>
        <SocialLink href={socials.instagram} src="/logos/instagram.png">
          <span>Instagram</span>
        </SocialLink>
      </li>
    </ul>
  );
};
