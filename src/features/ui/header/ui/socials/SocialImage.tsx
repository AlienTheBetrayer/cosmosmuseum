import Image from "next/image";

export const SocialImage = ({ src }: { src: string }) => {
  return (
    <div className="flex justify-center items-center aspect-square rounded-full bg-background border-foreground/10 border h-full group-hover:bg-accent transition">
      <Image
        alt="social"
        src={src}
        width={16}
        height={16}
        className="grayscale-100 group-hover:grayscale-50 transition"
      />
    </div>
  );
};
