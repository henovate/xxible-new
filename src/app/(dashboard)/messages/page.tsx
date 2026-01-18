"use client";

import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useAppData } from "@/context/AppDataContext";
import AttendantCard from "@/components/utility/cards/attendantCard/attendantCard";

const page = () => {
  const searchParams = useSearchParams();
  const { data, currentUser, sendMessage } = useAppData();
  const defaultEventId = searchParams.get("eventId") ?? data.events[0]?.id ?? "";
  const [selectedEventId, setSelectedEventId] = useState(defaultEventId);
  const [selectedRecipientId, setSelectedRecipientId] = useState<string | null>(null);
  const [message, setMessage] = useState("");
  const [notice, setNotice] = useState<string | null>(null);

  const event = data.events.find((item) => item.id === selectedEventId) ?? data.events[0];

  const attendees = useMemo(() => {
    if (!event) {
      return [];
    }
    const attendeeIds = data.rsvps.filter((rsvp) => rsvp.eventId === event.id).map((rsvp) => rsvp.userId);
    return data.users
      .filter((user) => attendeeIds.includes(user.id))
      .map((user) => ({
        id: Number(user.id.replace(/\D/g, "").slice(0, 6)) || 0,
        username: user.name,
        image: user.profile.photoUrl || "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg",
        userId: user.id,
      }));
  }, [data.rsvps, data.users, event]);

  const messages = useMemo(() => {
    if (!currentUser || !event) {
      return [];
    }
    return data.messages.filter(
      (msg) =>
        msg.eventId === event.id && (msg.senderId === currentUser.id || msg.recipientId === currentUser.id)
    );
  }, [currentUser, data.messages, event]);

  const handleSend = () => {
    if (!event || !selectedRecipientId) {
      setNotice("Select an attendee to message.");
      return;
    }
    const result = sendMessage({
      eventId: event.id,
      recipientId: selectedRecipientId,
      content: message,
    });
    if (!result.ok) {
      setNotice(result.error);
      return;
    }
    setMessage("");
    setNotice(null);
  };

  if (!currentUser) {
    return (
      <div className="grid lg:grid-cols-[75%_1fr]">
        <div className="text-gray-400 h-screen flex items-center justify-center">
          Log in to view and send messages.
        </div>
      </div>
    );
  }

  return (
    <div className="grid lg:grid-cols-[70%_1fr] gap-6 p-6">
      <div className="space-y-6">
        <div className="rounded-xl border border-[#343434] bg-[#202222] p-6">
          <div className="flex flex-col gap-3">
            <label className="text-sm text-[#A0A0A0]">Select event</label>
            <select
              value={selectedEventId}
              onChange={(event) => {
                setSelectedEventId(event.target.value);
                setSelectedRecipientId(null);
              }}
              className="rounded-lg border border-[#343434] bg-[#1f1f1f] px-4 py-2 text-white"
            >
              {data.events.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.title}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="rounded-xl border border-[#343434] bg-[#202222] p-6">
          <h2 className="text-lg font-[600] text-white">Messages for {event?.title}</h2>
          <div className="mt-4 space-y-3">
            {messages.length ? (
              messages.map((msg) => {
                const sender = data.users.find((user) => user.id === msg.senderId);
                const isSender = msg.senderId === currentUser.id;
                return (
                  <div
                    key={msg.id}
                    className={`rounded-lg px-4 py-3 text-sm ${
                      isSender ? "bg-[#F800E912] text-white" : "bg-[#1f1f1f] text-[#E9E9E9]"
                    }`}
                  >
                    <p className="text-xs text-[#A0A0A0]">
                      {isSender ? "You" : sender?.name} · {new Date(msg.timestamp).toLocaleString()}
                    </p>
                    <p className="mt-1">{msg.content}</p>
                  </div>
                );
              })
            ) : (
              <p className="text-sm text-[#A0A0A0]">No messages yet.</p>
            )}
          </div>
        </div>

        <div className="rounded-xl border border-[#343434] bg-[#202222] p-6">
          <h2 className="text-lg font-[600] text-white">Send a message</h2>
          {notice ? (
            <div className="mt-3 rounded-lg border border-red-200 bg-red-50 px-4 py-2 text-xs text-red-600">
              {notice}
            </div>
          ) : null}
          <div className="mt-4 space-y-3">
            <select
              value={selectedRecipientId ?? ""}
              onChange={(event) => setSelectedRecipientId(event.target.value)}
              className="rounded-lg border border-[#343434] bg-[#1f1f1f] px-4 py-2 text-white"
            >
              <option value="" disabled>
                Choose attendee
              </option>
              {attendees
                .filter((attendee) => attendee.userId !== currentUser.id)
                .map((attendee) => (
                  <option key={attendee.userId} value={attendee.userId}>
                    {attendee.username}
                  </option>
                ))}
            </select>
            <textarea
              value={message}
              onChange={(event) => setMessage(event.target.value)}
              rows={4}
              placeholder="Write your message..."
              className="w-full rounded-lg border border-[#343434] bg-[#1f1f1f] px-4 py-3 text-white"
            />
            <button
              type="button"
              onClick={handleSend}
              className="rounded-lg bg-[#F800E9] px-4 py-2 text-sm font-[600] text-white"
            >
              Send message
            </button>
          </div>
        </div>
      </div>

      <div className="rounded-xl border border-[#343434] bg-[#202222] p-6">
        <h2 className="text-lg font-[600] text-white">Attendees</h2>
        <p className="text-xs text-[#A0A0A0]">Tap a profile and then message them.</p>
        <div className="mt-6 grid grid-cols-1 gap-4">
          {attendees.map((attendee) => (
            <AttendantCard
              key={attendee.userId}
              profile={{ id: attendee.id, username: attendee.username, image: attendee.image }}
              actionLabel={attendee.userId === currentUser.id ? "You" : "Message"}
              onAction={() => {
                if (attendee.userId === currentUser.id) {
                  return;
                }
                setSelectedRecipientId(attendee.userId);
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default page;
