import React from "react";
import ApperIcon from "@/components/ApperIcon";
import Button from "@/components/atoms/Button";
import Badge from "@/components/atoms/Badge";
import ProgressBar from "@/components/atoms/ProgressBar";
import { formatFileSize, getFileIcon } from "@/utils/fileUtils";
import { cn } from "@/utils/cn";

const FileItem = ({ 
  file,
  onRemove,
  onRetry,
  className,
  ...props 
}) => {
  const getStatusBadge = () => {
    switch (file.status) {
      case "pending":
        return <Badge variant="default">Pending</Badge>;
      case "uploading":
        return <Badge variant="info">Uploading</Badge>;
      case "completed":
        return <Badge variant="success">Complete</Badge>;
      case "failed":
        return <Badge variant="error">Failed</Badge>;
      default:
        return <Badge variant="default">{file.status}</Badge>;
    }
  };

  const getStatusIcon = () => {
    switch (file.status) {
      case "pending":
        return <ApperIcon name="Clock" className="w-4 h-4 text-gray-500" />;
      case "uploading":
        return <ApperIcon name="Loader2" className="w-4 h-4 text-blue-500 animate-spin" />;
      case "completed":
        return (
          <div className="w-4 h-4 bg-green-500 rounded-full flex items-center justify-center">
            <ApperIcon name="Check" className="w-2.5 h-2.5 text-white" />
          </div>
        );
      case "failed":
        return <ApperIcon name="AlertCircle" className="w-4 h-4 text-red-500" />;
      default:
        return <ApperIcon name="File" className="w-4 h-4 text-gray-500" />;
    }
  };

  return (
    <div 
      className={cn(
        "bg-white rounded-xl border border-gray-100 p-4 transition-all duration-200",
        "hover:shadow-md hover:border-purple-200 hover:scale-[1.01]",
        "group relative animate-fade-in",
        className
      )}
      {...props}
    >
      <div className="flex items-start gap-3">
        {/* File Preview/Icon */}
        <div className="flex-shrink-0">
          {file.preview ? (
            <div className="w-12 h-12 rounded-lg overflow-hidden bg-gray-100">
              <img 
                src={file.preview} 
                alt={file.name}
                className="w-full h-full object-cover"
              />
            </div>
          ) : (
            <div className="w-12 h-12 bg-gradient-to-br from-purple-100 to-green-100 rounded-lg flex items-center justify-center">
              <ApperIcon 
                name={getFileIcon(file.fileType)} 
                className={cn(
                  "w-6 h-6",
                  `file-icon-${file.fileType}`
                )}
              />
            </div>
          )}
        </div>

        {/* File Info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <div className="min-w-0 flex-1">
              <h4 className="text-sm font-medium text-gray-900 truncate">
                {file.name}
              </h4>
              <p className="text-xs text-gray-500 mt-1">
                {formatFileSize(file.size)}
              </p>
            </div>
            
            <div className="flex items-center gap-2">
              {getStatusIcon()}
              {getStatusBadge()}
            </div>
          </div>

          {/* Progress Bar */}
          {file.status === "uploading" && (
            <div className="mt-3">
              <ProgressBar 
                value={file.progress} 
                showValue={true}
                size="sm"
                variant="default"
              />
            </div>
          )}

          {/* Upload Complete Info */}
          {file.status === "completed" && file.uploadedAt && (
            <p className="text-xs text-green-600 mt-2">
              Uploaded {new Date(file.uploadedAt).toLocaleTimeString()}
            </p>
          )}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-1">
          {file.status === "failed" && (
            <Button
              size="icon"
              variant="ghost"
              onClick={() => onRetry?.(file.id)}
              className="w-8 h-8 text-blue-600 hover:text-blue-700 hover:bg-blue-50"
              title="Retry upload"
            >
              <ApperIcon name="RotateCcw" size={14} />
            </Button>
          )}
          
          <Button
            size="icon"
            variant="ghost"
            onClick={() => onRemove?.(file.id)}
            className="w-8 h-8 text-red-600 hover:text-red-700 hover:bg-red-50 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
            title="Remove file"
          >
            <ApperIcon name="X" size={14} />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default FileItem;