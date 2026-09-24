"use client";

import { SocialImage } from "@/features/ui/header/ui/socials/SocialImage";
import { SocialLinksList } from "@/features/ui/header/ui/socials/SocialLinksList";
import {
  Button,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/shared/ui";

export const Socials = () => {
  return (
    <Popover>
      <PopoverTrigger
        render={
          <Button
            variant="ghost"
            className="
              group relative h-8 w-auto
              rounded-full
              border border-foreground/10
              hover:border-foreground/15
              bg-foreground/[0.035]
              px-2
              backdrop-blur-md
              transition-all duration-300
              hover:bg-foreground/[0.07]
              hover:shadow-[0_4px_20px_rgba(0,0,0,0.12)]
              active:scale-95
            "
          >
            <span
              className="
                pointer-events-none absolute inset-0
                rounded-full
                bg-white/[0.03]
                opacity-0
                transition-opacity duration-300
                group-hover:opacity-100
              "
            />

            <ul className="relative flex items-center">
              <li className="relative z-30">
                <SocialImage src="/logos/facebook.png" />
              </li>

              <li className="relative z-20 -ml-2">
                <SocialImage src="/logos/youtube.png" />
              </li>

              <li className="relative z-10 -ml-2">
                <SocialImage src="/logos/instagram.png" />
              </li>
            </ul>

            <span
              className="
                ml-1.5 h-1.5 w-1.5
                rounded-full
                bg-foreground/30
                transition-all duration-300
                group-hover:bg-foreground/60
                group-hover:scale-110
              "
            />
          </Button>
        }
      />

      <PopoverContent
        align="end"
        sideOffset={8}
        className="
          w-64
          overflow-hidden
          rounded-2xl
          border border-foreground/10
          bg-background/90
          p-1.5
          shadow-[0_12px_40px_rgba(0,0,0,0.18)]
          backdrop-blur-xl
        "
      >
        <SocialLinksList />
      </PopoverContent>
    </Popover>
  );
};