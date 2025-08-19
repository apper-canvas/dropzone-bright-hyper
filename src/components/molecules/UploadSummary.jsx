import React from "react";
import ApperIcon from "@/components/ApperIcon";
import Button from "@/components/atoms/Button";
import ProgressBar from "@/components/atoms/ProgressBar";
import { formatFileSize } from "@/utils/fileUtils";
import { cn } from "@/utils/cn";

const UploadSummary = ({ 
  uploadSession,
  onClearAll,
  className,
  ...props 
}) => {
  const { totalFiles, completedFiles, totalSize, uploadedSize } = uploadSession;
  
  if (totalFiles === 0) {
    return null;
  }

  const overallProgress = totalFiles > 0 ? (completedFiles / totalFiles) * 100 : 0;
  const sizeProgress = totalSize > 0 ? (uploadedSize / totalSize) * 100 : 0;

  return (
    <div 
      className={cn(
        "bg-white rounded-xl border border-gray-100 p-6 shadow-sm",
        className
      )}
      {...props}
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">Upload Summary</h3>
        <Button
          variant="ghost"
          size="sm"
          onClick={onClearAll}
          className="gap-2 text-red-600 hover:text-red-700 hover:bg-red-50"
        >
          <ApperIcon name="Trash2" size={14} />
          Clear All
        </Button>
      </div>

      <div className="space-y-4">
        {/* Files Progress */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-700">
              Files Progress
            </span>
            <span className="text-sm text-gray-600">
              {completedFiles} of {totalFiles} files
            </span>
          </div>
          <ProgressBar 
            value={overallProgress} 
            showValue={true}
            variant={overallProgress === 100 ? "success" : "default"}
          />
        </div>

        {/* Size Progress */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-700">
              Upload Progress
            </span>
            <span className="text-sm text-gray-600">
              {formatFileSize(uploadedSize)} of {formatFileSize(totalSize)}
            </span>
          </div>
          <ProgressBar 
            value={sizeProgress} 
            showValue={true}
            variant={sizeProgress === 100 ? "success" : "default"}
          />
        </div>

        {/* Summary Stats */}
        <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-100">
          <div className="text-center">
            <div className="flex items-center justify-center w-10 h-10 mx-auto mb-2 bg-green-100 rounded-full">
              <ApperIcon name="CheckCircle" className="w-5 h-5 text-green-600" />
            </div>
            <p className="text-2xl font-bold text-green-600">{completedFiles}</p>
            <p className="text-xs text-gray-600">Completed</p>
          </div>
          
          <div className="text-center">
            <div className="flex items-center justify-center w-10 h-10 mx-auto mb-2 bg-purple-100 rounded-full">
              <ApperIcon name="Files" className="w-5 h-5 text-purple-600" />
            </div>
            <p className="text-2xl font-bold text-purple-600">{totalFiles}</p>
            <p className="text-xs text-gray-600">Total Files</p>
          </div>
        </div>

        {overallProgress === 100 && (
          <div className="flex items-center gap-2 p-3 bg-green-50 border border-green-200 rounded-lg">
            <ApperIcon name="CheckCircle2" className="w-5 h-5 text-green-600" />
            <span className="text-sm font-medium text-green-800">
              All files uploaded successfully!
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default UploadSummary;