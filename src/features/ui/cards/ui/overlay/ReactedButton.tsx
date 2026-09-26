"use client";

import { Button } from "@/shared/ui";
import { useMemo } from "react";
import { contracts } from "@/backend";
import { useAddReactionMutation } from "@/features/ui/cards/hooks/useAddReactionMutation";
import { cn } from "cn";
import { nanoid } from "nanoid";
import { motion } from "motion/react";

export const ReactedButton = ({
  reactions,
}: {
  reactions: contracts.reactions.GetResponse[string] | null;
}) => {
  // states
  const { add } = useAddReactionMutation();

  const listedReactions = useMemo(() => {
    return reactions?.slice(0, 5);
  }, [reactions]);

  // fallbacks
  if (!reactions?.length) {
    return (
      <motion.span
        key="no-reactions"
        className="flex h-8 items-center justify-center rounded-full border border-white/10 bg-black/30 px-3 text-xs font-medium text-white/60 shadow-sm backdrop-blur-md"
        initial={{ opacity: 0, scale: 0.4 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.4 }}
        transition={{
          type: "spring",
          stiffness: 400,
          damping: 10,
        }}
      >
        Реакцій немає
      </motion.span>
    );
  }

  // jsx
  return (
    <motion.ul
      layout
      className="flex items-center gap-0.5"
      key="reactions-list"
    >
      {listedReactions?.map((reaction) => (
        <motion.li
          key={reaction.emoji}
          layout
          initial={{ opacity: 0, scale: 0.4 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.4 }}
          transition={{
            layout: {
              type: "spring",
              stiffness: 400,
              damping: 30,
            },
            opacity: { duration: 0.1 },
            scale: { duration: 0.2 },
          }}
          className="**:text-white"
        >
          <Button
            className={cn(
              "group relative h-8 min-w-11 gap-1.5 rounded-full px-2.5",
              "border border-white/10",
              "bg-black/35 backdrop-blur-md",
              "shadow-[0_2px_12px_rgba(0,0,0,0.2)]",
              "transition-all duration-300",
              "hover:-translate-y-0.5 hover:border-white/20 hover:bg-black/50",
              "active:translate-y-0 active:scale-95",
              reaction.liked &&
                "border-blue-400/30 bg-blue-500/20 shadow-[0_0_12px_rgba(59,130,246,0.15)] hover:bg-blue-400/50",
            )}
            onClick={() => {
              add.mutate({
                id: nanoid(),
                emoji: reaction.emoji,
                exhibit_id: reaction.exhibitId,
              });
            }}
          >
            <span>{reaction.emoji}</span>
            <span>{reaction.count}</span>
          </Button>
        </motion.li>
      ))}
    </motion.ul>
  );
};
