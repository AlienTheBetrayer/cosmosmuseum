import { SocialImage } from "@/features/ui/header/ui/socials/SocialImage";
import { SocialLinksList } from "@/features/ui/header/ui/socials/SocialLinksList";
import { Button, Popover, PopoverContent, PopoverTrigger } from "@/shared/ui";

export const Socials = () => {
  return (
    <Popover>
      <PopoverTrigger
        render={
          <Button className="px-0 group" variant="ghost">
            <ul className="flex w-full h-full">
              <li className="z-2">
                <SocialImage src="/logos/facebook.png" />
              </li>

              <li className="-ml-3 z-1">
                <SocialImage src="/logos/youtube.png" />
              </li>

              <li className="-ml-3">
                <SocialImage src="/logos/instagram.png" />
              </li>
            </ul>
          </Button>
        }
      />

      <PopoverContent className="max-w-48 p-2">
        <SocialLinksList />
      </PopoverContent>
    </Popover>
  );
};
