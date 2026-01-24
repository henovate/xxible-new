import { AppError } from "@/lib/errors";
import { prisma } from "@/lib/prisma";
import { requireUser } from "@/lib/requireUser";

export async function requireBrandOwner(brandId: string) {
  const user = await requireUser();

  const brand = await prisma.brand.findUnique({
    where: { id: brandId },
    select: { ownerId: true },
  });

  if (!brand) {
    throw new AppError("Brand not found", 404);
  }

  if (brand.ownerId !== user.sub) {
    throw new AppError("Forbidden", 403);
  }

  return { user, brandId };
}
