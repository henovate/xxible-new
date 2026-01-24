"use client";

import React, { useMemo } from "react";
import { MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function LocationClient({
  venueName,
  fullAddress,
}: {
  venueName: string;
  fullAddress: string;
}) {
  const mapSrc = useMemo(() => {
    const q = encodeURIComponent(fullAddress);
    return `https://www.google.com/maps?q=${q}&output=embed`;
  }, [fullAddress]);

  const openInMaps = () => {
    window.open(`https://www.google.com/maps?q=${encodeURIComponent(fullAddress)}`, "_blank", "noopener,noreferrer");
  };

  const directions = () => {
    window.open(
      `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(fullAddress)}`,
      "_blank",
      "noopener,noreferrer"
    );
  };

  return (
    <>
      <div className="mt-3 rounded-2xl border border-gray-200 bg-gray-50 p-4">
        <p className="text-sm font-extrabold text-gray-900">{venueName}</p>
        <p className="mt-1 text-sm text-gray-700 inline-flex items-start gap-2">
          <MapPin className="mt-0.5 h-4 w-4 text-gray-500" />
          <span>{fullAddress}</span>
        </p>

        <div className="mt-4 flex flex-col sm:flex-row gap-2">
          <Button variant="outline" className="rounded-xl border-gray-300" onClick={openInMaps}>
            Open in Maps
          </Button>
          <Button variant="outline" className="rounded-xl border-gray-300" onClick={directions}>
            Get directions
          </Button>
        </div>
      </div>

      <div className="mt-4 overflow-hidden rounded-2xl border border-gray-200 bg-gray-100">
        <iframe
          title="Event map"
          src={mapSrc}
          className="h-[280px] w-full"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>
    </>
  );
}
