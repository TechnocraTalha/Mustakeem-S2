"use client";

import { useState } from "react";
import styles from "./ImageUploader.module.css";

export default function ImageUploader({ onUploadSuccess }) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(null);

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);
    setError(null);

    try {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (event) => {
        const img = new Image();
        img.src = event.target.result;
        img.onload = () => {
          const canvas = document.createElement("canvas");
          let width = img.width;
          let height = img.height;

          // Max dimensions
          const MAX_WIDTH = 800;
          const MAX_HEIGHT = 800;

          if (width > height) {
            if (width > MAX_WIDTH) {
              height *= MAX_WIDTH / width;
              width = MAX_WIDTH;
            }
          } else {
            if (height > MAX_HEIGHT) {
              width *= MAX_HEIGHT / height;
              height = MAX_HEIGHT;
            }
          }

          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext("2d");
          ctx.drawImage(img, 0, 0, width, height);

          // Compress to WebP (highly efficient, usually <100kb for 800px)
          const dataUrl = canvas.toDataURL("image/webp", 0.8);
          
          if (onUploadSuccess) {
            onUploadSuccess(dataUrl);
          }
          setUploading(false);
        };
      };
      reader.onerror = (error) => {
        console.error("Error reading file:", error);
        setError("Failed to read image.");
        setUploading(false);
      };
    } catch (err) {
      console.error(err);
      setError("Failed to process image.");
      setUploading(false);
    } finally {
      // Reset input
      e.target.value = null;
    }
  };

  return (
    <div className={styles.uploader}>
      <label className={styles.label}>
        {uploading ? "Processing..." : "Upload Image"}
        <input
          type="file"
          accept="image/*"
          className={styles.fileInput}
          onChange={handleFileChange}
          disabled={uploading}
        />
      </label>
      {error && <p className={styles.error}>{error}</p>}
    </div>
  );
}
