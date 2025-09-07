"use client";
import React, { useState } from "react";
import { FileUpload } from "@/components/ui/file-upload";

const bigFrameFileUploader = () => {
  const [files, setFiles] = useState<File[]>([]);
  const handleFileUpload = (files: File[]) => {
    setFiles(files);
    console.log(files);
  };

  return (
    <div className="w-full mx-auto min-h-64 border border-dashed bg-white dark:bg-[#1F1F1F] border-neutral-200 dark:border-[#343434] rounded-lg">
      <FileUpload onChange={handleFileUpload} />
    </div>
  );
}


export default bigFrameFileUploader;