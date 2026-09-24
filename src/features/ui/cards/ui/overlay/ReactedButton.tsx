"use client";

import { Button } from "@/shared/ui";
import { useMemo } from "react";
import { contracts } from "@/backend";
import { useAddReactionMutation } from "@/features/ui/cards/hooks/useAddReactionMutation";
import { cn } from "cn";
import { nanoid } from "nanoid";

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
      <span className="text-white rounded-md bg-black/40 h-8 px-2 flex items-center justify-center">
        Реакціій немає
      </span>
    );
  }

  // jsx
  return (
    <ul className="flex items-center">
      {listedReactions?.map((reaction, idx) => (
        <li key={idx} className="**:text-white">
          <Button
            className={
              (cn("transition-all duration-500"),
              reaction.liked
                ? "not-hover:bg-blue-600/50 hover:bg-blue-600/30"
                : "not-hover:bg-black/50 hover:bg-black/30")
            }
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
        </li>
      ))}
    </ul>
  );
};
