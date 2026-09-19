import { Cards } from "@/features/ui/cards/ui/Cards";
import { Tags } from "@/features/ui/videoiframe/ui/Tags";
import { BackgroundVideo } from "@/features/ui/videoiframe/ui/VideoIFrame";
import { Separator } from "@/shared/ui";

export default function Home() {
  return (
    <main className="flex flex-col gap-8 overflow-x-hidden" id="home">
      <div className="w-full h-[110vh] p-4 overflow-hidden">
        <div className="flex flex-col gap-4 w-full h-full outline-4 outline-foreground/5 bg-foreground/5 rounded-xl">
          <BackgroundVideo />
          <Tags className="grow mx-auto p-8" />
        </div>
      </div>

      <Separator className="w-full max-w-6xl mx-auto" />

      <div className="p-2">
        <Cards />
      </div>

      <Separator className="w-full max-w-6xl mx-auto" />
    </main>
  );
}
