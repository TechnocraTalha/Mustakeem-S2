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

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Upload failed");
      }

      const data = await response.json();
      if (data.url && onUploadSuccess) {
        onUploadSuccess(data.url);
      }
    } catch (err) {
      console.error(err);
      setError("Failed to upload image. Please try again.");
    } finally {
      setUploading(false);
      // Reset input
      e.target.value = null;
    }
  };

  return (
    <div className={styles.uploader}>
      <label className={styles.label}>
        {uploading ? "Uploading..." : "Upload Image"}
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
