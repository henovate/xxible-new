"use client";

import React from "react";

export type GenderFilter = "all" | "female" | "male";

export default function GenderFilterChips({
  value,
  onChange,
}: {
  value: GenderFilter;
  onChange: (v: GenderFilter) => void;
}) {
  const Chip = ({ k, label }: { k: GenderFilter; label: string }) => {
    const active = value === k;
    return (
      <button
        type="button"
        onClick={() => onChange(k)}
        className={[
          "rounded-full px-3 py-1.5 text-sm font-bold border transition",
          active
            ? "bg-gray-900 text-white border-gray-900"
            : "bg-white text-gray-800 border-gray-200 hover:bg-gray-50",
        ].join(" ")}
      >
        {label}
      </button>
    );
  };

  return (
    <div className="flex flex-wrap gap-2">
      <Chip k="all" label="All" />
      <Chip k="female" label="Female" />
      <Chip k="male" label="Male" />
    </div>
  );
}
