import { Cards } from "@/components/cards/ui/Cards";
import { Tags } from "@/components/videoiframe/ui/Tags";
import BackgroundVideo from "@/components/videoiframe/ui/VideoIFrame";

export default function Home() {
  return (
    <div className="flex flex-col gap-8 overflow-x-hidden" id="home">
      <div className="w-full h-[110vh] p-4 overflow-hidden">
        <div className="flex flex-col gap-4 w-full h-full outline-4 outline-foreground/5 bg-foreground/5 rounded-xl">
          <BackgroundVideo />
          <Tags className="grow mx-auto p-8" />
        </div>
      </div>

      <div className="p-2">
        <Cards />
      </div>
    </div>
  );
}
