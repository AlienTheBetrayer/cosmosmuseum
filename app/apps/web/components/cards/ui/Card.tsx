import Image from "next/image";

export const Card = ({ src }: { src: string }) => {
  return (
    <article className="flex rounded-4xl bg-card outline-2 outline-foreground/10 h-100 relative overflow-hidden">
      <Image alt={src} src={src} fill style={{ objectFit: "cover" }} className="w-full h-full" />
    </article>
  );
};
