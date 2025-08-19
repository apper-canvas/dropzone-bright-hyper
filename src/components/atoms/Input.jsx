import React, { forwardRef } from "react";
import { cn } from "@/utils/cn";

const Input = forwardRef(({ 
  className, 
  type = "text",
  error,
  ...props 
}, ref) => {
  return (
    <input
      type={type}
      className={cn(
        "flex w-full px-3 py-2 text-sm bg-white border border-gray-200 rounded-lg",
        "focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent",
        "placeholder:text-gray-400 disabled:opacity-50 disabled:cursor-not-allowed",
        "transition-all duration-200",
        error && "border-red-300 focus:ring-red-500",
        className
      )}
      ref={ref}
      {...props}
    />
  );
});

Input.displayName = "Input";

export default Input;