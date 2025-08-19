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
        status_c: "pending",
        progress_c: 0,
        uploaded_at_c: null,
        url_c: null,
        preview_c: preview,
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

      // Update status to uploading
      setFiles(prev => 
        prev.map(f => 
          f.id === fileId 
            ? { ...f, status_c: "uploading" }
            : f
        )
      );

      // Simulate progress for UI (since real upload progress tracking would require server support)
      let progress = 0;
      const progressInterval = setInterval(() => {
        progress += Math.random() * 15 + 5;
        if (progress >= 100) {
          progress = 100;
          clearInterval(progressInterval);
        }
        
        setFiles(prev => 
          prev.map(f => 
            f.id === fileId 
              ? { ...f, progress_c: Math.round(progress) }
              : f
          )
        );
      }, 100 + Math.random() * 200);

      // Create upload record in database
      const { uploadService } = await import('@/services/api/uploadService');
      
      const uploadData = {
        name: file.name,
        file_id_c: file.id,
        size_c: file.size,
        type_c: file.type,
        file_type_c: file.fileType,
        status_c: "completed",
        progress_c: 100,
        uploaded_at_c: new Date().toISOString(),
        url_c: URL.createObjectURL(file.file),
        preview_c: file.preview_c
      };

      await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 2000)); // Simulate upload time
      const result = await uploadService.createUpload(uploadData);

      setFiles(prev => 
        prev.map(f => 
          f.id === fileId 
            ? { 
                ...f, 
                status_c: "completed", 
                progress_c: 100,
                uploaded_at_c: result.uploaded_at_c,
                url_c: result.url_c
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
            ? { ...f, status_c: "failed", progress_c: 0 }
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