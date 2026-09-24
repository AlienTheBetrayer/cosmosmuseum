import { motion } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";

const socials = [
  {
    name: "Facebook",
    description: "Стежте за нами",
    icon: "/logos/facebook.png",
    href: "#",
  },
  {
    name: "YouTube",
    description: "Дивіться наші відео",
    icon: "/logos/youtube.png",
    href: "#",
  },
  {
    name: "Instagram",
    description: "Дивіться, чим ми займаємося",
    icon: "/logos/instagram.png",
    href: "#",
  },
];

export const SocialLinksList = () => {
  return (
    <div className="w-full">
      {/* Header */}
      <div className="px-2.5 pb-2.5 pt-2">
        <p className="text-sm font-semibold tracking-tight">Ми в соцмережах</p>

        <p className="mt-0.5 text-xs text-muted-foreground">
          Приєднуйся до КОСМОСУ
        </p>
      </div>

      <div className="space-y-1">
        {socials.map((social, index) => {
          const Icon = social.icon;

          return (
            <motion.a
              key={social.name}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, x: -4 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{
                delay: index * 0.04,
                duration: 0.2,
              }}
              className="
                group flex items-center gap-3
                rounded-xl
                px-2.5 py-2
                transition-all duration-200
                hover:bg-foreground/[0.06]
              "
            >
              <span
                className="
                  flex h-9 w-9 shrink-0
                  items-center justify-center
                  rounded-xl
                  border border-foreground/[0.08]
                  bg-foreground/[0.04]
                  text-foreground/70
                  shadow-sm
                  transition-all duration-200
                  group-hover:scale-105
                  group-hover:border-foreground/[0.14]
                  group-hover:bg-foreground/[0.08]
                  group-hover:text-foreground
                "
              >
                <Image src={social.icon} width={17} height={17} alt="" />
              </span>

              <span className="min-w-0 flex-1">
                <span className="block text-sm font-medium">{social.name}</span>

                <span className="block truncate text-[11px] text-muted-foreground">
                  {social.description}
                </span>
              </span>

              <ArrowUpRight
                size={15}
                className="
                  text-muted-foreground/40
                  transition-all duration-200
                  group-hover:-translate-y-0.5
                  group-hover:translate-x-0.5
                  group-hover:text-foreground/70
                "
              />
            </motion.a>
          );
        })}
      </div>

      <div className="mt-2 border-t border-foreground/[0.07] px-2.5 pt-2">
        <span className="text-[10px] font-medium uppercase tracking-widest text-muted-foreground/40">
          КОСМОС
        </span>
      </div>
    </div>
  );
};
