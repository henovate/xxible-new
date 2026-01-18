"use client";

import * as React from "react";
import { Search } from "lucide-react";
import clsx from "clsx";

type HeroSearchBarProps = {
  placeholder?: string;
  defaultValue?: string;
  onSearch?: (query: string) => void;
  className?: string;
};

export default function HeroSearchBar({
  placeholder = "Search for any event...",
  defaultValue = "",
  onSearch,
  className,
}: HeroSearchBarProps) {
  const [query, setQuery] = React.useState(defaultValue);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch?.(query);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={clsx(
        "flex w-full max-w-2xl mx-auto overflow-hidden rounded-xl bg-white border-[5px] border-white shadow-sm",
        className
      )}
    >
      {/* Input */}
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder={placeholder}
        className="flex-1 bg-transparent px-6 py-4 text-[15px] text-gray-900 placeholder-gray-400 focus:outline-none"
      />

      {/* Search button */}
      <button
        type="submit"
        aria-label="Search"
        className="flex items-center justify-center bg-gray-900 px-5 text-white transition hover:bg-gray-800"
      >
        <Search className="h-5 w-5" />
      </button>
    </form>
  );
}
