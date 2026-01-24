"use client";

import { useMemo, useRef, useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Search,
  Send,
  ArrowLeft,
  ShieldCheck,
  ImageIcon,
  Smile,
  Paperclip,
  MoreVertical,
} from "lucide-react";

import Container from "@/components/layout/Container";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

type Conversation = {
  id: string;
  name: string;
  username: string;
  verified?: boolean;
  avatar?: string | null;
  lastMessage: string;
  lastTime: string; // "2m", "Yesterday"
  unread?: number;
  context?: { eventTitle?: string; eventId?: number };
};

type ChatMessage = {
  id: string;
  fromMe: boolean;
  text: string;
  time: string;
};

function InitialAvatar({ name }: { name: string }) {
  const initial = (name?.trim()?.[0] || "U").toUpperCase();
  return (
    <div className="h-10 w-10 rounded-2xl bg-gray-900 text-white flex items-center justify-center font-extrabold">
      {initial}
    </div>
  );
}

function ConversationRow({
  c,
  isActive,
  onClick,
}: {
  c: Conversation;
  isActive: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={[
        "w-full text-left rounded-2xl border transition px-3 py-3",
        isActive
          ? "border-gray-200 bg-gray-50"
          : "border-transparent hover:border-gray-200 hover:bg-gray-50",
      ].join(" ")}
    >
      <div className="flex items-start gap-3">
        <div className="shrink-0">
          {c.avatar ? (
            <div className="relative h-10 w-10 overflow-hidden rounded-2xl border border-gray-200 bg-gray-100">
              <Image src={c.avatar} alt={c.name} fill className="object-cover" />
            </div>
          ) : (
            <InitialAvatar name={c.name} />
          )}
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex items-center justify-between gap-2">
            <div className="min-w-0 flex items-center gap-2">
              <p className="text-sm font-extrabold text-gray-900 truncate">{c.name}</p>
              {c.verified ? (
                <span className="inline-flex items-center justify-center h-5 w-5 rounded-full bg-gray-900 text-white">
                  <ShieldCheck className="h-3.5 w-3.5" />
                </span>
              ) : null}
            </div>
            <p className="text-[11px] font-semibold text-gray-500 shrink-0">{c.lastTime}</p>
          </div>

          {c.context?.eventTitle ? (
            <p className="mt-1 text-[11px] font-semibold text-gray-600 truncate">
              From: {c.context.eventTitle}
            </p>
          ) : null}

          <div className="mt-1 flex items-center justify-between gap-2">
            <p className="text-sm text-gray-600 truncate">{c.lastMessage}</p>
            {c.unread ? (
              <span className="inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-gray-900 px-1.5 text-[11px] font-extrabold text-white">
                {c.unread}
              </span>
            ) : null}
          </div>
        </div>
      </div>
    </button>
  );
}

