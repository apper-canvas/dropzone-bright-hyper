import React from "react";
import ApperIcon from "@/components/ApperIcon";
import Button from "@/components/atoms/Button";
import { cn } from "@/utils/cn";

const Empty = ({ 
  className,
  title = "No files uploaded yet",
  message = "Drag and drop files here or click to browse and start uploading.",
  actionText = "Browse Files",
  onAction,
  ...props 
}) => {
  return (
    <div 
      className={cn(
        "flex flex-col items-center justify-center p-12 text-center",
        className
      )} 
      {...props}
    >
      <div className="flex items-center justify-center w-20 h-20 mb-6 bg-gradient-to-br from-purple-100 to-green-100 rounded-full">
        <ApperIcon name="Upload" className="w-10 h-10 text-purple-600" />
      </div>
      
      <h3 className="mb-2 text-xl font-semibold text-gray-900">{title}</h3>
      <p className="mb-8 text-gray-600 max-w-md leading-relaxed">{message}</p>
      
      {onAction && actionText && (
        <Button
          onClick={onAction}
          className="gap-2 bg-gradient-to-r from-purple-600 to-green-600 hover:from-purple-700 hover:to-green-700"
        >
          <ApperIcon name="FolderOpen" size={16} />
          {actionText}
        </Button>
      )}
    </div>
  );
};

export default Empty;