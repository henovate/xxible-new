// src/app/brands/new/page.tsx
import { requireUser } from "@/lib/requireUser";
import CreateBrandClient from "./CreateBrandClient";

export default async function CreateBrandPage() {
  // ✅ Server guard: must be logged in
  await requireUser();

  return <CreateBrandClient />;
}
