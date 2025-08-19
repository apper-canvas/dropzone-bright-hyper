import { useState, useCallback } from "react";
import { toast } from "react-toastify";
import { 
  generateFileId, 
  getFileType, 
  isValidFileType, 
  createFilePreview,
  simulateUpload 
} from "@/utils/fileUtils";

export const useFileUpload = () => {
  const [files, setFiles] = useState([]);
  const [uploadSession, setUploadSession] = useState({
    totalFiles: 0,
    completedFiles: 0,
    totalSize: 0,
    uploadedSize: 0,
    startTime: null,
  });
  const [isDragOver, setIsDragOver] = useState(false);

  const addFiles = useCallback(async (fileList) => {
    const newFiles = [];
    const currentTime = Date.now();
    
    for (const file of fileList) {
      const validation = isValidFileType(file);
      
      if (!validation.valid) {
        toast.error(`${file.name}: ${validation.error}`);
        continue;
      }

      const fileId = generateFileId();
      const fileType = getFileType(file);
      const preview = await createFilePreview(file);

      const fileObject = {
        id: fileId,
        name: file.name,
        size: file.size,
        type: file.type,
        fileType,
        status: "pending",
        progress: 0,
        uploadedAt: null,
        url: null,
        preview,
        file, // Keep reference to original file
      };

      newFiles.push(fileObject);
    }

    if (newFiles.length > 0) {
      setFiles(prev => [...prev, ...newFiles]);
      
      setUploadSession(prev => ({
        ...prev,
        totalFiles: prev.totalFiles + newFiles.length,
        totalSize: prev.totalSize + newFiles.reduce((sum, file) => sum + file.size, 0),
        startTime: prev.startTime || currentTime,
      }));

      toast.success(`${newFiles.length} file(s) added to upload queue`);
      
      // Start uploading files immediately
      newFiles.forEach(file => startUpload(file.id));
    }
  }, []);

  const startUpload = useCallback(async (fileId) => {
    setFiles(prev => 
      prev.map(file => 
        file.id === fileId 
          ? { ...file, status: "uploading", progress: 0 }
          : file
      )
    );

    try {
      const file = files.find(f => f.id === fileId);
      if (!file) return;

      const result = await simulateUpload(file.file, (progress) => {
        setFiles(prev => 
          prev.map(f => 
            f.id === fileId 
              ? { ...f, progress }
              : f
          )
        );
      });

      setFiles(prev => 
        prev.map(f => 
          f.id === fileId 
            ? { 
                ...f, 
                status: "completed", 
                progress: 100,
                uploadedAt: result.uploadedAt,
                url: result.url
              }
            : f
        )
      );

      setUploadSession(prev => ({
        ...prev,
        completedFiles: prev.completedFiles + 1,
        uploadedSize: prev.uploadedSize + file.size,
      }));

      toast.success(`${file.name} uploaded successfully`);

    } catch (error) {
      setFiles(prev => 
        prev.map(f => 
          f.id === fileId 
            ? { ...f, status: "failed", progress: 0 }
            : f
        )
      );

      toast.error(`Failed to upload ${files.find(f => f.id === fileId)?.name}`);
    }
  }, [files]);

  const removeFile = useCallback((fileId) => {
    const file = files.find(f => f.id === fileId);
    if (!file) return;

    setFiles(prev => prev.filter(f => f.id !== fileId));
    
    setUploadSession(prev => ({
      ...prev,
      totalFiles: prev.totalFiles - 1,
      completedFiles: file.status === "completed" ? prev.completedFiles - 1 : prev.completedFiles,
      totalSize: prev.totalSize - file.size,
      uploadedSize: file.status === "completed" ? prev.uploadedSize - file.size : prev.uploadedSize,
    }));

    toast.info(`${file.name} removed from queue`);
  }, [files]);

  const retryUpload = useCallback((fileId) => {
    startUpload(fileId);
  }, [startUpload]);

  const clearAll = useCallback(() => {
    setFiles([]);
    setUploadSession({
      totalFiles: 0,
      completedFiles: 0,
      totalSize: 0,
      uploadedSize: 0,
      startTime: null,
    });
    toast.info("All files cleared");
  }, []);

  const handleDragOver = useCallback((e) => {
    e.preventDefault();
    setIsDragOver(true);
  }, []);

  const handleDragLeave = useCallback((e) => {
    e.preventDefault();
    setIsDragOver(false);
  }, []);

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    setIsDragOver(false);
    
    const droppedFiles = Array.from(e.dataTransfer.files);
    if (droppedFiles.length > 0) {
      addFiles(droppedFiles);
    }
  }, [addFiles]);

  return {
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
  };
};