export default function MessagesPage() {
  const conversations: Conversation[] = useMemo(
    () => [
      {
        id: "c1",
        name: "Keren Madu",
        username: "keren",
        verified: true,
        lastMessage: "That rooftop event looks mad 🔥 Are you going?",
        lastTime: "2m",
        unread: 2,
        context: { eventTitle: "Neon Friday: Rooftop Party", eventId: 101 },
        avatar: "/assets/events/event3.png",
      },
      {
        id: "c2",
        name: "Damilola",
        username: "dami",
        verified: false,
        lastMessage: "I’m down for beach rave. What time are you going?",
        lastTime: "1h",
        unread: 0,
        context: { eventTitle: "Beach Rave: Bonfire + Afrobeats", eventId: 102 },
      },
      {
        id: "c3",
        name: "Tobi",
        username: "tobi",
        verified: false,
        lastMessage: "Nice! Let’s link at the venue entrance.",
        lastTime: "Yesterday",
        unread: 0,
      },
    ],
    []
  );

  const mockThreads: Record<string, ChatMessage[]> = useMemo(
    () => ({
      c1: [
        { id: "m1", fromMe: false, text: "That rooftop event looks mad 🔥 Are you going?", time: "9:12 PM" },
        { id: "m2", fromMe: true, text: "Yeah, I’m going. You too?", time: "9:13 PM" },
        { id: "m3", fromMe: false, text: "Definitely. Let’s go together — RSVP already?", time: "9:14 PM" },
        { id: "m4", fromMe: true, text: "I’ll RSVP now. Meet at 9:30?", time: "9:15 PM" },
      ],
      c2: [
        { id: "m1", fromMe: false, text: "I’m down for beach rave. What time are you going?", time: "6:11 PM" },
        { id: "m2", fromMe: true, text: "Probably 6:30. I’m coming from VI.", time: "6:12 PM" },
      ],
      c3: [
        { id: "m1", fromMe: false, text: "Nice! Let’s link at the venue entrance.", time: "Yesterday" },
        { id: "m2", fromMe: true, text: "Sure. I’ll text when I’m close.", time: "Yesterday" },
      ],
    }),
    []
  );

  const [query, setQuery] = useState("");
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return conversations;
    return conversations.filter(
      (c) =>
        c.name.toLowerCase().includes(q) ||
        c.username.toLowerCase().includes(q) ||
        (c.context?.eventTitle || "").toLowerCase().includes(q)
    );
  }, [query, conversations]);

  const [activeId, setActiveId] = useState(filtered[0]?.id || "");
  useEffect(() => {
    if (!activeId && filtered[0]?.id) setActiveId(filtered[0].id);
  }, [activeId, filtered]);

  const active = useMemo(
    () => filtered.find((c) => c.id === activeId) || conversations[0],
    [activeId, filtered, conversations]
  );

  const [mobileView, setMobileView] = useState<"list" | "chat">("list");
  const [text, setText] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>(() =>
    active?.id ? mockThreads[active.id] || [] : []
  );

  useEffect(() => {
    if (!active?.id) return;
    setMessages(mockThreads[active.id] || []);
  }, [active?.id, mockThreads]);

  const bottomRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, activeId]);

  const sendMessage = () => {
    const t = text.trim();
    if (!t) return;
    const now = new Date();
    const time = now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

    setMessages((prev) => [
      ...prev,
      { id: `${Date.now()}`, fromMe: true, text: t, time },
    ]);
    setText("");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Container>
        <div className="pt-6 sm:pt-10 pb-14">
          {/* Page header */}
          <div className="flex items-end justify-between gap-4">
            <div>
              <p className="text-sm text-gray-500">Connect & coordinate</p>
              <h1 className="mt-1 text-2xl sm:text-3xl font-extrabold tracking-tight text-gray-900">
                Messages
              </h1>
              <p className="mt-2 text-sm text-gray-600 max-w-2xl">
                Chat with people you meet through events and RSVPs. Keep it respectful and safe.
              </p>
            </div>

            <Link href="/find">
              <Button className="hidden sm:inline-flex rounded-xl bg-gray-900 text-white hover:bg-gray-800">
                Find events
              </Button>
            </Link>
          </div>

          {/* Layout */}
          <div className="mt-5 grid grid-cols-1 lg:grid-cols-[360px_1fr] gap-4">
            {/* Left: conversations */}
            <Card
              className={[
                "rounded-2xl border border-gray-200 bg-white shadow-sm overflow-hidden",
                "lg:block",
                mobileView === "chat" ? "hidden lg:block" : "block",
              ].join(" ")}
            >
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-extrabold text-gray-900">Inbox</p>
                  <Badge className="rounded-full bg-gray-900 text-white hover:bg-gray-800">
                    {conversations.length} chats
                  </Badge>
                </div>

                {/* Search */}
                <div className="mt-3 flex items-center gap-2 rounded-2xl border border-gray-200 bg-gray-50 px-3 py-2">
                  <Search className="h-4 w-4 text-gray-400" />
                  <input
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search people or events"
                    className="w-full bg-transparent text-sm outline-none"
                  />
                </div>

                {/* Optional: Requests */}
                <div className="mt-3 rounded-2xl border border-gray-200 bg-white p-3">
                  <div className="flex items-center justify-between">
                    <p className="text-xs font-extrabold text-gray-900">Requests</p>
                    <p className="text-xs font-semibold text-gray-500">0</p>
                  </div>
                  <p className="mt-1 text-xs text-gray-600">
                    Requests appear when someone messages you from an event.
                  </p>
                </div>

                {/* List */}
                <div className="mt-4 space-y-2">
                  {filtered.length ? (
                    filtered.map((c) => (
                      <ConversationRow
                        key={c.id}
                        c={c}
                        isActive={c.id === activeId}
                        onClick={() => {
                          setActiveId(c.id);
                          setMobileView("chat");
                        }}
                      />
                    ))
                  ) : (
                    <div className="rounded-2xl border border-gray-200 bg-gray-50 px-4 py-6 text-center">
                      <p className="text-sm font-extrabold text-gray-900">No results</p>
                      <p className="mt-1 text-sm text-gray-600">Try another search.</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Right: chat */}
            <Card
              className={[
                "rounded-2xl border border-gray-200 bg-white shadow-sm overflow-hidden",
                mobileView === "list" ? "hidden lg:block" : "block",
              ].join(" ")}
            >
              {/* Chat header */}
              <div className="border-b border-gray-200 bg-white px-4 py-3">
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3 min-w-0">
                    {/* Mobile back */}
                    <button
                      type="button"
                      onClick={() => setMobileView("list")}
                      className="lg:hidden p-2 -ml-2 text-gray-700"
                      aria-label="Back"
                    >
                      <ArrowLeft className="h-5 w-5" />
                    </button>

                    {active?.avatar ? (
                      <div className="relative h-10 w-10 overflow-hidden rounded-2xl border border-gray-200 bg-gray-100">
                        <Image src={active.avatar} alt={active.name} fill className="object-cover" />
                      </div>
                    ) : (
                      <InitialAvatar name={active?.name || "User"} />
                    )}

                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <p className="text-sm font-extrabold text-gray-900 truncate">
                          {active?.name || "Conversation"}
                        </p>
                        {active?.verified ? (
                          <span className="inline-flex items-center justify-center h-5 w-5 rounded-full bg-gray-900 text-white">
                            <ShieldCheck className="h-3.5 w-3.5" />
                          </span>
                        ) : null}
                      </div>

                      {active?.context?.eventTitle ? (
                        <Link
                          href={active.context.eventId ? `/event/${active.context.eventId}` : "#"}
                          className="text-xs font-semibold text-gray-600 hover:text-gray-900 transition truncate block"
                        >
                          {active.context.eventTitle}
                        </Link>
                      ) : (
                        <p className="text-xs text-gray-600 truncate">@{active?.username}</p>
                      )}
                    </div>
                  </div>

                  <button
                    type="button"
                    className="p-2 text-gray-700 hover:bg-gray-50 rounded-xl transition"
                    aria-label="More"
                  >
                    <MoreVertical className="h-5 w-5" />
                  </button>
                </div>
              </div>

              {/* Thread */}
              <CardContent className="p-0">
                <div className="h-[62vh] lg:h-[70vh] overflow-y-auto px-4 py-4 bg-white">
                  <div className="space-y-3">
                    {messages.map((m) => (
                      <div
                        key={m.id}
                        className={[
                          "flex",
                          m.fromMe ? "justify-end" : "justify-start",
                        ].join(" ")}
                      >
                        <div
                          className={[
                            "max-w-[86%] sm:max-w-[70%] rounded-2xl px-3 py-2 border",
                            m.fromMe
                              ? "bg-gray-900 text-white border-gray-900"
                              : "bg-gray-50 text-gray-900 border-gray-200",
                          ].join(" ")}
                        >
                          <p className="text-sm leading-relaxed whitespace-pre-wrap">{m.text}</p>
                          <p
                            className={[
                              "mt-1 text-[11px] font-semibold",
                              m.fromMe ? "text-white/70" : "text-gray-500",
                            ].join(" ")}
                          >
                            {m.time}
                          </p>
                        </div>
                      </div>
                    ))}
                    <div ref={bottomRef} />
                  </div>
                </div>

                {/* Composer */}
                <div className="border-t border-gray-200 bg-white px-3 py-3">
                  <div className="flex items-end gap-2">
                    <div className="hidden sm:flex items-center gap-1">
                      <button
                        type="button"
                        className="p-2 rounded-xl hover:bg-gray-50 text-gray-700 transition"
                        aria-label="Attach"
                      >
                        <Paperclip className="h-5 w-5" />
                      </button>
                      <button
                        type="button"
                        className="p-2 rounded-xl hover:bg-gray-50 text-gray-700 transition"
                        aria-label="Photos"
                      >
                        <ImageIcon className="h-5 w-5" />
                      </button>
                      <button
                        type="button"
                        className="p-2 rounded-xl hover:bg-gray-50 text-gray-700 transition"
                        aria-label="Emoji"
                      >
                        <Smile className="h-5 w-5" />
                      </button>
                    </div>

                    <div className="flex-1">
                      <textarea
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        rows={1}
                        placeholder="Write a message…"
                        className="w-full resize-none rounded-2xl border border-gray-200 bg-gray-50 px-3 py-2 text-sm outline-none focus:border-gray-300"
                        onKeyDown={(e) => {
                          if (e.key === "Enter" && !e.shiftKey) {
                            e.preventDefault();
                            sendMessage();
                          }
                        }}
                      />
                      <p className="mt-1 text-[11px] text-gray-500">
                        Press Enter to send • Shift+Enter for new line
                      </p>
                    </div>

                    <Button
                      onClick={sendMessage}
                      className="rounded-2xl bg-gray-900 text-white hover:bg-gray-800 h-11 px-4"
                      type="button"
                      disabled={!text.trim()}
                    >
                      <Send className="h-4 w-4 mr-2" />
                      Send
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </Container>
    </div>
  );
}
