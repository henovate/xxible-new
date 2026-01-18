import * as React from "react";
import {
  Gamepad2,
  Home,
  Martini,
  Mic2,
  Music2,
  PartyPopper,
  Ship,
  Theater,
  Waves,
  Droplets,
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
    id: "lounges-bars",
    label: "Lounges &\nBars",
    href: "/categories/lounges-bars",
    icon: Martini,
  },
  {
    id: "beach-parties",
    label: "Beach\nParties",
    href: "/categories/beach-parties",
    icon: Waves,
  },
  {
    id: "house-parties",
    label: "House\nParties",
    href: "/categories/house-parties",
    icon: Home,
  },
  {
    id: "live-music-concerts",
    label: "Live Music\n& Concerts",
    href: "/categories/live-music-concerts",
    icon: Music2,
  },
  {
    id: "pool-parties",
    label: "Pool\nParties",
    href: "/categories/pool-parties",
    icon: Droplets,
  },
  {
    id: "karaoke-nights",
    label: "Karaoke\nNights",
    href: "/categories/karaoke-nights",
    icon: Mic2,
  },
  {
    id: "after-parties",
    label: "After-\nParties",
    href: "/categories/after-parties",
    icon: PartyPopper,
  },
  {
    id: "boat-parties",
    label: "Boat\nParties",
    href: "/categories/boat-parties",
    icon: Ship,
  },
  {
    id: "game-nights",
    label: "Game\nNights",
    href: "/categories/game-nights",
    icon: Gamepad2,
  },
];

function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

function Label({ text }: { text: string }) {
  return (
    <span className="block">
      {text.split("\n").map((line, i) => (
        <span key={i} className="block">
          {line}
        </span>
      ))}
    </span>
  );
}

function CategoryCard({
  cat,
  active,
  onSelect,
}: {
  cat: Category;
  active?: boolean;
  onSelect?: (cat: Category) => void;
}) {
  const Icon = cat.icon;

  const card = (
    <div
      className={cn(
        "rounded-2xl border bg-white shadow-sm transition",
        "hover:shadow-md hover:-translate-y-[1px]",
        "dark:bg-zinc-950 dark:border-zinc-800",
        active && "ring-2 ring-zinc-900/10 dark:ring-zinc-100/15"
      )}
    >
      <div className="flex flex-col items-center justify-center gap-3 p-5">
        <div
          className={cn(
            "grid place-items-center rounded-2xl border bg-white p-4",
            "shadow-[0_1px_0_rgba(0,0,0,0.03)]",
            "dark:bg-zinc-950 dark:border-zinc-800"
          )}
          aria-hidden="true"
        >
          <Icon className="h-6 w-6 text-zinc-700 dark:text-zinc-200" />
        </div>

        <div
          className={cn(
            "text-center text-zinc-900 dark:text-zinc-100",
            "font-semibold",
            "text-[13px] leading-4 sm:text-sm sm:leading-5 lg:text-[15px] lg:leading-5"
          )}
        >
          <Label text={cat.label} />
        </div>
      </div>
    </div>
  );

  if (cat.href && !onSelect) {
    return (
      <a
        href={cat.href}
        className="block rounded-2xl outline-none focus-visible:ring-2 focus-visible:ring-zinc-900/30 focus-visible:ring-offset-2 dark:focus-visible:ring-zinc-100/30 dark:focus-visible:ring-offset-zinc-950"
        aria-current={active ? "page" : undefined}
      >
        {card}
      </a>
    );
  }

  return (
    <button
      type="button"
      className="block w-full rounded-2xl text-left outline-none focus-visible:ring-2 focus-visible:ring-zinc-900/30 focus-visible:ring-offset-2 dark:focus-visible:ring-zinc-100/30 dark:focus-visible:ring-offset-zinc-950"
      onClick={() => onSelect?.(cat)}
      aria-pressed={active ? true : undefined}
    >
      {card}
    </button>
  );
}

export function CategoriesSection({
  categories = CATEGORIES,
  activeId,
  onSelect,
  className,
  mobileInitialCount = 6,
}: {
  categories?: Category[];
  activeId?: string;
  onSelect?: (cat: Category) => void;
  className?: string;
  mobileInitialCount?: number;
}) {
  const [expanded, setExpanded] = React.useState(false);

  const hiddenCount = Math.max(0, categories.length - mobileInitialCount);
  const mobileVisible = expanded
    ? categories
    : categories.slice(0, mobileInitialCount);

  return (
    <section className={cn("w-full", className)} aria-label="Categories">
      <div className="block sm:hidden">
        <div className="grid grid-cols-3 gap-4">
          {mobileVisible.map((cat) => (
            <CategoryCard
              key={cat.id}
              cat={cat}
              active={activeId === cat.id}
              onSelect={onSelect}
            />
          ))}
        </div>

        {hiddenCount > 0 && (
          <div className="mt-5">
            <div className="h-px w-full bg-zinc-200/70 dark:bg-zinc-800/70" />
            <button
              type="button"
              onClick={() => setExpanded((value) => !value)}
              className={cn(
                "mx-auto mt-4 flex items-center gap-2 rounded-full px-4 py-2",
                "text-sm font-semibold text-zinc-800 hover:text-zinc-950",
                "dark:text-zinc-200 dark:hover:text-white"
              )}
              aria-expanded={expanded}
            >
              {expanded ? "View less" : `View ${hiddenCount} more`}
              <svg
                className={cn(
                  "h-4 w-4 transition-transform",
                  expanded && "rotate-180"
                )}
                viewBox="0 0 24 24"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d="M7 10l5 5 5-5"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>
        )}
      </div>

      <div className="relative hidden sm:block">
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
          {categories.map((cat) => (
            <div key={cat.id} className="w-48 shrink-0" role="listitem">
              <CategoryCard
                cat={cat}
                active={activeId === cat.id}
                onSelect={onSelect}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
