export interface School {
  id: string;
  name: string;
  maxFileSize: number; // in bytes
  allowedFileTypes: string[];
}

export interface UploadFormData {
  schoolId: string;
  files: File[];
}
