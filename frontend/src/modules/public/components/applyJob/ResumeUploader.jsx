import React, { useRef, useState } from "react";
import { UploadCloud, FileText, X, AlertCircle } from "lucide-react";

export default function ResumeUploader({
  resumeFile,
  setResumeFile,
  resumeError,
  setResumeError,
  brand = {},
}) {
  const fileInputRef = useRef();
  const [isDragging, setIsDragging] = useState(false);

  // Destructure branding with safe fallbacks
  const {
    themeColor = "#1295D8",
    themeColorLight = "#E8F5FD",
    headingColor = "#333333",
    mutedTextColor = "#777777",
    borderColor = "#EAEAEA",
    borderRadius = "6px",
    dangerColor = "#EF4444",
  } = brand;

  // Maximum file size (e.g., 5MB)
  const MAX_FILE_SIZE = 5 * 1024 * 1024;

  /* --- HANDLERS --- */
  const handleFile = (file) => {
    if (setResumeError) setResumeError("");

    if (!file) return;

    // Validate file type
    const validTypes = [
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ];
    if (!validTypes.includes(file.type)) {
      if (setResumeError)
        setResumeError(
          "Invalid file type. Please upload a PDF or Word document.",
        );
      return;
    }

    // Validate file size
    if (file.size > MAX_FILE_SIZE) {
      if (setResumeError)
        setResumeError("File is too large. Maximum size is 5MB.");
      return;
    }

    setResumeFile(file);
  };

  const handleInputChange = (e) => {
    handleFile(e.target.files[0]);
  };

  const handleRemove = (e) => {
    e.stopPropagation(); // Prevent opening the file dialog when clicking remove
    setResumeFile(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  /* --- DRAG AND DROP HANDLERS --- */
  const onDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const onDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const onDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  /* --- UTILITIES --- */
  const formatFileSize = (bytes) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + " " + sizes[i];
  };

  return (
    <div className="w-full">
      {/* Hidden File Input */}
      <input
        type="file"
        ref={fileInputRef}
        className="hidden"
        accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
        onChange={handleInputChange}
      />

      {/* STATE 1: FILE SELECTED */}
      {resumeFile ? (
        <div
          className="flex items-center justify-between p-4 border bg-white transition-all"
          style={{ borderColor: themeColor, borderRadius }}>
          <div className="flex items-center gap-3 overflow-hidden">
            <div
              className="p-2.5 rounded-md shrink-0"
              style={{ backgroundColor: themeColorLight }}>
              <FileText size={24} style={{ color: themeColor }} />
            </div>
            <div className="truncate pr-4">
              <p
                className="text-[14px] font-semibold truncate mb-0.5"
                style={{ color: headingColor }}>
                {resumeFile.name}
              </p>
              <p
                className="text-[12px] font-medium"
                style={{ color: mutedTextColor }}>
                {formatFileSize(resumeFile.size)}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={handleRemove}
            className="p-2 rounded-full hover:bg-slate-100 transition-colors shrink-0 focus:outline-none"
            aria-label="Remove resume">
            <X size={18} style={{ color: mutedTextColor }} />
          </button>
        </div>
      ) : (
        /* STATE 2: EMPTY DROPZONE */
        <div
          onClick={() => fileInputRef.current.click()}
          onDragOver={onDragOver}
          onDragLeave={onDragLeave}
          onDrop={onDrop}
          className={`border-2 border-dashed flex flex-col items-center justify-center p-8 text-center cursor-pointer transition-all duration-200 ${
            isDragging ? "scale-[0.99]" : "hover:bg-slate-50"
          }`}
          style={{
            borderColor: isDragging ? themeColor : borderColor,
            backgroundColor: isDragging ? themeColorLight : "transparent",
            borderRadius,
          }}>
          <UploadCloud
            size={32}
            style={{ color: isDragging ? themeColor : mutedTextColor }}
            className="mb-3 transition-colors"
          />
          <p
            className="text-[14px] font-bold mb-1"
            style={{ color: headingColor }}>
            Click to upload or drag and drop
          </p>
          <p
            className="text-[13px] font-medium"
            style={{ color: mutedTextColor }}>
            PDF, DOC, or DOCX (Max 5MB)
          </p>
        </div>
      )}

      {/* ERROR MESSAGE DISPLAY */}
      {resumeError && (
        <div
          className="flex items-center gap-1.5 mt-2.5 text-[13px] font-medium animate-in fade-in"
          style={{ color: dangerColor }}>
          <AlertCircle size={14} />
          <span>{resumeError}</span>
        </div>
      )}
    </div>
  );
}
