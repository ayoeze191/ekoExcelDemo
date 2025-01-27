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

interface School {
  name: string;
  _id: string;
  uniqueNumber: string;
}

interface Subject {
  name: string;
  _id: string;
}

const PdfUploadForm = () => {
  const [open, setOpen] = React.useState(false);
  const [selectedSchool, setSelectedSchool] = React.useState("");
  const [selectedSubject, setSelectedSubject] = React.useState("");
  const [selectedFile, setSelectedFile] = React.useState<File | null>(null);
  const [selectedTime, setSelectedTime] = React.useState("");
  const fileInputRef = React.useRef<HTMLInputElement>(null);
  const [allschools, setSchool] = React.useState<School[]>([]);
  const [allsubjects, setAllSubjects] = React.useState<Subject[]>([]);
  const [loading, setLoading] = React.useState(false);

  const allSchools = async () => {
    try {
      const response = await axiosInstance.get("/schools");
      setSchool(response.data.data);
    } catch (error) {
      toast.error("Failed to fetch schools");
    }
  };

  const allCourses = async () => {
    try {
      const response = await axiosInstance.get("/course");
      setAllSubjects(response.data.data);
    } catch (error) {
      toast.error("Failed to fetch courses");
    }
  };

  const andleUpload = async () => {
    setLoading(true);
    try {
      const formData = new FormData();
      if (selectedFile) formData.append("lesson", selectedFile);
      formData.append("school", selectedSchool);
      formData.append("course", selectedSubject);
      formData.append("date", selectedTime || new Date().toISOString());

      await axios.post(
        "https://dark-rickie-ezekielsteam-b13c1bb2.koyeb.app/lessons/upload",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      toast.success("Successfully uploaded PDF");
      setSelectedSchool("");
      setSelectedSubject("");
      setSelectedTime("");
      setSelectedFile(null);
    } catch (error) {
      toast.error("Failed to upload PDF");
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    allSchools();
    allCourses();
  }, []);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file?.type === "application/pdf") {
      setSelectedFile(file);
    } else {
      toast.error("Please upload a PDF file");
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

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
                        )?.name ?? "Select school..."
                      : "Select school..."}
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-[200px] p-0">
                  <Command>
                    <CommandInput placeholder="Search school..." />
                    <CommandList>
                      <CommandEmpty>No school found.</CommandEmpty>
                      <CommandGroup>
                        {allschools.map((school) => (
                          <CommandItem
                            key={school._id}
                            onSelect={() => setSelectedSchool(school._id)}
                          >
                            <Check
                              className={cn(
                                "mr-2 h-4 w-4",
                                selectedSchool === school._id
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
                  <SelectValue placeholder="Select a subject..." />
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

            {/* Date Selection */}
            <div className="space-y-2">
              <Label>Lesson Date</Label>
              <Input
                type="datetime-local"
                value={selectedTime}
                onChange={(e) => setSelectedTime(e.target.value)}
              />
            </div>

            {/* File Upload */}
            <div className="space-y-2">
              <Label>Upload File</Label>
              <Input
                ref={fileInputRef}
                type="file"
                accept="application/pdf"
                onChange={handleFileChange}
              />
            </div>

            {/* Submit */}
            <Button className="w-full" onClick={andleUpload} disabled={loading}>
              {loading ? "Uploading..." : "Upload"}
              <Upload className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PdfUploadForm;
