import { School } from "../types/schools";

export const schools: School[] = [
  {
    id: "harvard",
    name: "Harvard University",
    maxFileSize: 15 * 1024 * 1024, // 15MB
    allowedFileTypes: ["application/pdf"],
  },
  {
    id: "mit",
    name: "MIT",
    maxFileSize: 10 * 1024 * 1024, // 10MB
    allowedFileTypes: ["application/pdf"],
  },
  {
    id: "stanford",
    name: "Stanford University",
    maxFileSize: 20 * 1024 * 1024, // 20MB
    allowedFileTypes: ["application/pdf"],
  },
  {
    id: "yale",
    name: "Yale University",
    maxFileSize: 12 * 1024 * 1024, // 12MB
    allowedFileTypes: ["application/pdf"],
  },
];
