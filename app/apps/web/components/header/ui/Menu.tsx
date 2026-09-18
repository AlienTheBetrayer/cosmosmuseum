import { MiddleLinks } from "@/components/header/ui/MiddleLinks";
import { Button } from "@/shared/ui";
import { X } from "lucide-react";
import { motion } from "motion/react";

export const Menu = ({ onClose }: { onClose: () => void }) => {
  return (
    <motion.div
      className="fixed w-screen h-screen bg-black/50 backdrop-blur-xl z-11 overflow-hidden md:hidden"
      initial={{ maxHeight: "50vh", opacity: 0 }}
      animate={{ maxHeight: "100vh", opacity: 1 }}
      exit={{ maxHeight: "50vh", opacity: 0 }}
      onClick={onClose}
    >
      <ul className="flex flex-col gap-2 w-full h-full p-4">
        <li>
          <ul className="flex flex-col gap-2 **:w-full [&_a]:p-8 [&_a]:not-hover:bg-black/50 [&_span]:text-center">
            <MiddleLinks variant="ghost" />
          </ul>
        </li>

        <li className="mt-auto">
          <Button onClick={onClose} className="w-full p-8" variant="destructive">
            <X />
            <span>Close</span>
          </Button>
        </li>
      </ul>
    </motion.div>
  );
};
