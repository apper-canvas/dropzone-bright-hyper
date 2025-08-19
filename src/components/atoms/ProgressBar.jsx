import React, { forwardRef } from "react";
import { cn } from "@/utils/cn";

const ProgressBar = forwardRef(({ 
  className,
  value = 0,
  max = 100,
  showValue = false,
  size = "default",
  variant = "default",
  ...props 
}, ref) => {
  const percentage = Math.min(100, Math.max(0, (value / max) * 100));
  
  const sizes = {
    sm: "h-1",
    default: "h-2",
    lg: "h-3",
  };
  
  const variants = {
    default: "bg-gradient-to-r from-purple-500 to-green-500",
    success: "bg-gradient-to-r from-green-500 to-green-600",
    error: "bg-gradient-to-r from-red-500 to-red-600",
    warning: "bg-gradient-to-r from-yellow-500 to-orange-500",
  };

  return (
    <div className={cn("relative", className)} ref={ref} {...props}>
      <div className={cn(
        "w-full bg-gray-200 rounded-full overflow-hidden",
        sizes[size]
      )}>
        <div
          className={cn(
            "h-full transition-all duration-300 ease-out rounded-full",
            "progress-bar",
            variants[variant]
          )}
          style={{ width: `${percentage}%` }}
        />
      </div>
      
      {showValue && (
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-xs font-medium text-white mix-blend-difference">
            {Math.round(percentage)}%
          </span>
        </div>
      )}
    </div>
  );
});

ProgressBar.displayName = "ProgressBar";

export default ProgressBar;