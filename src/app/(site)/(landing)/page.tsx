import { cookies } from "next/headers";
import Landing from "@/components/landing/Landing";
import Home from "@/components/home/Home";
import { getUserFromCookie } from "@/lib/auth";

export default async function HomePage() {
  const cookieStore = await cookies(); 
  const token = cookieStore.get("xxible_session")?.value;

  const user = getUserFromCookie(token);

  return user ? <Home /> : <Landing />;
}
