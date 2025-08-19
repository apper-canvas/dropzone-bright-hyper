import React from "react";
import { cn } from "@/utils/cn";

const Loading = ({ className, ...props }) => {
  return (
    <div className={cn("flex flex-col items-center justify-center p-8", className)} {...props}>
      <div className="relative">
        <div className="w-12 h-12 border-4 border-purple-100 rounded-full"></div>
        <div className="absolute top-0 left-0 w-12 h-12 border-4 border-transparent border-t-purple-600 rounded-full animate-spin"></div>
      </div>
      <p className="mt-4 text-sm text-gray-600 animate-pulse">Loading files...</p>
    </div>
  );
};

export default Loading;