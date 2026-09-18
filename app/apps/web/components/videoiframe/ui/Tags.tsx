import { Tag } from "@/components/videoiframe/ui/Tag";
import { cn } from "cn";
import { Calendar, Star, Users } from "lucide-react";

export const Tags = ({ className }: { className?: string }) => {
  return (
    <ul
      className={cn(
        "flex sm:flex-row flex-col sm:gap-8 justify-center! items-center! rounded-2xl bg-background/95",
        className ?? "",
      )}
    >
      <li>
        <Tag icon={<Users />} number={"3M+"} text={"Total Visits"} />
      </li>

      <li>
        <Tag icon={<Calendar />} number={"2100+"} text={"Weekly Visits"} />
      </li>

      <li>
        <Tag icon={<Star />} number={"4.7"} text={"Google Rating"} />
      </li>
    </ul>
  );
};
