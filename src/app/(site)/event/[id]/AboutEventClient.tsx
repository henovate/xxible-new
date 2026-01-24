"use client";

import React, { useMemo, useState } from "react";
import { Badge } from "@/components/ui/badge";

function truncate(text: string, max: number) {
  if (!text) return "";
  if (text.length <= max) return text;
  return text.slice(0, max).trimEnd() + "…";
}

export default function AboutEventClient({
  title = "About this event",
  description,
  categories = [],
  maxChars = 360,
}: {
  title?: string;
  description: string;
  categories?: string[];
  maxChars?: number;
}) {
  const [expanded, setExpanded] = useState(false);

  const isLong = (description?.length ?? 0) > maxChars;

  const shownText = useMemo(() => {
    if (!isLong) return description;
    return expanded ? description : truncate(description, maxChars);
  }, [description, expanded, isLong, maxChars]);

  return (
    <>
      <h2 className="text-lg font-extrabold text-gray-900">{title}</h2>

      <p className="mt-3 text-sm sm:text-[15px] leading-6 text-gray-700 whitespace-pre-line">
        {shownText}
      </p>

      {/* Read more / Read less — placed AFTER the text */}
      {isLong ? (
        <button
          type="button"
          onClick={() => setExpanded((v) => !v)}
          className="mt-2 text-sm font-semibold text-gray-700 hover:text-gray-900 underline underline-offset-4"
        >
          {expanded ? "Read less" : "Read more"}
        </button>
      ) : null}

      {categories?.length ? (
        <div className="mt-4 flex flex-wrap gap-2">
          {categories.map((c) => (
            <Badge
              key={c}
              variant="secondary"
              className="rounded-full bg-gray-100 text-gray-700 hover:bg-gray-200"
            >
              {c}
            </Badge>
          ))}
        </div>
      ) : null}
    </>
  );
}
