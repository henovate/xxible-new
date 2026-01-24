import jwt from "jsonwebtoken";

type JwtPayload = {
  sub: string;
  email: string;
  role: "USER" | "ADMIN";
};

export function getUserFromCookie(token?: string) {
  if (!token) return null;

  const secret = process.env.JWT_SECRET;
  if (!secret) return null;

  try {
    return jwt.verify(token, secret) as JwtPayload;
  } catch {
    return null;
  }
}
