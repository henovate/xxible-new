"use client";

import React, { useMemo, useState } from "react";
import { Users, Ticket, Minus, Plus, Check } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

export type TicketTier = {
  id: string;
  name: string;
  price: number; // 0 allowed
  currency?: string;
  note?: string;
  badge?: string; // e.g. "Free", "VIP", "Table"
};

function money(n: number, currency = "₦") {
  if (!n || n <= 0) return "Free";
  return `${currency}${n.toLocaleString()}`;
}

function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, n));
}

export default function TicketModalClient(props: {
  eventTitle: string;
  tiers: TicketTier[];
  startsAtISO: string;
  endsAtISO: string;
  venueAddress: string;
  currencyFallback?: string;
}) {
  const currencyFallback = props.currencyFallback ?? "₦";

  const defaultTierId = props.tiers?.[0]?.id ?? "tier";
  const [tierId, setTierId] = useState(defaultTierId);
  const [qty, setQty] = useState(1);

  const selectedTier = useMemo(() => {
    return props.tiers.find((t) => t.id === tierId) ?? props.tiers[0];
  }, [props.tiers, tierId]);

  const unit = selectedTier?.price ?? 0;
  const currency = selectedTier?.currency ?? currencyFallback;
  const total = unit * qty;

  const canCheckout = !!selectedTier;

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="w-full rounded-xl bg-gray-900 text-white hover:bg-gray-800">
          Attend
          <Users className="ml-2 h-4 w-4" />
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[520px] rounded-2xl">
        <DialogHeader>
          <DialogTitle className="text-lg font-extrabold">Choose tickets</DialogTitle>
          <p className="text-sm text-gray-600 mt-1">{props.eventTitle}</p>
        </DialogHeader>

        {/* Tier selector */}
        <div className="mt-2">
          <p className="text-sm font-extrabold text-gray-900">Ticket tiers</p>

          <RadioGroup value={tierId} onValueChange={setTierId} className="mt-3 space-y-2">
            {props.tiers.map((t) => {
              const isSelected = t.id === tierId;
              return (
                <label
                  key={t.id}
                  className={[
                    "flex items-start gap-3 rounded-2xl border p-4 cursor-pointer transition",
                    isSelected ? "border-gray-900 bg-gray-50" : "border-gray-200 bg-white hover:bg-gray-50",
                  ].join(" ")}
                >
                  <RadioGroupItem value={t.id} id={t.id} className="mt-1" />
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-3">
                      <div className="min-w-0">
                        <p className="text-sm font-extrabold text-gray-900 truncate">{t.name}</p>
                        {t.note ? <p className="mt-1 text-xs text-gray-600">{t.note}</p> : null}
                      </div>

                      <div className="flex items-center gap-2">
                        {t.badge ? (
                          <Badge variant="secondary" className="rounded-full bg-gray-100 text-gray-700">
                            {t.badge}
                          </Badge>
                        ) : null}
                        <span className="text-sm font-extrabold text-gray-900">{money(t.price, t.currency ?? currencyFallback)}</span>
                      </div>
                    </div>

                    {isSelected ? (
                      <p className="mt-2 inline-flex items-center gap-2 text-xs font-semibold text-gray-700">
                        <Check className="h-4 w-4" />
                        Selected
                      </p>
                    ) : null}
                  </div>
                </label>
              );
            })}
          </RadioGroup>
        </div>

        {/* Quantity */}
        <div className="mt-4 rounded-2xl border border-gray-200 bg-white p-4">
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="text-sm font-extrabold text-gray-900">Quantity</p>
              <p className="text-xs text-gray-600">How many tickets?</p>
            </div>

            <div className="flex items-center gap-2">
              <Button
                type="button"
                variant="outline"
                className="rounded-xl border-gray-300"
                // onClick={() => setQty((q) => clamp(q - 1, 1, 10))}
              >
                <Minus className="h-4 w-4" />
              </Button>

              <div className="w-12 text-center text-sm font-extrabold text-gray-900">{qty}</div>

              <Button
                type="button"
                variant="outline"
                className="rounded-xl border-gray-300"
                // onClick={() => setQty((q) => clamp(q + 1, 1, 10))}
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="mt-3 flex items-center justify-between text-sm">
            <span className="text-gray-600">Total</span>
            <span className="font-extrabold text-gray-900">{money(total, currency)}</span>
          </div>
        </div>

        {/* Actions */}
        <div className="mt-2 space-y-2">
          <Button
            disabled={!canCheckout}
            className="w-full rounded-xl bg-gray-900 text-white hover:bg-gray-800"
            // onClick={() => {
            //   // Replace with your checkout / RSVP / payment flow
            //   // Example: open auth gate, create pending order, etc.
            //   console.log("Attend:", {
            //     tier: selectedTier,
            //     qty,
            //     total,
            //     eventTitle: props.eventTitle,
            //     venueAddress: props.venueAddress,
            //     startsAtISO: props.startsAtISO,
            //   });
            // }}
          >
            Continue
            <Ticket className="ml-2 h-4 w-4" />
          </Button>

          <p className="text-xs text-gray-600">
            By continuing, you agree to XXIBLE’s community rules and event entry policies.
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
