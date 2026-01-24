// src/app/(site)/brands/select/page.tsx

import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { requireUser } from "@/lib/requireUser";
import { AppError } from "@/lib/errors";

import BrandSelectClient from "./BrandSelectClient";

export default async function BrandSelectPage({
  searchParams,
}: {
  searchParams?: { next?: string };
}) {
  const nextMode = (searchParams?.next || "create-event") as
    | "create-event"
    | "manage-events";

  // ✅ Must be logged in. If not, send to login with callback back here.
  let userId: string;

  try {
    const user = await requireUser();
    userId = user.sub;
  } catch (err) {
    // Only redirect on auth errors; otherwise bubble the error.
    if (err instanceof AppError && err.status === 401) {
      const returnTo = `/brands/select?next=${encodeURIComponent(nextMode)}`;
      redirect(`/login?next=${encodeURIComponent(returnTo)}`);
    }
    throw err;
  }

  const brands = await prisma.brand.findMany({
    where: { ownerId: userId },
    orderBy: { createdAt: "desc" },
    select: {
      id: true,
      name: true,
      logo: true,
      verified: true,
      createdAt: true,
    },
  });

  return <BrandSelectClient brands={brands} nextMode={nextMode} />;
}
