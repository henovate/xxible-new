"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Menu, X, Search, ChevronDown, LogOut, LayoutDashboard, Mail, Heart, Plus } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import Logo2 from "../../../../../public/assets/icons/logo2.png";
import "../../../../../public/styles/main.css";

import SearchBar from "@/components/utility/searchBar/searchBar";
import SelectComponent from "@/components/selectComp/selectComp";
import Container from "@/components/layout/Container";


type MeUser = {
  sub?: string; // userId in JWT
  email?: string;
  role?: "USER" | "ADMIN";
    image?: string | null; // profile photo url (optional)

} | null;

const Header = () => {
  const router = useRouter();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);

  // Desktop scroll behavior
  const [showDesktopBar, setShowDesktopBar] = useState(true);
  const lastScrollY = useRef(0);

  // Auth state
  const [me, setMe] = useState<MeUser>(null);
  const [meLoading, setMeLoading] = useState(true);

  // Desktop dropdown
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const userMenuRef = useRef<HTMLDivElement | null>(null);

  const pathname = usePathname();
  const isHome = pathname === "/";

  // Fetch current user
  useEffect(() => {
    let mounted = true;

    async function loadMe() {
      try {
        const res = await fetch("/api/auth/me", { method: "GET" });
        const data = await res.json();
        if (!mounted) return;

        setMe(data?.user ?? null);
      } catch {
        if (!mounted) return;
        setMe(null);
      } finally {
        if (!mounted) return;
        setMeLoading(false);
      }
    }

    loadMe();
    return () => {
      mounted = false;
    };
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const onDocClick = (e: MouseEvent) => {
      if (!userMenuRef.current) return;
      if (!userMenuRef.current.contains(e.target as Node)) setIsUserMenuOpen(false);
    };
    document.addEventListener("mousedown", onDocClick);
    return () => document.removeEventListener("mousedown", onDocClick);
  }, []);

  // Desktop scroll behavior: show on scroll up, hide on scroll down
  useEffect(() => {
    const isDesktop = () =>
      typeof window !== "undefined" &&
      window.matchMedia("(min-width: 1024px)").matches;

    const onScroll = () => {
      if (!isDesktop()) return;

      const currentY = window.scrollY;
      setHasScrolled(currentY > 10);

      if (currentY <= 10) {
        setShowDesktopBar(true);
        lastScrollY.current = currentY;
        return;
      }

      if (currentY < lastScrollY.current) setShowDesktopBar(true);
      else setShowDesktopBar(false);

      lastScrollY.current = currentY;
    };

    lastScrollY.current = typeof window !== "undefined" ? window.scrollY : 0;

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleLogout = async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST" });
    } finally {
      setMe(null);
      setIsUserMenuOpen(false);
      setIsMobileMenuOpen(false);
      router.push("/");
      router.refresh();
    }
  };

  const initial = (me?.email?.[0] || "U").toUpperCase();

  const DesktopActions = () => {
  if (meLoading) {
    return <div className="h-9 w-[220px] rounded-md bg-gray-100 animate-pulse" />;
  }

  // Logged out
  if (!me?.email) {
    return (
      <div className="flex items-center gap-3">
        <Link
          href="/login"
          className="text-sm font-medium text-gray-700 hover:text-gray-900 transition"
        >
          Log in
        </Link>

        <Link
          href="/sign-up"
          className="inline-flex items-center justify-center rounded-md bg-gray-900 px-4 py-2 text-sm font-semibold text-white hover:bg-gray-800 transition"
        >
          Sign up
        </Link>
      </div>
    );
  }

  const initial = (me.email?.[0] || "U").toUpperCase();

  return (
    <div className="flex items-center gap-3">
      {/* Message + Love icons (left of avatar) */}
      <button
        type="button"
        className="p-2 rounded-full text-gray-700 hover:bg-gray-100 transition"
        aria-label="Messages"
        onClick={() => router.push("/messages")}
      >
        <Mail className="w-5 h-5" />
      </button>

      <button
        type="button"
        className="p-2 rounded-full text-gray-700 hover:bg-gray-100 transition"
        aria-label="Favorites"
        onClick={() => router.push("/favorites")}
      >
        <Heart className="w-5 h-5" />
      </button>

      {/* Avatar + dropdown */}
      <div className="relative" ref={userMenuRef}>
        <button
          type="button"
          onClick={() => setIsUserMenuOpen((s) => !s)}
          className="inline-flex items-center justify-center rounded-full focus:outline-none"
          aria-label="Open user menu"
        >
          {me.image ? (
            <Image
              src={me.image}
              alt="Profile"
              width={36}
              height={36}
              className="rounded-full object-cover border border-gray-200"
            />
          ) : (
            <div className="w-9 h-9 rounded-full bg-gray-900 text-white flex items-center justify-center text-sm font-bold">
              {initial}
            </div>
          )}
        </button>

        {isUserMenuOpen && (
          <div className="absolute right-0 mt-2 w-64 rounded-md border border-gray-200 bg-white shadow-lg overflow-hidden">
            {/* little caret */}
            <div className="absolute -top-2 right-3 w-4 h-4 bg-white border-l border-t border-gray-200 rotate-45" />

            <div className="pt-2" />

            <Link
              href="/profile"
              onClick={() => setIsUserMenuOpen(false)}
              className="block px-4 py-2 text-sm text-gray-800 hover:bg-gray-50"
            >
              Profile
            </Link>

            <Link
              href="/add-event"
              onClick={() => setIsUserMenuOpen(false)}
              className="flex items-center gap-2 px-4 py-2 text-sm text-gray-800 hover:bg-gray-50"
            >
              <Plus className="w-4 h-4 text-gray-500" />
              Add Event
            </Link>

            <div className="my-2 border-t border-gray-200" />

            <Link
              href="/account-settings"
              onClick={() => setIsUserMenuOpen(false)}
              className="block px-4 py-2 text-sm text-gray-800 hover:bg-gray-50"
            >
              Account settings
            </Link>

            <Link
              href="/help"
              onClick={() => setIsUserMenuOpen(false)}
              className="block px-4 py-2 text-sm text-gray-800 hover:bg-gray-50"
            >
              Help & support
            </Link>

            <div className="my-2 border-t border-gray-200" />

            <button
              type="button"
              onClick={handleLogout}
              className="w-full text-left px-4 py-2 text-sm text-gray-800 hover:bg-gray-50"
            >
              Sign out
            </button>

            <div className="pb-2" />
          </div>
        )}
      </div>
    </div>
  );
};

  const MobileActions = () => {
    if (meLoading) {
      return <div className="h-9 w-full rounded-md bg-gray-100 animate-pulse" />;
    }

    if (!me?.email) {
      return (
        <>
          <Link
            href="/login"
            onClick={() => setIsMobileMenuOpen(false)}
            className="block text-sm font-medium text-gray-700 hover:text-gray-900"
          >
            Log in
          </Link>

          <Link
            href="/sign-up"
            onClick={() => setIsMobileMenuOpen(false)}
            className="block w-full text-center rounded-md bg-gray-900 px-4 py-2 text-sm font-semibold text-white hover:bg-gray-800 transition"
          >
            Sign up
          </Link>
        </>
      );
    }

    return (
      <>
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center w-9 h-9 rounded-full bg-gray-900 text-white text-sm font-bold">
            {initial}
          </div>
          <div className="min-w-0">
            <p className="text-sm font-semibold text-gray-900 truncate">{me.email}</p>
            <p className="text-xs text-gray-500">{me.role === "ADMIN" ? "Admin" : "Member"}</p>
          </div>
        </div>

        <Link
          href="/home"
          onClick={() => setIsMobileMenuOpen(false)}
          className="flex items-center gap-2 text-sm font-medium text-gray-700 hover:text-gray-900"
        >
          <LayoutDashboard className="w-4 h-4" />
          Dashboard
        </Link>

        <button
          type="button"
          onClick={handleLogout}
          className="w-full flex items-center justify-center gap-2 rounded-md border border-red-200 bg-red-50 px-4 py-2 text-sm font-semibold text-red-700 hover:bg-red-100 transition"
        >
          <LogOut className="w-4 h-4" />
          Log out
        </button>
      </>
    );
  };

  return (
    <>
      {/* Desktop Header: fixed + hides on scroll down, shows on scroll up */}
      <header
        className={[
          "hidden lg:block fixed top-0 left-0 right-0 z-50",
          "bg-white border-b border-gray-200",
          "transition-transform duration-200 ease-out",
          hasScrolled ? "shadow-sm" : "shadow-none",
          showDesktopBar ? "translate-y-0" : "-translate-y-full",
        ].join(" ")}
      >
        <Container>
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center">
              <div className="h-[30px] w-[90px]">
                <Image
                  src={Logo2}
                  alt="XXIBLE logo"
                  className="w-full h-full object-contain"
                />
              </div>
            </Link>

            {/* Search */}
            {!isHome && (
              <div className="flex-1 mx-10 max-w-xl">
                <SearchBar searchInput="w-full" />
              </div>
            )}

            {/* Auth-aware actions */}
            <DesktopActions />
          </div>
        </Container>
      </header>

      {/* Mobile Header: fixed and ALWAYS visible */}
      <header className="lg:hidden fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-200 shadow-sm">
        <Container>
          <div className="flex items-center justify-between h-14">
            <Link href="/" className="flex items-center">
              <div className="h-[28px] w-[80px]">
                <Image
                  src={Logo2}
                  alt="XXIBLE logo"
                  className="w-full h-full object-contain"
                />
              </div>
            </Link>

            <button
              onClick={() => setIsMobileMenuOpen((s) => !s)}
              className="p-2 text-gray-700"
              aria-label="Open menu"
            >
              {isMobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </Container>

        {isMobileMenuOpen && (
          <div className="border-t border-gray-200 bg-white">
            <Container className="py-4 space-y-4">
              {!isHome && (
                <div className="space-y-3">
                  <div className="flex items-center border border-gray-300 rounded-md px-3 py-2">
                    <Search className="w-4 h-4 text-gray-400 mr-2" />
                    <input
                      type="text"
                      placeholder="Search events"
                      className="flex-1 text-sm outline-none"
                    />
                  </div>

                  <SelectComponent
                    arrayItemType="array"
                    label="Location"
                    placeholder="Lagos, NG"
                    className="w-full"
                  />
                </div>
              )}

              <div className="pt-4 border-t border-gray-200 space-y-3">
                <MobileActions />
              </div>
            </Container>
          </div>
        )}
      </header>

      {/* Spacer so content doesn't sit behind fixed header */}
      <div className="h-14 lg:h-16" />
    </>
  );
};

export default Header;
