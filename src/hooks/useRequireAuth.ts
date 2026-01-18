"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAppData } from "@/context/AppDataContext";

export const useRequireAuth = () => {
  const router = useRouter();
  const { currentUser, ready } = useAppData();

  useEffect(() => {
    if (ready && !currentUser) {
      router.replace("/login");
    }
  }, [currentUser, ready, router]);

  return { currentUser, ready };
};
