import { Tags } from "@/components/videoiframe/ui/Tags";
import BackgroundVideo from "@/components/videoiframe/ui/VideoIFrame";

export default function Home() {
  return (
    <div className="w-full h-[110vh] p-4">
      <div className="flex flex-col gap-2 w-full h-full outline-4 outline-foreground/5 bg-foreground/5 rounded-xl">
        <BackgroundVideo />
        <Tags className="grow mx-auto p-4 pt-10" />
      </div>
    </div>
  );
}
