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

export const getAllowedFileTypes = () => {
  return [
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
};

export const isValidFileType = (file, allowedTypes = null) => {
  const maxSize = 100 * 1024 * 1024; // 100MB
  const typesToCheck = allowedTypes || getAllowedFileTypes();
  
  if (file.size > maxSize) {
    return { valid: false, error: "File size must be less than 100MB" };
  }

  // Check if file type is allowed
  const fileType = file.type.toLowerCase();
  const isAllowed = typesToCheck.some(allowedType => {
    if (allowedType === '*/*') return true;
    if (allowedType.endsWith('/*')) {
      const category = allowedType.replace('/*', '');
      return fileType.startsWith(category + '/');
    }
    return fileType === allowedType.toLowerCase();
  });

  if (!isAllowed) {
    const filterName = getFilterName(typesToCheck);
    return { valid: false, error: `File type not allowed. Current filter: ${filterName}` };
  }
  
  return { valid: true, error: null };
};

const getFilterName = (types) => {
  if (types.includes('*/*')) return 'All Files';
  if (types.length === 1) {
    if (types[0] === 'image/*') return 'Images Only';
    if (types[0] === 'video/*') return 'Videos Only';
    if (types[0] === 'audio/*') return 'Audio Only';
  }
  if (types.includes('image/*') && types.includes('video/*') && types.includes('audio/*')) {
    return 'Media Files';
  }
  return 'Custom Filter';
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

// simulateUpload function removed - replaced by database integration via uploadService