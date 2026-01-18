"use client";

import React from "react";
import { UserProfile } from "../attendantCard/data";

interface MultipleAttendCardProps {
	data: UserProfile[];
}

const MultipleAttendCard = ({data}:MultipleAttendCardProps) => {

  return (
    <div className="bg-[#232323] border border-[#343434] rounded-lg py-10 flex flex-col justify-center items-center">
      {/* Profile Images */}
      <div className="flex -space-x-3">
        {data.slice(3, 6).map((item, index) => (
          <img
            key={index}
            src={item.image}
            alt={`profile-${index}`}
            className="w-14 h-14 rounded-full border-2 border-white object-cover"
          />
        ))}
      </div>

      {/* "+47 more" */}
      <p className="text-blue-500 text-lg mt-4 font-medium">+{Number(data.length - 6)} more</p>
    </div>
  );
};

export default MultipleAttendCard;
