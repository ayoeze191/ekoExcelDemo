"use client";

import { useState, useCallback } from "react";
import { FileIcon, UploadIcon, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/components/ui/use-toast";
import { cn } from "@/lib/utils";

interface FileWithPreview extends File {
  preview?: string;
}

export default function PDFUploader() {
  const [files, setFiles] = useState<FileWithPreview[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [uploadProgress, setUploadProgress] = useState<number>(0);
  const [isUploading, setIsUploading] = useState(false);
  const { toast } = useToast();

  const onDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const onDragLeave = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const validateFile = (file: File) => {
    if (!file.type.includes("pdf")) {
      toast({
        variant: "destructive",
        title: "Invalid file type",
        description: "Please upload PDF files only",
      });
      return false;
    }
    if (file.size > 10 * 1024 * 1024) {
      // 10MB limit
      toast({
        variant: "destructive",
        title: "File too large",
        description: "File size should be less than 10MB",
      });
      return false;
    }
    return true;
  };

  const handleFiles = useCallback(
    (incoming: FileList | null) => {
      if (incoming) {
        const validFiles = Array.from(incoming).filter(validateFile);
        setFiles((prev) => [...prev, ...validFiles]);
      }
    },
    [] // Removed validateFile from dependencies
  );

  const onDrop = useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      setIsDragging(false);
      handleFiles(e.dataTransfer.files);
    },
    [handleFiles]
  );

  const removeFile = useCallback((index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  }, []);

  const uploadFiles = async () => {
    if (files.length === 0) return;

    setIsUploading(true);
    setUploadProgress(0);

    try {
      // Simulate upload progress
      for (let i = 0; i <= 100; i += 10) {
        await new Promise((resolve) => setTimeout(resolve, 200));
        setUploadProgress(i);
      }

      // Here you would typically upload the files to your server
      // const formData = new FormData()
      // files.forEach((file) => formData.append('files', file))
      // await fetch('/api/upload', { method: 'POST', body: formData })

      toast({
        title: "Upload complete",
        description: `Successfully uploaded ${files.length} file(s)`,
      });
      setFiles([]);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Upload failed",
        description: "There was an error uploading your files",
      });
    } finally {
      setIsUploading(false);
      setUploadProgress(0);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto p-4 space-y-6">
      <div
        onDragOver={onDragOver}
        onDragLeave={onDragLeave}
        onDrop={onDrop}
        className={cn(
          "border-2 border-dashed rounded-lg p-8 text-center space-y-4 transition-colors",
          isDragging
            ? "border-primary bg-primary/10"
            : "border-muted-foreground/25",
          isUploading && "pointer-events-none opacity-50"
        )}
      >
        <div className="flex flex-col items-center gap-2">
          <UploadIcon className="h-8 w-8 text-muted-foreground/50" />
          <h3 className="text-lg font-semibold">Drag & Drop PDF files here</h3>
          <p className="text-sm text-muted-foreground">or</p>
          <Button
            variant="outline"
            disabled={isUploading}
            onClick={() => {
              const input = document.createElement("input");
              input.type = "file";
              input.multiple = true;
              input.accept = "application/pdf";
              input.onchange = (e) =>
                handleFiles((e.target as HTMLInputElement).files);
              input.click();
            }}
          >
            Select Files
          </Button>
        </div>
        <p className="text-xs text-muted-foreground">
          Only PDF files are allowed (max 10MB per file)
        </p>
      </div>

      {files.length > 0 && (
        <div className="space-y-4">
          <div className="divide-y divide-border rounded-lg border">
            {files.map((file, i) => (
              <div key={i} className="flex items-center gap-4 p-4">
                <FileIcon className="h-8 w-8 text-primary/50" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">{file.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {(file.size / 1024 / 1024).toFixed(2)} MB
                  </p>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  disabled={isUploading}
                  onClick={() => removeFile(i)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>

          {isUploading && <Progress value={uploadProgress} className="h-2" />}

          <div className="flex justify-end gap-4">
            <Button
              variant="outline"
              disabled={isUploading}
              onClick={() => setFiles([])}
            >
              Clear All
            </Button>
            <Button disabled={isUploading} onClick={uploadFiles}>
              {isUploading
                ? "Uploading..."
                : `Upload ${files.length} file${files.length === 1 ? "" : "s"}`}
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
