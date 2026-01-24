"use client";

import React, { useMemo, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowLeft,
  Plus,
  Trash2,
  MapPin,
  CalendarDays,
  Ticket,
  UploadCloud,
  Image as ImageIcon,
  X,
} from "lucide-react";

import Container from "@/components/layout/Container";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

type BrandLocation = {
  id: string;
  name: string;
  address: string;
  city: string;
  country: string;
  latitude: number | null;
  longitude: number | null;
};

type TicketTier = {
  name: string;
  price: number; // 0 = free
  quantityLimit?: number | null;
};

type LocationState =
  | { mode: "existing"; locationId: string }
  | {
      mode: "new";
      name: string;
      address: string;
      city: string;
      country: string;
      latitude?: number;
      longitude?: number;
      saveToBrand: boolean;
    };

type UploadedImage = {
  url: string;
  publicId: string;
};

type FormState = {
  // Step 1
  title: string;
  category: string;
  description: string;

  // images
  cover: UploadedImage | null;
  gallery: UploadedImage[]; // max 3

  // Step 2
  startsAt: string; // datetime-local string
  endsAt: string; // datetime-local string (optional)
  timezoneLabel: string; // display only

  // Step 3
  location: LocationState;

  // Step 4
  tickets: TicketTier[];
};

function cx(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

function money(n: number, currency = "₦") {
  if (!n || n <= 0) return "Free";
  return `${currency}${Number(n).toLocaleString()}`;
}

function toISOFromLocal(dtLocal: string) {
  const d = new Date(dtLocal);
  return d.toISOString();
}

async function uploadToCloudinary(file: File): Promise<UploadedImage> {
  const fd = new FormData();
  fd.append("file", file);

  const res = await fetch("/api/upload", { method: "POST", body: fd });
  const data = await res.json();

  if (!res.ok) throw new Error(data?.error || "Upload failed");

  return { url: data.url, publicId: data.publicId };
}

export default function CreateEventWizardClient({
  brandId,
  brandLocations,
}: {
  brandId: string;
  brandLocations: BrandLocation[];
}) {
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // upload states
  const [isUploadingCover, setIsUploadingCover] = useState(false);
  const [isUploadingGallery, setIsUploadingGallery] = useState(false);

  const coverInputRef = useRef<HTMLInputElement | null>(null);
  const galleryInputRef = useRef<HTMLInputElement | null>(null);

  const [form, setForm] = useState<FormState>(() => ({
    title: "",
    category: "Nightclub",
    description: "",

    cover: null,
    gallery: [],

    startsAt: "",
    endsAt: "",
    timezoneLabel: "WAT",

    location:
      brandLocations.length > 0
        ? { mode: "existing", locationId: brandLocations[0].id }
        : {
            mode: "new",
            name: "",
            address: "",
            city: "Lagos",
            country: "Nigeria",
            saveToBrand: true,
          },

    tickets: [
      { name: "Free Entry", price: 0, quantityLimit: null },
      { name: "VIP Experience", price: 15000, quantityLimit: 50 },
    ],
  }));

  const selectedExistingLocation = useMemo(() => {
    const loc = form.location;
    if (loc.mode !== "existing") return null;
    return brandLocations.find((l) => l.id === loc.locationId) ?? null;
  }, [form.location, brandLocations]);

  const locationSummary = useMemo(() => {
    if (form.location.mode === "existing") {
      const loc = selectedExistingLocation;
      if (!loc) return null;
      return {
        name: loc.name,
        address: `${loc.address}, ${loc.city}, ${loc.country}`,
      };
    }
    return {
      name: form.location.name,
      address: `${form.location.address}, ${form.location.city}, ${form.location.country}`,
    };
  }, [form.location, selectedExistingLocation]);

  // ---------- uploads ----------
  async function onPickCover(file?: File | null) {
    if (!file) return;
    setError(null);
    setIsUploadingCover(true);
    try {
      const uploaded = await uploadToCloudinary(file);
      setForm((s) => ({ ...s, cover: uploaded }));
    } catch (e: any) {
      setError(e?.message || "Failed to upload cover image.");
    } finally {
      setIsUploadingCover(false);
      if (coverInputRef.current) coverInputRef.current.value = "";
    }
  }

  async function onPickGallery(files?: FileList | null) {
    if (!files || files.length === 0) return;

    setError(null);

    const remaining = 3 - form.gallery.length;
    if (remaining <= 0) {
      setError("Maximum of 3 gallery images.");
      return;
    }

    const picked = Array.from(files).slice(0, remaining);

    setIsUploadingGallery(true);
    try {
      const uploads = await Promise.all(picked.map((f) => uploadToCloudinary(f)));
      setForm((s) => ({ ...s, gallery: [...s.gallery, ...uploads].slice(0, 3) }));
    } catch (e: any) {
      setError(e?.message || "Failed to upload gallery image(s).");
    } finally {
      setIsUploadingGallery(false);
      if (galleryInputRef.current) galleryInputRef.current.value = "";
    }
  }

  function removeGalleryIndex(idx: number) {
    setForm((s) => ({ ...s, gallery: s.gallery.filter((_, i) => i !== idx) }));
  }

  function removeCover() {
    setForm((s) => ({ ...s, cover: null }));
  }

  // ---------- validation ----------
  function validateStep(s: 1 | 2 | 3 | 4): string | null {
    if (s === 1) {
      if (!form.title.trim()) return "Event title is required.";
      if (!form.category.trim()) return "Category is required.";
      if (!form.description.trim()) return "Description is required.";
      if (!form.cover?.url) return "Cover image is required.";
      if (form.gallery.length > 3) return "Maximum of 3 gallery images.";
    }

    if (s === 2) {
      if (!form.startsAt) return "Start date & time is required.";
      if (form.endsAt) {
        const start = new Date(form.startsAt).getTime();
        const end = new Date(form.endsAt).getTime();
        if (!Number.isNaN(start) && !Number.isNaN(end) && end <= start) {
          return "End time must be after start time.";
        }
      }
    }

    if (s === 3) {
      if (form.location.mode === "existing") {
        if (!form.location.locationId) return "Please select a location.";
        if (!selectedExistingLocation) return "Selected location is invalid.";
      } else {
        if (!form.location.name.trim()) return "Location name is required.";
        if (!form.location.address.trim()) return "Location address is required.";
        if (!form.location.city.trim()) return "City is required.";
        if (!form.location.country.trim()) return "Country is required.";
      }
    }

    if (s === 4) {
      if (!form.tickets.length) return "Add at least one ticket tier.";
      for (const t of form.tickets) {
        if (!t.name.trim()) return "Each ticket tier must have a name.";
        if (typeof t.price !== "number" || Number.isNaN(t.price) || t.price < 0) {
          return "Ticket price must be 0 or more.";
        }
      }
    }

    return null;
  }

  function goNext() {
    const v = validateStep(step);
    if (v) return setError(v);
    setError(null);
    setStep((prev) => (prev < 4 ? ((prev + 1) as any) : prev));
  }

  function goBack() {
    setError(null);
    setStep((prev) => (prev > 1 ? ((prev - 1) as any) : prev));
  }

  // ---------- submit ----------
  async function submit(publish: boolean) {
    // validate all steps before submit
    for (const s of [1, 2, 3, 4] as const) {
      const v = validateStep(s);
      if (v) {
        setError(v);
        setStep(s);
        return;
      }
    }

    if (isUploadingCover || isUploadingGallery) {
      setError("Please wait for uploads to finish.");
      return;
    }

    setIsSubmitting(true);
    setError(null);

    // Build location payload expected by POST /api/brands/[brandId]/events
    const locationPayload =
      form.location.mode === "existing"
        ? { locationId: form.location.locationId }
        : {
            newLocation: {
              name: form.location.name,
              address: form.location.address,
              city: form.location.city,
              country: form.location.country,
              latitude: form.location.latitude,
              longitude: form.location.longitude,
              saveToBrand: form.location.saveToBrand,
            },
          };

    const payload = {
      title: form.title,
      description: form.description,
      category: form.category,

      // ✅ cover
      imageUrl: form.cover!.url,
      imagePublicId: form.cover!.publicId,
      imageAlt: null,

      // ✅ gallery
      galleryUrls: form.gallery.map((g) => g.url),
      galleryPublicIds: form.gallery.map((g) => g.publicId),

      startsAt: toISOFromLocal(form.startsAt),
      endsAt: form.endsAt ? toISOFromLocal(form.endsAt) : null,

      publish,
      location: locationPayload,

      tickets: form.tickets.map((t) => ({
        name: t.name,
        price: Number(t.price),
        quantityLimit: t.quantityLimit ?? null,
      })),
    };

    try {
      const res = await fetch(`/api/brands/${brandId}/events`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data?.error || "Failed to create event.");
        setIsSubmitting(false);
        return;
      }

      // ✅ best UX after create
      window.location.href = `/brands/${brandId}/events`;
    } catch {
      setError("Network error. Please try again.");
      setIsSubmitting(false);
    }
  }

  // ---------- UI ----------
  const coverPreview = form.cover?.url || "/assets/events/event3.png";

  return (
    <div className="min-h-screen bg-gray-50">
      <Container className="py-6 sm:py-8">
        {/* Top bar */}
        <div className="flex items-center justify-between gap-3">
          <Link
            href={`/brands/${brandId}/events`}
            className="inline-flex items-center gap-2 text-sm font-semibold text-gray-700 hover:text-gray-900"
          >
            <ArrowLeft className="h-4 w-4" />
            Back
          </Link>

          <div className="flex items-center gap-2">
            <Badge className="rounded-full bg-gray-900 text-white">Create Event</Badge>
            <Badge variant="secondary" className="rounded-full bg-gray-100 text-gray-700">
              Step {step}/4
            </Badge>
          </div>
        </div>

        {/* Layout */}
        <div className="mt-6 grid grid-cols-1 lg:grid-cols-12 gap-5">
          {/* Main */}
          <div className="lg:col-span-8 space-y-5">
            <Card className="rounded-2xl border border-gray-200 bg-white shadow-sm">
              <CardContent className="p-4 sm:p-6">
                <WizardSteps step={step} setStep={setStep} />

                {error ? (
                  <div className="mt-4 rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
                    {error}
                  </div>
                ) : null}

                <div className="mt-5">
                  {step === 1 ? (
                    <StepBasics
                      form={form}
                      setForm={setForm}
                      coverInputRef={coverInputRef}
                      galleryInputRef={galleryInputRef}
                      onPickCover={onPickCover}
                      onPickGallery={onPickGallery}
                      removeCover={removeCover}
                      removeGalleryIndex={removeGalleryIndex}
                      isUploadingCover={isUploadingCover}
                      isUploadingGallery={isUploadingGallery}
                    />
                  ) : step === 2 ? (
                    <StepDateTime form={form} setForm={setForm} />
                  ) : step === 3 ? (
                    <StepLocation
                      form={form}
                      setForm={setForm}
                      brandLocations={brandLocations}
                    />
                  ) : (
                    <StepTickets form={form} setForm={setForm} />
                  )}
                </div>

                {/* Controls */}
                <div className="mt-6 flex items-center justify-between">
                  <Button
                    variant="outline"
                    className="rounded-xl border-gray-300"
                    onClick={goBack}
                    disabled={step === 1}
                  >
                    Back
                  </Button>

                  {step < 4 ? (
                    <Button
                      className="rounded-xl bg-gray-900 text-white hover:bg-gray-800"
                      onClick={goNext}
                    >
                      Continue
                    </Button>
                  ) : (
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        className="rounded-xl border-gray-300"
                        onClick={() => submit(false)}
                        disabled={isSubmitting || isUploadingCover || isUploadingGallery}
                      >
                        Save Draft
                      </Button>
                      <Button
                        className="rounded-xl bg-gray-900 text-white hover:bg-gray-800"
                        onClick={() => submit(true)}
                        disabled={isSubmitting || isUploadingCover || isUploadingGallery}
                      >
                        {isSubmitting ? "Publishing..." : "Publish"}
                      </Button>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right column preview */}
          <div className="lg:col-span-4 space-y-5">
            <div className="lg:sticky lg:top-6 space-y-5">
              <Card className="rounded-2xl border border-gray-200 bg-white shadow-sm overflow-hidden">
                <CardContent className="p-0">
                  <div className="relative aspect-[16/10] bg-gray-100">
                    <Image
                      src={coverPreview}
                      alt="Cover"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="p-4">
                    <p className="text-xs font-semibold text-gray-600">Preview</p>
                    <p className="mt-1 text-lg font-extrabold text-gray-900 leading-tight line-clamp-2">
                      {form.title || "Event title"}
                    </p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      <Badge className="rounded-full bg-gray-900 text-white">{form.category || "Category"}</Badge>
                      <Badge variant="secondary" className="rounded-full bg-gray-100 text-gray-700">
                        {form.tickets?.length ? money(Math.min(...form.tickets.map((t) => t.price))) : "Tickets"}
                      </Badge>
                    </div>

                    <div className="mt-4 space-y-2 text-sm text-gray-700">
                      <div className="flex items-start gap-2">
                        <CalendarDays className="mt-0.5 h-4 w-4 text-gray-500" />
                        <span className="line-clamp-2">
                          {form.startsAt ? new Date(form.startsAt).toLocaleString() : "Set date & time"}
                        </span>
                      </div>
                      <div className="flex items-start gap-2">
                        <MapPin className="mt-0.5 h-4 w-4 text-gray-500" />
                        <span className="line-clamp-2">
                          {locationSummary?.name
                            ? `${locationSummary.name} — ${locationSummary.address}`
                            : "Set location"}
                        </span>
                      </div>
                      <div className="flex items-start gap-2">
                        <Ticket className="mt-0.5 h-4 w-4 text-gray-500" />
                        <span className="line-clamp-2">
                          {form.tickets?.length ? `${form.tickets.length} ticket tier(s)` : "Add ticket tiers"}
                        </span>
                      </div>
                      <div className="flex items-start gap-2">
                        <ImageIcon className="mt-0.5 h-4 w-4 text-gray-500" />
                        <span className="line-clamp-2">
                          {form.gallery.length ? `${form.gallery.length} gallery image(s)` : "No gallery images"}
                        </span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="rounded-2xl border border-gray-200 bg-white shadow-sm">
                <CardContent className="p-4">
                  <p className="text-sm font-extrabold text-gray-900">Publishing checklist</p>
                  <ul className="mt-3 space-y-2 text-sm text-gray-700">
                    <li className={cx("flex gap-2", form.title.trim() ? "" : "text-gray-400")}>
                      <span className="mt-2 h-2 w-2 rounded-full bg-gray-900" />
                      Title
                    </li>
                    <li className={cx("flex gap-2", form.description.trim() ? "" : "text-gray-400")}>
                      <span className="mt-2 h-2 w-2 rounded-full bg-gray-900" />
                      Description
                    </li>
                    <li className={cx("flex gap-2", form.cover?.url ? "" : "text-gray-400")}>
                      <span className="mt-2 h-2 w-2 rounded-full bg-gray-900" />
                      Cover image
                    </li>
                    <li className={cx("flex gap-2", form.startsAt ? "" : "text-gray-400")}>
                      <span className="mt-2 h-2 w-2 rounded-full bg-gray-900" />
                      Date & time
                    </li>
                    <li className={cx("flex gap-2", locationSummary?.name ? "" : "text-gray-400")}>
                      <span className="mt-2 h-2 w-2 rounded-full bg-gray-900" />
                      Location
                    </li>
                    <li className={cx("flex gap-2", form.tickets.length ? "" : "text-gray-400")}>
                      <span className="mt-2 h-2 w-2 rounded-full bg-gray-900" />
                      Ticket tiers
                    </li>
                    <li className={cx("flex gap-2", form.gallery.length <= 3 ? "" : "text-gray-400")}>
                      <span className="mt-2 h-2 w-2 rounded-full bg-gray-900" />
                      Gallery (max 3)
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}

function WizardSteps({
  step,
  setStep,
}: {
  step: 1 | 2 | 3 | 4;
  setStep: (s: 1 | 2 | 3 | 4) => void;
}) {
  const items = [
    { id: 1 as const, label: "Basics" },
    { id: 2 as const, label: "Date & Time" },
    { id: 3 as const, label: "Location" },
    { id: 4 as const, label: "Tickets" },
  ];

  return (
    <div className="flex flex-wrap gap-2">
      {items.map((it) => {
        const active = it.id === step;
        const done = it.id < step;
        return (
          <button
            key={it.id}
            type="button"
            onClick={() => setStep(it.id)}
            className={cx(
              "rounded-full px-3 py-1.5 text-sm font-bold border transition",
              active
                ? "bg-gray-900 text-white border-gray-900"
                : done
                ? "bg-white text-gray-900 border-gray-200 hover:bg-gray-50"
                : "bg-white text-gray-600 border-gray-200 hover:bg-gray-50"
            )}
          >
            {it.label}
          </button>
        );
      })}
    </div>
  );
}

// ------------------- STEP 1 -------------------
function StepBasics({
  form,
  setForm,
  coverInputRef,
  galleryInputRef,
  onPickCover,
  onPickGallery,
  removeCover,
  removeGalleryIndex,
  isUploadingCover,
  isUploadingGallery,
}: {
  form: FormState;
  setForm: React.Dispatch<React.SetStateAction<FormState>>;
  coverInputRef: React.RefObject<HTMLInputElement | null>;
  galleryInputRef: React.RefObject<HTMLInputElement | null>;
  onPickCover: (file?: File | null) => Promise<void>;
  onPickGallery: (files?: FileList | null) => Promise<void>;
  removeCover: () => void;
  removeGalleryIndex: (idx: number) => void;
  isUploadingCover: boolean;
  isUploadingGallery: boolean;
}) {

  const categories = ["Nightclub", "Lounge", "Beach Party", "Concert", "Festival", "House Party", "Rave"];

  return (
    <div className="space-y-4">
      <div>
        <label className="text-sm font-bold text-gray-900">Event title</label>
        <input
          value={form.title}
          onChange={(e) => setForm((s) => ({ ...s, title: e.target.value }))}
          className="mt-2 w-full rounded-xl border border-gray-200 bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-gray-900/10"
          placeholder="Neon Friday: Rooftop Party & Live DJ"
        />
      </div>

      <div>
        <label className="text-sm font-bold text-gray-900">Category</label>
        <select
          value={form.category}
          onChange={(e) => setForm((s) => ({ ...s, category: e.target.value }))}
          className="mt-2 w-full rounded-xl border border-gray-200 bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-gray-900/10"
        >
          {categories.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </div>

      {/* Cover upload */}
      <div className="rounded-2xl border border-gray-200 bg-white p-4">
        <div className="flex items-center justify-between gap-3">
          <div>
            <p className="text-sm font-extrabold text-gray-900">Cover image</p>
            <p className="mt-1 text-xs text-gray-600">Required. Use “Choose file” to upload.</p>
          </div>

          <div className="flex items-center gap-2">
            <input
              ref={coverInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => onPickCover(e.target.files?.[0])}
            />
            <Button
              type="button"
              className="rounded-xl bg-gray-900 text-white hover:bg-gray-800"
              onClick={() => coverInputRef.current?.click()}
              disabled={isUploadingCover}
            >
              <UploadCloud className="mr-2 h-4 w-4" />
              {isUploadingCover ? "Uploading..." : "Choose file"}
            </Button>
          </div>
        </div>

        <div className="mt-3">
          <div className="relative aspect-[16/9] w-full overflow-hidden rounded-2xl bg-gray-100">
            <Image
              src={form.cover?.url || "/assets/events/event3.png"}
              alt="Cover preview"
              fill
              className="object-cover"
            />
          </div>

          {form.cover?.url ? (
            <div className="mt-3 flex justify-end">
              <Button
                type="button"
                variant="outline"
                className="rounded-xl border-gray-300"
                onClick={removeCover}
                disabled={isUploadingCover}
              >
                <X className="mr-2 h-4 w-4" />
                Remove cover
              </Button>
            </div>
          ) : null}
        </div>
      </div>

      {/* Gallery upload */}
      <div className="rounded-2xl border border-gray-200 bg-white p-4">
        <div className="flex items-center justify-between gap-3">
          <div>
            <p className="text-sm font-extrabold text-gray-900">Gallery images</p>
            <p className="mt-1 text-xs text-gray-600">Optional. Maximum of 3 images.</p>
          </div>

          <div className="flex items-center gap-2">
            <input
              ref={galleryInputRef}
              type="file"
              accept="image/*"
              multiple
              className="hidden"
              onChange={(e) => onPickGallery(e.target.files)}
            />
            <Button
              type="button"
              variant="outline"
              className="rounded-xl border-gray-300"
              onClick={() => galleryInputRef.current?.click()}
              disabled={isUploadingGallery || form.gallery.length >= 3}
            >
              <Plus className="mr-2 h-4 w-4" />
              {isUploadingGallery ? "Uploading..." : "Add images"}
            </Button>
          </div>
        </div>

        {form.gallery.length ? (
          <div className="mt-4 grid grid-cols-3 gap-3">
            {form.gallery.map((img, idx) => (
              <div key={img.publicId} className="relative overflow-hidden rounded-2xl bg-gray-100 border border-gray-200">
                <div className="relative aspect-square">
                  <Image src={img.url} alt={`Gallery ${idx + 1}`} fill className="object-cover" />
                </div>
                <button
                  type="button"
                  onClick={() => removeGalleryIndex(idx)}
                  className="absolute right-2 top-2 rounded-full bg-white/90 p-1 text-gray-800 hover:bg-white"
                  title="Remove"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div className="mt-3 rounded-2xl border border-dashed border-gray-200 bg-gray-50 p-4 text-sm text-gray-700 flex items-center gap-2">
            <ImageIcon className="h-4 w-4 text-gray-500" />
            <span>No gallery images yet.</span>
          </div>
        )}
      </div>

      <div>
        <label className="text-sm font-bold text-gray-900">Description</label>
        <textarea
          value={form.description}
          onChange={(e) => setForm((s) => ({ ...s, description: e.target.value }))}
          className="mt-2 min-h-[140px] w-full rounded-xl border border-gray-200 bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-gray-900/10"
          placeholder="Tell people what to expect, vibe, dress code, etc..."
        />
      </div>
    </div>
  );
}

// ------------------- STEP 2 -------------------
function StepDateTime({
  form,
  setForm,
}: {
  form: FormState;
  setForm: React.Dispatch<React.SetStateAction<FormState>>;
}) {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div>
          <label className="text-sm font-bold text-gray-900">Start</label>
          <input
            type="datetime-local"
            value={form.startsAt}
            onChange={(e) => setForm((s) => ({ ...s, startsAt: e.target.value }))}
            className="mt-2 w-full rounded-xl border border-gray-200 bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-gray-900/10"
          />
        </div>

        <div>
          <label className="text-sm font-bold text-gray-900">End (optional)</label>
          <input
            type="datetime-local"
            value={form.endsAt}
            onChange={(e) => setForm((s) => ({ ...s, endsAt: e.target.value }))}
            className="mt-2 w-full rounded-xl border border-gray-200 bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-gray-900/10"
          />
        </div>
      </div>

      <div>
        <label className="text-sm font-bold text-gray-900">Timezone</label>
        <input
          value={form.timezoneLabel}
          readOnly
          className="mt-2 w-full rounded-xl border border-gray-200 bg-gray-50 px-3 py-2 text-sm text-gray-700"
        />
        <p className="mt-2 text-xs text-gray-600">Timezone is fixed for now (Nigeria/WAT).</p>
      </div>
    </div>
  );
}

// ------------------- STEP 3 -------------------
function StepLocation({
  form,
  setForm,
  brandLocations,
}: {
  form: FormState;
  setForm: React.Dispatch<React.SetStateAction<FormState>>;
  brandLocations: BrandLocation[];
}) {
  const loc = form.location;

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => {
            if (brandLocations.length === 0) return;
            setForm((s) => ({
              ...s,
              location: { mode: "existing", locationId: brandLocations[0].id },
            }));
          }}
          className={cx(
            "rounded-full px-3 py-1.5 text-sm font-bold border transition",
            loc.mode === "existing"
              ? "bg-gray-900 text-white border-gray-900"
              : "bg-white text-gray-800 border-gray-200 hover:bg-gray-50",
            brandLocations.length === 0 && "opacity-50 cursor-not-allowed"
          )}
          disabled={brandLocations.length === 0}
        >
          Use saved location
        </button>

        <button
          type="button"
          onClick={() =>
            setForm((s) => ({
              ...s,
              location: {
                mode: "new",
                name: "",
                address: "",
                city: "Lagos",
                country: "Nigeria",
                saveToBrand: true,
              },
            }))
          }
          className={cx(
            "rounded-full px-3 py-1.5 text-sm font-bold border transition",
            loc.mode === "new"
              ? "bg-gray-900 text-white border-gray-900"
              : "bg-white text-gray-800 border-gray-200 hover:bg-gray-50"
          )}
        >
          Add new location
        </button>
      </div>

      {loc.mode === "existing" ? (
        <div className="space-y-3">
          <div>
            <label className="text-sm font-bold text-gray-900">Select location</label>
            <select
              value={loc.locationId}
              onChange={(e) =>
                setForm((s) => ({
                  ...s,
                  location: { mode: "existing", locationId: e.target.value },
                }))
              }
              className="mt-2 w-full rounded-xl border border-gray-200 bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-gray-900/10"
            >
              {brandLocations.map((l) => (
                <option key={l.id} value={l.id}>
                  {l.name} — {l.city}
                </option>
              ))}
            </select>
          </div>

          {(() => {
            const selected = brandLocations.find((l) => l.id === loc.locationId);
            if (!selected) return null;
            return (
              <div className="rounded-2xl border border-gray-200 bg-gray-50 p-4 text-sm text-gray-700">
                <p className="font-extrabold text-gray-900">{selected.name}</p>
                <p className="mt-1">{selected.address}</p>
                <p className="mt-1 text-gray-600">
                  {selected.city}, {selected.country}
                </p>
              </div>
            );
          })()}
        </div>
      ) : (
        <div className="space-y-3">
          <div>
            <label className="text-sm font-bold text-gray-900">Place/Venue name</label>
            <input
              value={loc.name}
              onChange={(e) =>
                setForm((s) => ({
                  ...s,
                  location: { ...(s.location as any), name: e.target.value },
                }))
              }
              className="mt-2 w-full rounded-xl border border-gray-200 bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-gray-900/10"
              placeholder="Skyline Rooftop"
            />
          </div>

          <div>
            <label className="text-sm font-bold text-gray-900">Address</label>
            <input
              value={loc.address}
              onChange={(e) =>
                setForm((s) => ({
                  ...s,
                  location: { ...(s.location as any), address: e.target.value },
                }))
              }
              className="mt-2 w-full rounded-xl border border-gray-200 bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-gray-900/10"
              placeholder="12A Adeola Odeku, Victoria Island"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="text-sm font-bold text-gray-900">City</label>
              <input
                value={loc.city}
                onChange={(e) =>
                  setForm((s) => ({
                    ...s,
                    location: { ...(s.location as any), city: e.target.value },
                  }))
                }
                className="mt-2 w-full rounded-xl border border-gray-200 bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-gray-900/10"
                placeholder="Lagos"
              />
            </div>

            <div>
              <label className="text-sm font-bold text-gray-900">Country</label>
              <input
                value={loc.country}
                onChange={(e) =>
                  setForm((s) => ({
                    ...s,
                    location: { ...(s.location as any), country: e.target.value },
                  }))
                }
                className="mt-2 w-full rounded-xl border border-gray-200 bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-gray-900/10"
                placeholder="Nigeria"
              />
            </div>
          </div>

          <label className="flex items-center gap-2 text-sm text-gray-700">
            <input
              type="checkbox"
              checked={loc.saveToBrand}
              onChange={(e) =>
                setForm((s) => ({
                  ...s,
                  location: { ...(s.location as any), saveToBrand: e.target.checked },
                }))
              }
              className="h-4 w-4"
            />
            Save this location to Brand for future events
          </label>

          <div className="rounded-2xl border border-gray-200 bg-gray-50 p-4 text-xs text-gray-600">
            Later we can add Google Maps autocomplete + lat/lng automatically.
          </div>
        </div>
      )}
    </div>
  );
}

// ------------------- STEP 4 -------------------
function StepTickets({
  form,
  setForm,
}: {
  form: FormState;
  setForm: React.Dispatch<React.SetStateAction<FormState>>;
}) {
  function addTier() {
    setForm((s) => ({
      ...s,
      tickets: [...s.tickets, { name: "New tier", price: 0, quantityLimit: null }],
    }));
  }

  function removeTier(idx: number) {
    setForm((s) => ({
      ...s,
      tickets: s.tickets.filter((_, i) => i !== idx),
    }));
  }

  function updateTier(idx: number, patch: Partial<TicketTier>) {
    setForm((s) => ({
      ...s,
      tickets: s.tickets.map((t, i) => (i === idx ? { ...t, ...patch } : t)),
    }));
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-3">
        <div>
          <p className="text-sm font-extrabold text-gray-900">Ticket tiers</p>
          <p className="mt-1 text-xs text-gray-600">
            XXIBLE supports Free + VIP + Table reservations in one event.
          </p>
        </div>

        <Button variant="outline" className="rounded-xl border-gray-300" onClick={addTier}>
          <Plus className="mr-2 h-4 w-4" />
          Add tier
        </Button>
      </div>

      <div className="space-y-3">
        {form.tickets.map((t, idx) => (
          <div key={idx} className="rounded-2xl border border-gray-200 bg-white p-4">
            <div className="flex items-start justify-between gap-3">
              <p className="text-sm font-extrabold text-gray-900">Tier {idx + 1}</p>
              <button
                type="button"
                onClick={() => removeTier(idx)}
                className="text-sm font-semibold text-rose-600 hover:text-rose-700"
                disabled={form.tickets.length <= 1}
                title={form.tickets.length <= 1 ? "At least one tier is required" : "Remove tier"}
              >
                <span className="inline-flex items-center gap-2">
                  <Trash2 className="h-4 w-4" />
                  Remove
                </span>
              </button>
            </div>

            <div className="mt-3 grid grid-cols-1 sm:grid-cols-12 gap-3">
              <div className="sm:col-span-6">
                <label className="text-xs font-bold text-gray-700">Name</label>
                <input
                  value={t.name}
                  onChange={(e) => updateTier(idx, { name: e.target.value })}
                  className="mt-1 w-full rounded-xl border border-gray-200 bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-gray-900/10"
                  placeholder="VIP Experience"
                />
              </div>

              <div className="sm:col-span-3">
                <label className="text-xs font-bold text-gray-700">Price (₦)</label>
                <input
                  type="number"
                  value={t.price}
                  onChange={(e) => updateTier(idx, { price: Number(e.target.value) })}
                  className="mt-1 w-full rounded-xl border border-gray-200 bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-gray-900/10"
                  min={0}
                />
                <p className="mt-1 text-xs text-gray-500">{money(t.price)}</p>
              </div>

              <div className="sm:col-span-3">
                <label className="text-xs font-bold text-gray-700">Quantity (optional)</label>
                <input
                  type="number"
                  value={t.quantityLimit ?? ""}
                  onChange={(e) =>
                    updateTier(idx, { quantityLimit: e.target.value ? Number(e.target.value) : null })
                  }
                  className="mt-1 w-full rounded-xl border border-gray-200 bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-gray-900/10"
                  min={1}
                />
                <p className="mt-1 text-xs text-gray-500">Leave empty for unlimited</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
