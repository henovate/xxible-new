"use client";

import Image from "next/image";
import { useTheme } from "../context/ThemeContext";
import ThemeToggler from "../components/ThemeToggler";
import "../app/globals.css";

export default function Home() {
  const { theme } = useTheme();

  return (
    <div
      className={`h-screen dark:bg-[#171717] bg-white text-gray-900 dark:text-gray-100 flex flex-col items-center justify-center gap-4 `}
    >
      <aside className="flex justify-center min-h-[4.6rem] border-b dark:border-b-[#545454] border-b-[#EAEAEA] items-center">
        <Image
          src={
            "https://adjunkyassets.s3.eu-central-1.amazonaws.com/Logo+(2).svg"
          }
          width={150}
          height={150}
          alt="logo"
          className={theme === "light" ? "w-24" : "w-12"}
        />
      </aside>
      <h1 className="text-3xl font-bold">Welcome to the NightLife App</h1>
      <ThemeToggler />
    </div>
  );
}
