"use client";

import React from "react";
import { UserProfile } from "./data";

interface AttendantCardProps {
  profile: UserProfile;
  actionLabel?: string;
  onAction?: () => void;
}

const AttendantCard = ({ profile, actionLabel, onAction }: AttendantCardProps) => {
  return (
    <div className="bg-[#232323] border border-[#343434] rounded-lg py-10 flex flex-col items-center justify-center">
      <div
        style={{ backgroundImage: `url(${profile.image})` }}
        className="rounded-full h-[5.5rem] w-[5.5rem] bg-black bg-cover bg-no-repeat bg-center"
      ></div>
      <p className="text-base font-[600] text-[#f5f5f5] mt-3">{profile.username}</p>
      {actionLabel ? (
        <button
          type="button"
          onClick={onAction}
          className="mt-4 rounded-full border border-[#F800E9] px-4 py-1.5 text-xs font-[500] text-[#F5F5F5] hover:bg-[#F800E9] transition"
        >
          {actionLabel}
        </button>
      ) : null}
    </div>
  );
};

export default AttendantCard;
