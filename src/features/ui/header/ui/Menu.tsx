import { contracts } from "@/backend";
import { AuthButton } from "@/features/auth/ui/AuthButton";
import { MiddleLinks } from "@/features/ui/header/ui/MiddleLinks";
import { SocialLinksList } from "@/features/ui/header/ui/socials/SocialLinksList";
import { ThemeList } from "@/features/ui/themes/ui/ThemeList";
import { Separator } from "@/shared/ui";
import { motion } from "motion/react";

export const Menu = ({ auth, onClose }: {   auth: contracts.auth.GetResponse | null, onClose: () => void }) => {
  return (
    <motion.div
      className="fixed w-screen h-full bg-black/50 backdrop-blur-[100px] z-11 overflow-hidden md:hidden"
      initial={{ maxHeight: "33vh", opacity: 0 }}
      animate={{ maxHeight: "100vh", opacity: 1 }}
      exit={{ maxHeight: "33vh", opacity: 0 }}
      onClick={onClose}
    >
      <ul className="flex flex-col gap-8 w-full h-full p-8">
        <li className="[&_a]:p-8 [&_a]:not-hover:bg-background/50 [&_span]:text-center [&_span]:text-foreground [&_a]:justify-center">
          <ul className="flex flex-col gap-2 **:w-full ">
            <MiddleLinks variant="ghost" />
          </ul>
        </li>

        <li>
          <Separator />
        </li>

        <li className="[&_a]:p-8 [&_a]:not-hover:bg-background/50 [&_span]:text-center [&_span]:text-foreground [&_a]:justify-center">
          <SocialLinksList className="gap-2" />
        </li>

        <li>
          <Separator />
        </li>

        <li>
          <ul className="flex flex-col gap-2">
            <li className="[&_button]:p-8 [&_button]:text-foreground">
              <ThemeList className="h-auto bg-background/50" />
            </li>

            <li className="*:w-full [&_a]:p-8">
              <AuthButton auth={auth} />
            </li>
          </ul>
        </li>
      </ul>
    </motion.div>
  );
};
