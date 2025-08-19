import React from "react";
import DropZone from "@/components/molecules/DropZone";
import FileItem from "@/components/molecules/FileItem";
import UploadSummary from "@/components/molecules/UploadSummary";
import Empty from "@/components/ui/Empty";
import { useFileUpload } from "@/hooks/useFileUpload";
import { cn } from "@/utils/cn";

const FileUploader = ({ className, ...props }) => {
  const {
    files,
    uploadSession,
    isDragOver,
    addFiles,
    removeFile,
    retryUpload,
    clearAll,
    handleDragOver,
    handleDragLeave,
    handleDrop,
  } = useFileUpload();

  const handleFileSelect = (selectedFiles) => {
    addFiles(selectedFiles);
  };

  return (
    <div className={cn("w-full max-w-4xl mx-auto space-y-6", className)} {...props}>
      {/* Drop Zone */}
      <DropZone
        onFileSelect={handleFileSelect}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        isDragOver={isDragOver}
      />

      {/* File List */}
      {files.length > 0 ? (
        <div className="space-y-6">
          <div className="space-y-3">
            <h3 className="text-lg font-semibold text-gray-900">
              Upload Queue ({files.length} files)
            </h3>
            
            <div className="space-y-2 max-h-96 overflow-y-auto">
              {files.map((file) => (
                <FileItem
                  key={file.id}
                  file={file}
                  onRemove={removeFile}
                  onRetry={retryUpload}
                />
              ))}
            </div>
          </div>

          {/* Upload Summary */}
          <UploadSummary 
            uploadSession={uploadSession}
            onClearAll={clearAll}
          />
        </div>
      ) : (
        <Empty
          title="Ready to upload"
          message="Your files will appear here once you start uploading. Drag and drop files above or click to browse."
          actionText="Browse Files"
          onAction={() => {
            const input = document.createElement("input");
            input.type = "file";
            input.multiple = true;
            input.onchange = (e) => {
              const files = Array.from(e.target.files || []);
              if (files.length > 0) {
                handleFileSelect(files);
              }
            };
            input.click();
          }}
        />
      )}
    </div>
  );
};

export default FileUploader;