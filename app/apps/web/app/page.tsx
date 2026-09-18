import { Tags } from "@/components/videoiframe/ui/Tags";
import BackgroundVideo from "@/components/videoiframe/ui/VideoIFrame";

export default function Home() {
  return (
    <div className="w-full h-[110vh] p-4 overflow-hidden">
      <div className="grid grid-rows-[9fr_auto] gap-2 w-full h-full outline-4 outline-foreground/5 bg-foreground/5 rounded-xl">
        <div className="w-full h-full rounded-xl overflow-hidden">
          <BackgroundVideo />
        </div>

        <Tags className="grow mx-auto p-4" />
      </div>
    </div>
  );
}
