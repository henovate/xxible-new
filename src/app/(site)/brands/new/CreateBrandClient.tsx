"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import Container from "@/components/layout/Container";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

type CreateBrandPayload = {
  name: string;
  description?: string;
  logo?: string; // final hosted URL (cloudinary)
};

async function uploadImage(file: File): Promise<string> {
  const fd = new FormData();
  fd.append("file", file);

  const res = await fetch("/api/uploads", { method: "POST", body: fd });
  const data = await res.json().catch(() => null);

  if (!res.ok) {
    throw new Error(data?.error || "Upload failed");
  }

  const url = data?.url as string | undefined;
  if (!url) throw new Error("Upload succeeded but no URL returned");
  return url;
}

export default function CreateBrandClient() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  // Logo: either paste a URL OR upload a file
  const [logoUrl, setLogoUrl] = useState("");
  const [logoFile, setLogoFile] = useState<File | null>(null);

  const [isUploading, setIsUploading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    const trimmedName = name.trim();
    if (!trimmedName) {
      setError("Brand name is required.");
      return;
    }

    try {
      setIsSubmitting(true);

      // 1) Resolve logo (upload file if provided)
      let finalLogo = logoUrl.trim() || undefined;

      if (logoFile) {
        setIsUploading(true);
        finalLogo = await uploadImage(logoFile);
        setLogoUrl(finalLogo); // keep for preview + clarity
        setIsUploading(false);
      }

      // 2) Create brand
      const payload: CreateBrandPayload = {
        name: trimmedName,
        description: description.trim() || undefined,
        logo: finalLogo,
      };

      const res = await fetch("/api/brands", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json().catch(() => null);

      if (!res.ok) {
        setError(data?.error || "Could not create brand.");
        return;
      }

      const brandId = data?.brand?.id as string | undefined;
      if (!brandId) {
        setError("Brand created, but missing brandId in response.");
        return;
      }

      // 3) Continue to create first event
      router.push(`/brands/${brandId}/events/new`);
      router.refresh();
    } catch (err: any) {
      setError(err?.message || "Something went wrong.");
    } finally {
      setIsUploading(false);
      setIsSubmitting(false);
    }
  }

  const disabled = isSubmitting || isUploading;

  return (
    <Container>
      <div className="mx-auto w-full max-w-xl py-10">
        <div className="mb-6">
          <h1 className="text-2xl font-semibold">Create your brand</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Your brand is what people see as the event host. You’ll create your first event next.
          </p>
        </div>

        <Card className="rounded-2xl">
          <CardContent className="p-6">
            <form onSubmit={onSubmit} className="space-y-5">
              <div className="space-y-2">
                <label className="text-sm font-medium">Brand name</label>
                <Input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. XXible Nights"
                  autoComplete="organization"
                  disabled={disabled}
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Description (optional)</label>
                <Textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="What kind of events do you host?"
                  rows={4}
                  disabled={disabled}
                />
              </div>

              {/* Logo upload */}
              <div className="space-y-2">
                <label className="text-sm font-medium">Brand logo (optional)</label>

                <div className="space-y-3">
                  <Input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setLogoFile(e.target.files?.[0] || null)}
                    disabled={disabled}
                  />

                  <div className="text-xs text-muted-foreground">
                    Or paste a logo URL (optional):
                  </div>

                  <Input
                    value={logoUrl}
                    onChange={(e) => setLogoUrl(e.target.value)}
                    placeholder="https://..."
                    inputMode="url"
                    disabled={disabled}
                  />

                  {logoUrl ? (
                    <div className="rounded-xl border bg-white p-3">
                      <div className="text-xs text-muted-foreground mb-2">Preview</div>
                      {/* Use <img> to avoid next/image remote config issues */}
                      <img
                        src={logoUrl}
                        alt="Logo preview"
                        className="h-16 w-16 rounded-xl object-cover"
                      />
                      <div className="mt-2 break-all text-xs text-muted-foreground">
                        {logoUrl}
                      </div>
                    </div>
                  ) : null}

                  {isUploading ? (
                    <div className="text-xs text-muted-foreground">Uploading logo…</div>
                  ) : null}
                </div>
              </div>

              {error ? (
                <div className="rounded-lg border border-destructive/30 bg-destructive/10 p-3 text-sm">
                  {error}
                </div>
              ) : null}

              <div className="flex items-center justify-between gap-3">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => router.back()}
                  disabled={disabled}
                >
                  Back
                </Button>

                <Button type="submit" disabled={disabled}>
                  {isSubmitting ? "Creating…" : "Create brand & continue"}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>

        <p className="mt-6 text-xs text-muted-foreground">
          Tip: You can keep this minimal. Your first event is what most people will notice.
        </p>
      </div>
    </Container>
  );
}
