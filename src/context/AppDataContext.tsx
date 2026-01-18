"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import {
  AppData,
  appDataStorageKey,
  createInitialAppData,
  createNewUser,
  Message,
  RSVP,
  User,
} from "@/lib/appData";

export type AuthResult = { ok: true } | { ok: false; error: string };

export type AppDataContextValue = {
  data: AppData;
  ready: boolean;
  currentUser: User | null;
  signUp: (input: {
    name: string;
    email: string;
    password: string;
    city: string;
  }) => AuthResult;
  login: (input: { email: string; password: string }) => AuthResult;
  logout: () => void;
  updateProfile: (profile: Partial<User> & { profile?: Partial<User["profile"]> }) => void;
  toggleRsvp: (eventId: string) => AuthResult;
  sendMessage: (input: {
    eventId: string;
    recipientId: string;
    content: string;
  }) => AuthResult;
};

const AppDataContext = createContext<AppDataContextValue | undefined>(undefined);

const getCurrentUser = (data: AppData) =>
  data.users.find((user) => user.id === data.currentUserId) ?? null;

export const AppDataProvider = ({ children }: { children: React.ReactNode }) => {
  const [data, setData] = useState<AppData>(() => createInitialAppData());
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }
    const stored = window.localStorage.getItem(appDataStorageKey);
    if (stored) {
      try {
        const parsed = JSON.parse(stored) as AppData;
        setData(parsed);
      } catch (error) {
        console.error("Failed to parse stored app data", error);
      }
    }
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready || typeof window === "undefined") {
      return;
    }
    window.localStorage.setItem(appDataStorageKey, JSON.stringify(data));
  }, [data, ready]);

  const currentUser = useMemo(() => getCurrentUser(data), [data]);

  const signUp: AppDataContextValue["signUp"] = (input) => {
    const existing = data.users.find(
      (user) => user.email.toLowerCase() === input.email.toLowerCase()
    );
    if (existing) {
      return { ok: false, error: "An account with this email already exists." };
    }
    const newUser = createNewUser(input);
    setData((prev) => ({
      ...prev,
      users: [...prev.users, newUser],
      currentUserId: newUser.id,
    }));
    return { ok: true };
  };

  const login: AppDataContextValue["login"] = (input) => {
    const user = data.users.find(
      (entry) =>
        entry.email.toLowerCase() === input.email.toLowerCase() &&
        entry.password === input.password
    );
    if (!user) {
      return { ok: false, error: "Invalid email or password." };
    }
    setData((prev) => ({ ...prev, currentUserId: user.id }));
    return { ok: true };
  };

  const logout = () => {
    setData((prev) => ({ ...prev, currentUserId: null }));
  };

  const updateProfile: AppDataContextValue["updateProfile"] = (profile) => {
    setData((prev) => {
      if (!prev.currentUserId) {
        return prev;
      }
      const users = prev.users.map((user) => {
        if (user.id !== prev.currentUserId) {
          return user;
        }
        return {
          ...user,
          ...profile,
          profile: {
            ...user.profile,
            ...profile.profile,
          },
        };
      });
      return { ...prev, users };
    });
  };

  const toggleRsvp: AppDataContextValue["toggleRsvp"] = (eventId) => {
    if (!data.currentUserId) {
      return { ok: false, error: "Please log in to RSVP." };
    }
    setData((prev) => {
      const existing = prev.rsvps.find(
        (rsvp) => rsvp.eventId === eventId && rsvp.userId === prev.currentUserId
      );
      const updatedRsvps: RSVP[] = existing
        ? prev.rsvps.filter(
            (rsvp) =>
              !(
                rsvp.eventId === eventId && rsvp.userId === prev.currentUserId
              )
          )
        : [...prev.rsvps, { eventId, userId: prev.currentUserId }];
      return { ...prev, rsvps: updatedRsvps };
    });
    return { ok: true };
  };

  const sendMessage: AppDataContextValue["sendMessage"] = (input) => {
    if (!data.currentUserId) {
      return { ok: false, error: "Please log in to message attendees." };
    }
    if (!input.content.trim()) {
      return { ok: false, error: "Message cannot be empty." };
    }
    const newMessage: Message = {
      id: `${Date.now()}-${Math.random().toString(16).slice(2)}`,
      eventId: input.eventId,
      senderId: data.currentUserId,
      recipientId: input.recipientId,
      content: input.content.trim(),
      timestamp: new Date().toISOString(),
    };
    setData((prev) => ({
      ...prev,
      messages: [...prev.messages, newMessage],
    }));
    return { ok: true };
  };

  const value: AppDataContextValue = {
    data,
    ready,
    currentUser,
    signUp,
    login,
    logout,
    updateProfile,
    toggleRsvp,
    sendMessage,
  };

  return <AppDataContext.Provider value={value}>{children}</AppDataContext.Provider>;
};

export const useAppData = () => {
  const context = useContext(AppDataContext);
  if (!context) {
    throw new Error("useAppData must be used within AppDataProvider");
  }
  return context;
};
