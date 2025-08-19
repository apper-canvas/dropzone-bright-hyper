import React, { useRef } from "react";
import ApperIcon from "@/components/ApperIcon";
import Button from "@/components/atoms/Button";
import { cn } from "@/utils/cn";

const FileInput = ({ 
  onFileSelect, 
  multiple = true, 
  accept = "*/*",
  className,
  children,
  ...props 
}) => {
  const fileInputRef = useRef(null);

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event) => {
    const files = Array.from(event.target.files || []);
    if (files.length > 0) {
      onFileSelect(files);
    }
    // Reset input value to allow selecting the same files again
    event.target.value = "";
  };

  return (
    <div className={cn("relative", className)} {...props}>
      <input
        ref={fileInputRef}
        type="file"
        multiple={multiple}
        accept={accept}
        onChange={handleFileChange}
        className="hidden"
        aria-label="File input"
      />
      
      {children ? (
        <div onClick={handleClick} className="cursor-pointer">
          {children}
        </div>
      ) : (
        <Button
          onClick={handleClick}
          variant="outline"
          className="gap-2"
        >
          <ApperIcon name="FolderOpen" size={16} />
          Browse Files
        </Button>
      )}
    </div>
  );
};

export default FileInput;