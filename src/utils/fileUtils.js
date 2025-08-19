export const formatFileSize = (bytes) => {
  if (bytes === 0) return "0 Bytes";
  
  const k = 1024;
  const sizes = ["Bytes", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
};

export const getFileType = (file) => {
  const type = file.type.toLowerCase();
  
  if (type.startsWith("image/")) return "image";
  if (type.startsWith("video/")) return "video";
  if (type.startsWith("audio/")) return "audio";
  if (type.includes("pdf") || type.includes("document") || type.includes("text")) return "document";
  if (type.includes("zip") || type.includes("rar") || type.includes("tar")) return "archive";
  
  return "default";
};

export const getFileIcon = (fileType) => {
  switch (fileType) {
    case "image":
      return "Image";
    case "video":
      return "Video";
    case "audio":
      return "Music";
    case "document":
      return "FileText";
    case "archive":
      return "Archive";
    default:
      return "File";
  }
};

export const isValidFileType = (file) => {
  const maxSize = 100 * 1024 * 1024; // 100MB
  const allowedTypes = [
    "image/*",
    "video/*",
    "audio/*",
    "application/pdf",
    "text/*",
    "application/zip",
    "application/x-rar-compressed",
    "application/msword",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  ];
  
  if (file.size > maxSize) {
    return { valid: false, error: "File size must be less than 100MB" };
  }
  
  return { valid: true, error: null };
};

export const generateFileId = () => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
};

export const createFilePreview = (file) => {
  return new Promise((resolve) => {
    if (file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = (e) => resolve(e.target.result);
      reader.onerror = () => resolve(null);
      reader.readAsDataURL(file);
    } else {
      resolve(null);
    }
  });
};

export const simulateUpload = (file, onProgress) => {
  return new Promise((resolve, reject) => {
    let progress = 0;
    const interval = setInterval(() => {
      progress += Math.random() * 15 + 5; // Random progress increment
      
      if (progress >= 100) {
        progress = 100;
        clearInterval(interval);
        
        // Simulate occasional failures
        if (Math.random() < 0.1) {
          reject(new Error("Upload failed"));
        } else {
          resolve({
            id: generateFileId(),
            name: file.name,
            size: file.size,
            type: file.type,
            status: "completed",
            progress: 100,
            uploadedAt: Date.now(),
            url: URL.createObjectURL(file),
          });
        }
      } else {
        onProgress(Math.round(progress));
      }
    }, 100 + Math.random() * 200); // Random interval
  });
};