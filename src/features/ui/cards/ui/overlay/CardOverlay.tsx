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
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/shared/ui";
import { SlidingText } from "@/shared/ui/animations/SlidingText";
import { useState } from "react";
import { ReactedButton } from "@/features/ui/cards/ui/overlay/ReactedButton";
import { useAddReactionMutation } from "@/features/ui/cards/hooks/useAddReactionMutation";
import { cn } from "cn";
import { useAuth } from "@/features/auth/providers/AuthProvider";

export const CardOverlay = ({
  idx,
  data,
}: {
  idx: number;
  data: contracts.reactions.GetResponse[string] | undefined | null;
}) => {
  // states
  const [popoverOpen, setPopoverOpen] = useState<boolean>(false);
  const [tooltipOpen, setTooltipOpen] = useState<boolean>(false);
  const { add } = useAddReactionMutation();
  const auth = useAuth();

  // jsx
  return (
    <Tooltip
      open={auth?.user ? false : tooltipOpen}
      onOpenChange={setTooltipOpen}
    >
      <TooltipTrigger
        render={
          <div
            className={cn(
              "flex justify-center items-center gap-1 absolute left-0 right-0 bottom-0 h-9 rounded-full",
              auth?.user
                ? ""
                : "[&_button]:pointer-events-none [&_button]:cursor-not-allowed",
            )}
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            {data === undefined ? (
              <span className="flex justify-center items-center skeleton w-full max-w-32 h-8" />
            ) : (
              <ReactedButton reactions={data} />
            )}

            <Popover onOpenChange={setPopoverOpen} open={popoverOpen}>
              <PopoverTrigger
                render={
                  <Button
                    variant="ghost"
                    className={cn(
                      "group relative aspect-square h-8 w-8 overflow-hidden rounded-full p-0",
                      "border border-white/10 bg-black/30 backdrop-blur-md",
                      "shadow-[0_2px_12px_rgba(0,0,0,0.25)]",
                      "transition-all duration-300",
                      "hover:-translate-y-0.5 hover:border-white/20 hover:bg-white/10",
                      "hover:shadow-[0_4px_18px_rgba(0,0,0,0.3)]",
                      "active:translate-y-0 active:scale-90",
                    )}
                  >
                    {/* subtle glow */}
                    <span className="pointer-events-none absolute inset-0 rounded-full bg-white/0 transition-all duration-300 group-hover:bg-white/10" />

                    <span className="relative flex h-full w-full items-center justify-center text-base">
                      <SlidingText list={emojis} />
                    </span>
                  </Button>
                }
              />
              <PopoverContent className="w-fit p-0">
                <EmojiPicker
                  className="h-[342px]"
                  onEmojiSelect={({ emoji }) => {
                    setPopoverOpen(false);
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
        }
      />

      <TooltipContent side="bottom">
        <span className="text-center">
          Реагувати можно тільки в авторизованому режимі
        </span>
      </TooltipContent>
    </Tooltip>
  );
};
