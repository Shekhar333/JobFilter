"use client";

import { useState, useCallback } from "react";
import { Candidate } from "@/types/candidate";

interface UseFileUploadReturn {
  uploadFile: (candidates: Candidate[]) => Promise<void>;
  isUploading: boolean;
  uploadError: string | null;
  clearError: () => void;
}

export function useFileUpload(): UseFileUploadReturn {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);

  const uploadFile = useCallback(async (candidates: Candidate[]) => {
    try {
      setIsUploading(true);
      setUploadError(null);

      const response = await fetch("/api/candidates/upload", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ candidates }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Upload failed");
      }

      const result = await response.json();
      console.log("Upload successful:", result.message);
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Upload failed";
      setUploadError(errorMessage);
      throw error;
    } finally {
      setIsUploading(false);
    }
  }, []);

  const clearError = useCallback(() => {
    setUploadError(null);
  }, []);

  return {
    uploadFile,
    isUploading,
    uploadError,
    clearError,
  };
}
