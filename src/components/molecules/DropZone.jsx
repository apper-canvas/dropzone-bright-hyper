import React from "react";
import ApperIcon from "@/components/ApperIcon";
import FileInput from "@/components/molecules/FileInput";
import { cn } from "@/utils/cn";

const DropZone = ({
  onFileSelect,
  onDragOver,
  onDragLeave,
  onDrop,
  isDragOver,
  className,
  ...props
}) => {
  return (
    <div
      className={cn(
        "relative border-2 border-dashed border-gray-300 rounded-xl p-8 transition-all duration-200",
        "hover:border-purple-400 hover:bg-purple-50/30",
        isDragOver && "drag-over border-purple-500 bg-purple-50/50 shadow-lg",
        className
      )}
      onDragOver={onDragOver}
      onDragLeave={onDragLeave}
      onDrop={onDrop}
      {...props}
    >
      <div className="flex flex-col items-center justify-center text-center">
        <div className={cn(
          "flex items-center justify-center w-16 h-16 mb-4 rounded-full transition-all duration-200",
          "bg-gradient-to-br from-purple-100 to-green-100",
          isDragOver && "scale-110 from-purple-200 to-green-200"
        )}>
          <ApperIcon 
            name="Upload" 
            className={cn(
              "w-8 h-8 transition-all duration-200",
              isDragOver ? "text-purple-600 scale-110" : "text-purple-500"
            )} 
          />
        </div>
        
        <h3 className="mb-2 text-lg font-semibold text-gray-900">
          {isDragOver ? "Drop files here" : "Drag & drop files"}
        </h3>
        
        <p className="mb-4 text-sm text-gray-600">
          or click to browse and select files
        </p>
        
        <FileInput onFileSelect={onFileSelect}>
          <div className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-purple-700 bg-white border-2 border-purple-200 rounded-lg hover:bg-purple-50 hover:border-purple-300 transition-all duration-200 hover:scale-105">
            <ApperIcon name="FolderOpen" size={16} />
            Browse Files
          </div>
        </FileInput>
        
        <p className="mt-4 text-xs text-gray-500">
          Supports all file types up to 100MB
        </p>
      </div>
    </div>
  );
};

export default DropZone;