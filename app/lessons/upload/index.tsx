"use client";

import * as React from "react";
import { Check, ChevronsUpDown, Upload } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import axios from "axios";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Image from "next/image";
import { axiosInstance } from "@/app/axios/axios";
import { toast, Toaster } from "sonner";

// Example schools data
// const schools = [
//   { value: "harvard", label: "Harvard University" },
//   { value: "mit", label: "Massachusetts Institute of Technology" },
//   { value: "stanford", label: "Stanford University" },
//   { value: "yale", label: "Yale University" },
//   { value: "princeton", label: "Princeton University" },
// ];

// Subject options
const subjects = [
  { value: "mathematics", label: "Mathematics" },
  { value: "physics", label: "Physics" },
  { value: "chemistry", label: "Chemistry" },
  { value: "biology", label: "Biology" },
  { value: "computer-science", label: "Computer Science" },
  { value: "literature", label: "Literature" },
  { value: "history", label: "History" },
  { value: "economics", label: "Economics" },
];

export default function PdfUploadForm() {
  const [open, setOpen] = React.useState(false);
  const [selectedSchool, setSelectedSchool] = React.useState("");
  const [selectedSubject, setSelectedSubject] = React.useState("");
  const [selectedFile, setSelectedFile] = React.useState<File | null>(null);
  const [selectedTime, setSelectedTime] = React.useState("");
  const fileInputRef = React.useRef<HTMLInputElement>(null);
  const [allschools, setSchool] = React.useState([]);
  const [allsubjects, setAllSubjects] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const allSchools = async () => {
    const response = await axiosInstance.get("/schools");
    setSchool(response.data.data);
  };
  const andleUpload = async () => {
    setLoading(true);
    const formData = new FormData();
    formData.append("lesson", selectedFile);
    formData.append("school", selectedSchool);
    formData.append("course", selectedSubject);
    formData.append("date", selectedTime || new Date().toISOString());

    const response = await axios.post(
      // "http://localhost:3000/schools/lessons/upload",
      "https://dark-rickie-ezekielsteam-b13c1bb2.koyeb.app/lessons/upload",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    setLoading(false);
    setSelectedSchool("");
    setSelectedSubject("");
    setSelectedTime("");
    setSelectedFile("");
    toast.success("Successfully uploaded Pdf");
    setLoading(false);
  };
  const allCourses = async () => {
    const response = await axiosInstance.get("/course");
    setAllSubjects(response.data.data);
  };
  React.useEffect(() => {
    const getall = async () => {
      await allSchools();
      await allCourses();
    };
    getall();
  }, []);
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type === "application/pdf") {
      setSelectedFile(file);
    } else {
      alert("Please upload a PDF file");
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    // Handle form submission here
    console.log({
      school: selectedSchool,
      subject: selectedSubject,
      file: selectedFile,
      time: selectedTime,
    });
  };
  console.log(selectedSchool);
  return (
    <div className="mx-auto max-w-md p-4">
      <Toaster />
      <Card>
        <CardHeader>
          <div className="flex justify-center mb-6">
            <div className="relative h-16 w-16">
              <Image
                src="/ubc.webp?height=64&width=64"
                alt="Company Logo"
                fill
                className="object-contain"
                priority
              />
            </div>
          </div>
          <CardTitle>Schedule And Upload Lesson</CardTitle>
          <CardDescription>
            Upload your PDF and schedule a time for the lesson
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {/* School Selection */}
            <div className="space-y-2">
              <Label>School</Label>
              <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className="w-full justify-between"
                  >
                    {selectedSchool
                      ? allschools.find(
                          (school) => school._id === selectedSchool
                        ).name
                      : "Select school..."}
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-full p-0">
                  <Command>
                    <CommandInput placeholder="Search school..." />
                    <CommandList>
                      <CommandEmpty>No school found.</CommandEmpty>
                      <CommandGroup>
                        {allschools.map((school) => (
                          <CommandItem
                            key={school.uniqueNumber}
                            value={school._id}
                            onSelect={(currentValue) => {
                              setSelectedSchool(
                                currentValue === selectedSchool
                                  ? ""
                                  : currentValue
                              );
                              setOpen(false);
                            }}
                          >
                            <Check
                              className={cn(
                                "mr-2 h-4 w-4",
                                selectedSchool == school._id
                                  ? "opacity-100"
                                  : "opacity-0"
                              )}
                            />
                            {school.name}
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
            </div>

            {/* Subject Selection */}
            <div className="space-y-2">
              <Label>Subject</Label>
              <Select
                value={selectedSubject}
                onValueChange={setSelectedSubject}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select subject..." />
                </SelectTrigger>
                <SelectContent>
                  {allsubjects.map((subject) => (
                    <SelectItem key={subject._id} value={subject._id}>
                      {subject.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* PDF Upload */}
            <div className="space-y-2">
              <Label htmlFor="pdf">PDF Document</Label>
              <div
                className="flex flex-col items-center justify-center border-2 border-dashed rounded-lg p-6 cursor-pointer"
                onClick={() => fileInputRef.current?.click()}
              >
                <Upload className="h-8 w-8 mb-2 text-muted-foreground" />
                <p className="text-sm text-muted-foreground">
                  {selectedFile
                    ? selectedFile.name
                    : "Click to upload or drag and drop"}
                </p>
                <input
                  ref={fileInputRef}
                  id="pdf"
                  type="file"
                  accept=".pdf"
                  onChange={handleFileChange}
                  className="hidden"
                />
              </div>
            </div>

            {/* Time Selection */}
            <div className="space-y-2">
              <Label htmlFor="time">Lesson Time</Label>
              <Input
                id="time"
                type="datetime-local"
                value={selectedTime}
                onChange={(e) => setSelectedTime(e.target.value)}
                className="w-full"
                required
              />
            </div>

            {/* Submit Button */}
            <Button
              onClick={andleUpload}
              className="w-full"
              // disabled={loading}
            >
              {loading ? "uploading" : "Schedule Lesson"}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
