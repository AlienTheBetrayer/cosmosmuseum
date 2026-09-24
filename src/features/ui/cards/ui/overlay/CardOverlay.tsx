"use client";

import { contracts } from "@/backend";
import { emojis } from "@/features/ui/cards/lib/emojis";
import {
  Button,
  EmojiPicker,
  EmojiPickerContent,
  EmojiPickerFooter,
  EmojiPickerSearch,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/shared/ui";
import { SlidingText } from "@/shared/ui/animations/SlidingText";
import { useState } from "react";
import { ReactedButton } from "@/features/ui/cards/ui/overlay/ReactedButton";
import { useAddReactionMutation } from "@/features/ui/cards/hooks/useAddReactionMutation";

export const CardOverlay = ({
  idx,
  data,
}: {
  idx: number;
  data: contracts.reactions.GetResponse[string] | undefined | null;
}) => {
  // states
  const [open, setOpen] = useState<boolean>(false);
  const { add } = useAddReactionMutation();

  // jsx
  return (
    <div
      className="flex justify-center items-center gap-1 absolute left-0 right-0 bottom-0 h-9 rounded-full"
      onClick={(e) => {
        e.stopPropagation();
      }}
    >
      {data === undefined ? (
        <span className="flex justify-center items-center skeleton w-full max-w-32 h-8" />
      ) : (
        <ReactedButton reactions={data} />
      )}

      <Popover onOpenChange={setOpen} open={open}>
        <PopoverTrigger
          render={
            <Button variant="ghost" className="bg-black/50 aspect-square">
              <SlidingText list={emojis} />
            </Button>
          }
        />
        <PopoverContent className="w-fit p-0">
          <EmojiPicker
            className="h-[342px]"
            onEmojiSelect={({ emoji }) => {
              setOpen(false);
              add.mutate({ emoji, exhibit_id: String(idx) });
            }}
          >
            <EmojiPickerSearch />
            <EmojiPickerContent />
            <EmojiPickerFooter />
          </EmojiPicker>
        </PopoverContent>
      </Popover>
    </div>
  );
};
