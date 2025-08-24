"use client";

import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Upload,
  FileJson,
  CheckCircle,
  AlertTriangle,
  X,
  Download,
  FileText,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface FileUploadDropzoneProps {
  onFileUpload: (data: any[]) => void;
  onError: (error: string) => void;
  isLoading?: boolean;
}

export function FileUploadDropzone({
  onFileUpload,
  onError,
  isLoading = false,
}: FileUploadDropzoneProps) {
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [uploadStatus, setUploadStatus] = useState<
    "idle" | "success" | "error"
  >("idle");
  const [validationResult, setValidationResult] = useState<{
    isValid: boolean;
    candidateCount?: number;
    skippedCount?: number;
    errors: string[];
  }>({ isValid: false, errors: [] });

  const validateAndFilterData = (
    data: any[]
  ): {
    validCandidates: any[];
    invalidCount: number;
    errors: string[];
  } => {
    if (!Array.isArray(data)) {
      return {
        validCandidates: [],
        invalidCount: 0,
        errors: ["Data must be an array of candidates"],
      };
    }

    if (data.length === 0) {
      return {
        validCandidates: [],
        invalidCount: 0,
        errors: ["No candidates found in the file"],
      };
    }

    const requiredFields = [
      "name",
      "email",
      "location",
      "work_availability",
      "work_experiences",
      "education",
      "skills",
    ];

    const validCandidates: any[] = [];
    let invalidCount = 0;
    const errors: string[] = [];

    data.forEach((candidate, index) => {
      let isValid = true;
      const candidateErrors: string[] = [];

      if (!candidate || typeof candidate !== "object") {
        isValid = false;
        candidateErrors.push("Must be an object");
      } else {
        requiredFields.forEach((field) => {
          if (field === "education") {
            if (
              !candidate[field] ||
              typeof candidate[field] !== "object" ||
              !candidate[field].highest_level ||
              !candidate[field].degrees ||
              !Array.isArray(candidate[field].degrees)
            ) {
              isValid = false;
              candidateErrors.push(`Invalid or missing '${field}' structure`);
            }
          } else if (Array.isArray(candidate[field])) {
            if (!candidate.hasOwnProperty(field)) {
              isValid = false;
              candidateErrors.push(`Missing field '${field}'`);
            }
          } else {
            if (!candidate[field]) {
              isValid = false;
              candidateErrors.push(`Missing or empty field '${field}'`);
            }
          }
        });
      }

      if (isValid) {
        validCandidates.push(candidate);
      } else {
        invalidCount++;
        if (candidateErrors.length > 0) {
          errors.push(
            `${
              candidate?.name || `Candidate ${index + 1}`
            }: ${candidateErrors.join(", ")}`
          );
        }
      }
    });

    return { validCandidates, invalidCount, errors };
  };

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const file = acceptedFiles[0];
      if (!file) return;

      setUploadedFile(file);
      setUploadStatus("idle");
      setValidationResult({ isValid: false, errors: [] });

      const reader = new FileReader();
      reader.onload = (event) => {
        try {
          const jsonData = JSON.parse(event.target?.result as string);
          const validation = validateAndFilterData(jsonData);

          if (validation.validCandidates.length > 0) {
            const candidatesWithIds = validation.validCandidates.map(
              (candidate: any, index: number) => ({
                ...candidate,
                id: candidate.id || `candidate-${Date.now()}-${index}`,
                isSelected: candidate.isSelected || false,
              })
            );

            onFileUpload(candidatesWithIds);
            setUploadStatus("success");

            const successMessages =
              validation.invalidCount > 0
                ? [
                    `✅ Successfully imported ${validation.validCandidates.length} candidates`,
                    `⚠️ Skipped ${validation.invalidCount} invalid entries`,
                  ]
                : [
                    `✅ Successfully imported ${validation.validCandidates.length} candidates`,
                  ];

            setValidationResult({
              isValid: true,
              candidateCount: validation.validCandidates.length,
              skippedCount: validation.invalidCount,
              errors: successMessages,
            });
          } else {
            setUploadStatus("error");
            setValidationResult({
              isValid: false,
              errors:
                validation.errors.length > 0
                  ? validation.errors.slice(0, 10)
                  : ["No valid candidates found"],
            });
            onError(
              `No valid candidates found. Found ${validation.invalidCount} invalid entries.`
            );
          }
        } catch (error) {
          setUploadStatus("error");
          setValidationResult({
            isValid: false,
            errors: [
              "Invalid JSON format. Please check your file and try again.",
            ],
          });
          onError("Invalid JSON format. Please check your file and try again.");
        }
      };
      reader.readAsText(file);
    },
    [onFileUpload, onError]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "application/json": [".json"],
    },
    multiple: false,
    disabled: isLoading,
  });

  const clearFile = () => {
    setUploadedFile(null);
    setUploadStatus("idle");
    setValidationResult({ isValid: false, errors: [] });
  };

  const downloadSampleFile = async () => {
    try {
      const response = await fetch("/sample-candidates.json");
      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "sample-candidates.json";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Failed to download sample file:", error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <Card className="border-2 border-dashed border-slate-300 hover:border-slate-400 transition-all duration-300 bg-slate-50/30">
        <CardContent className="p-0">
          <div
            {...getRootProps()}
            className={cn(
              "cursor-pointer transition-all duration-300 rounded-lg",
              isDragActive
                ? "bg-slate-100 border-slate-400"
                : "hover:bg-slate-50",
              isLoading && "pointer-events-none opacity-50"
            )}
          >
            <input {...getInputProps()} />
            <div className="flex flex-col items-center justify-center py-16 px-8 text-center">
              <div className="mb-8">
                <div className="w-20 h-20 rounded-2xl bg-slate-100 flex items-center justify-center">
                  {isDragActive ? (
                    <FileJson className="h-9 w-9 text-slate-600" />
                  ) : (
                    <Upload className="h-9 w-9 text-slate-600" />
                  )}
                </div>
              </div>

              <div className="space-y-4 max-w-md">
                <h3 className="text-lg font-medium text-slate-800 tracking-tight">
                  {isDragActive
                    ? "Drop file to upload"
                    : "Upload Candidate Data"}
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  {isDragActive
                    ? "Release to process your JSON file"
                    : "Drag and drop your JSON file here, or click to select from your device"}
                </p>
              </div>

              {!isDragActive && (
                <Button
                  className="mt-8 bg-slate-800 hover:bg-slate-900 text-white px-6 py-2.5 text-sm font-medium"
                  disabled={isLoading}
                >
                  Select File
                </Button>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {uploadedFile && (
        <Card className="border border-slate-200 bg-white">
          <CardContent className="p-5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-lg bg-slate-100 flex items-center justify-center">
                  <FileJson className="h-5 w-5 text-slate-600" />
                </div>
                <div>
                  <p className="font-medium text-slate-800 text-sm">
                    {uploadedFile.name}
                  </p>
                  <p className="text-xs text-slate-500 mt-0.5">
                    {(uploadedFile.size / 1024 / 1024).toFixed(2)} MB
                    {uploadStatus === "success" && " • Successfully processed"}
                    {uploadStatus === "error" && " • Processing failed"}
                    {uploadStatus === "idle" && " • Ready to process"}
                  </p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={clearFile}
                className="hover:bg-slate-100 text-slate-500 hover:text-slate-700"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {uploadStatus === "success" && validationResult.candidateCount && (
        <Card className="border border-slate-200 bg-slate-50">
          <CardContent className="p-5">
            <div className="flex items-start gap-4">
              <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center">
                <CheckCircle className="h-4 w-4 text-white" />
              </div>
              <div>
                <h4 className="font-medium text-slate-800 text-sm mb-1">
                  Upload completed successfully
                </h4>
                <p className="text-xs text-slate-600">
                  Processed {validationResult.candidateCount} candidates
                  {validationResult.skippedCount &&
                  validationResult.skippedCount > 0
                    ? ` • ${validationResult.skippedCount} entries skipped due to validation issues`
                    : ""}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {!validationResult.isValid && validationResult.errors.length > 0 && (
        <Card className="border border-slate-300 bg-slate-50">
          <CardContent className="p-5">
            <div className="flex items-start gap-4">
              <div className="w-8 h-8 rounded-full bg-slate-600 flex items-center justify-center">
                <AlertTriangle className="h-4 w-4 text-white" />
              </div>
              <div className="flex-1">
                <h4 className="font-medium text-slate-800 text-sm mb-2">
                  File processing issues
                </h4>
                <div className="space-y-1.5">
                  {validationResult.errors.slice(0, 4).map((error, index) => (
                    <div key={index} className="flex items-start gap-2">
                      <span className="text-slate-400 text-xs mt-1">•</span>
                      <span className="text-xs text-slate-600">{error}</span>
                    </div>
                  ))}
                  {validationResult.errors.length > 4 && (
                    <p className="text-slate-500 text-xs mt-2">
                      And {validationResult.errors.length - 4} additional issues
                    </p>
                  )}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        <Card className="lg:col-span-3 border border-slate-200 bg-white">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center gap-3 text-base font-medium text-slate-800">
              <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center">
                <FileText className="h-4 w-4 text-slate-600" />
              </div>
              Data Format Requirements
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="space-y-3">
              <div className="p-3 bg-slate-50 rounded-lg">
                <p className="font-medium text-slate-700 text-sm mb-1">
                  Required Fields
                </p>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Name, Email, Location, Work Availability, Work Experiences,
                  Education, Skills
                </p>
              </div>
              <div className="p-3 bg-slate-50 rounded-lg">
                <p className="font-medium text-slate-700 text-sm mb-1">
                  Data Validation
                </p>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Invalid entries are filtered automatically with detailed
                  reporting
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      
        <Card className="lg:col-span-2 border border-slate-200 bg-slate-50">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center gap-3 text-base font-medium text-slate-800">
              <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center">
                <Download className="h-4 w-4 text-slate-600" />
              </div>
              Sample Data
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-0 space-y-4">
            <p className="text-xs text-slate-600 leading-relaxed">
              Download a properly formatted example to understand the required
              structure.
            </p>
            <Button
              onClick={downloadSampleFile}
              className="w-full bg-slate-800 hover:bg-slate-900 text-white text-xs font-medium py-2.5"
            >
              <Download className="h-3 w-3 mr-2" />
              Download Sample
            </Button>
            <div className="flex gap-2">
              <Badge
                variant="outline"
                className="text-xs border-slate-300 text-slate-600"
              >
                Valid Format
              </Badge>
              <Badge
                variant="outline"
                className="text-xs border-slate-300 text-slate-600"
              >
                Real Data
              </Badge>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
