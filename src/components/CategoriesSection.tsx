import * as React from "react";
import {
  Droplets,
  Home,
  Martini,
  Mic2,
  Music2,
  Sparkles,
  Theater,
  Waves,
} from "lucide-react";

type Category = {
  id: string;
  label: string;
  href?: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
};

const CATEGORIES: Category[] = [
  {
    id: "nightclubs",
    label: "Nightclubs",
    href: "/categories/nightclubs",
    icon: Theater,
  },
  {
    id: "lounges",
    label: "Lounges &\nBars",
    href: "/categories/lounges-bars",
    icon: Martini,
  },
  {
    id: "beach",
    label: "Beach\nParties",
    href: "/categories/beach-parties",
    icon: Waves,
  },
  {
    id: "house",
    label: "House\nParties",
    href: "/categories/house-parties",
    icon: Home,
  },
  {
    id: "pool",
    label: "Pool Parties",
    href: "/categories/pool-parties",
    icon: Droplets,
  },
  {
    id: "ai",
    label: "AI Services",
    href: "/categories/ai-services",
    icon: Sparkles,
  },
  {
    id: "music",
    label: "Music &\nAudio",
    href: "/categories/music-audio",
    icon: Music2,
  },
  {
    id: "karaoke",
    label: "Karaoke\nNights",
    href: "/categories/karaoke",
    icon: Mic2,
  },
];

function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

export function CategoriesSection({
  categories = CATEGORIES,
  activeId,
  onSelect,
  className,
}: {
  categories?: Category[];
  activeId?: string;
  onSelect?: (cat: Category) => void;
  className?: string;
}) {
  return (
    <section className={cn("w-full", className)} aria-label="Categories">
      <div className="relative">
        <div className="pointer-events-none absolute inset-y-0 left-0 w-10 bg-gradient-to-r from-white to-transparent dark:from-zinc-950" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-10 bg-gradient-to-l from-white to-transparent dark:from-zinc-950" />

        <div
          className={cn(
            "flex gap-4 overflow-x-auto py-2",
            "scrollbar-none [-ms-overflow-style:none] [scrollbar-width:none]",
            "[&::-webkit-scrollbar]:hidden"
          )}
          role="list"
        >
          {categories.map((cat) => {
            const Icon = cat.icon;
            const isActive = activeId === cat.id;

            const cardInner = (
              <div
                className={cn(
                  "flex h-24 w-44 shrink-0 items-center justify-center rounded-2xl",
                  "border bg-white shadow-sm transition",
                  "hover:shadow-md hover:-translate-y-[1px]",
                  "dark:bg-zinc-950 dark:border-zinc-800",
                  isActive && "ring-2 ring-zinc-900/10 dark:ring-zinc-100/15"
                )}
              >
                <div className="flex flex-col items-center gap-2 text-center">
                  <div
                    className={cn(
                      "grid place-items-center rounded-xl border bg-white p-2",
                      "shadow-[0_1px_0_rgba(0,0,0,0.03)]",
                      "dark:bg-zinc-950 dark:border-zinc-800"
                    )}
                    aria-hidden="true"
                  >
                    <Icon className="h-5 w-5 text-zinc-700 dark:text-zinc-200" />
                  </div>

                  <div className="px-2 text-sm font-medium leading-4 text-zinc-900 dark:text-zinc-100">
                    {cat.label.split("\n").map((line, i) => (
                      <div key={i}>{line}</div>
                    ))}
                  </div>
                </div>
              </div>
            );

            return cat.href ? (
              <a
                key={cat.id}
                href={cat.href}
                role="listitem"
                className="outline-none focus-visible:ring-2 focus-visible:ring-zinc-900/30 focus-visible:ring-offset-2 dark:focus-visible:ring-zinc-100/30 dark:focus-visible:ring-offset-zinc-950 rounded-2xl"
                aria-current={isActive ? "page" : undefined}
                onClick={(event) => {
                  if (onSelect) {
                    event.preventDefault();
                    onSelect(cat);
                  }
                }}
              >
                {cardInner}
              </a>
            ) : (
              <button
                key={cat.id}
                type="button"
                role="listitem"
                className="rounded-2xl outline-none focus-visible:ring-2 focus-visible:ring-zinc-900/30 focus-visible:ring-offset-2 dark:focus-visible:ring-zinc-100/30 dark:focus-visible:ring-offset-zinc-950"
                onClick={() => onSelect?.(cat)}
                aria-pressed={isActive ? true : undefined}
              >
                {cardInner}
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
