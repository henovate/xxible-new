// src/lib/requireUser.ts
import { cookies } from "next/headers";
import { AppError } from "@/lib/errors";
import { getUserFromCookie } from "@/lib/auth";

export type AuthedUser = {
  sub: string;
  email: string;
  role: "USER" | "ADMIN";
};

export async function requireUser(): Promise<AuthedUser> {
  const cookieStore = await cookies();
  const token = cookieStore.get("xxible_session")?.value;

  const user = getUserFromCookie(token);

  if (!user) {
    throw new AppError("Unauthorized", 401);
  }

  return user as AuthedUser;
}
