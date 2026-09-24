import { contracts } from "@/backend";
import { AuthButton } from "@/features/auth/ui/AuthButton";
import { MiddleLinks } from "@/features/ui/header/ui/MiddleLinks";
import { SocialLinksList } from "@/features/ui/header/ui/socials/SocialLinksList";
import { ThemeList } from "@/features/ui/themes/ui/ThemeList";
import { Separator } from "@/shared/ui";
import { motion } from "motion/react";

export const Menu = ({
  auth,
  onClose,
}: {
  auth: contracts.auth.GetResponse | null;
  onClose: () => void;
}) => {
  return (
    <motion.div
      className="
    fixed left-0 right-0 bottom-0
    top-[64px]
    z-40
    overflow-y-auto
    overscroll-contain
    bg-black/50
    backdrop-blur-[100px]
    md:hidden
    scrollbar-thin
  "
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <ul className="flex flex-col gap-8 w-full h-full p-8">
        <li className="[&_a]:p-8 [&_a]:not-hover:bg-background/50 [&_span]:text-center [&_span]:text-foreground [&_a]:justify-center">
          <ul className="flex flex-col gap-2 **:w-full" onClick={onClose}>
            <MiddleLinks variant="ghost" />
          </ul>
        </li>

        <li>
          <Separator />
        </li>

        <li className="[&_a]:p-8 [&_a]:not-hover:bg-background/50 [&_span]:text-center [&_span]:text-foreground [&_a]:justify-center">
          <SocialLinksList />
        </li>

        <li>
          <Separator />
        </li>

        <li>
          <ul className="flex flex-col gap-2">
            <li className="[&_button]:p-8 [&_button]:text-foreground">
              <ThemeList className="h-20 bg-background/50" />
            </li>

            <li className="*:w-full [&_a]:p-8 h-20 [&_span]:text-white">
              <AuthButton auth={auth} />
            </li>
          </ul>
        </li>
      </ul>
    </motion.div>
  );
};
