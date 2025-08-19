import React from "react";
import ApperIcon from "@/components/ApperIcon";
import Button from "@/components/atoms/Button";
import { cn } from "@/utils/cn";

const Error = ({ 
  className, 
  title = "Something went wrong",
  message = "There was an error loading your files. Please try again.",
  onRetry,
  ...props 
}) => {
  return (
    <div 
      className={cn(
        "flex flex-col items-center justify-center p-8 text-center",
        className
      )} 
      {...props}
    >
      <div className="flex items-center justify-center w-16 h-16 mb-4 bg-red-100 rounded-full">
        <ApperIcon name="AlertCircle" className="w-8 h-8 text-red-600" />
      </div>
      
      <h3 className="mb-2 text-lg font-semibold text-gray-900">{title}</h3>
      <p className="mb-6 text-sm text-gray-600 max-w-md">{message}</p>
      
      {onRetry && (
        <Button
          onClick={onRetry}
          variant="outline"
          className="gap-2"
        >
          <ApperIcon name="RotateCcw" size={16} />
          Try Again
        </Button>
      )}
    </div>
  );
};

export default Error;