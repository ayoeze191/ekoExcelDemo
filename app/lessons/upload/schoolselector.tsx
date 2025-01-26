"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { School } from "../../types/schools";
import { useEffect, useState } from "react";
import { axiosInstance } from "@/app/axios/axios";

interface SchoolSelectorProps {
  schools: School[];
  selectedSchool: School | null;
  onSelectSchool: (schoolId: string) => void;
  disabled?: boolean;
}

export function SchoolSelector({
  schools,
  selectedSchool,
  onSelectSchool,
  disabled = false,
}: SchoolSelectorProps) {
  const [allschools, setSchool] = useState([]);
  const allSchools = async () => {
    const response = await axiosInstance.get("/schools");
    setSchool(response.data.data);
  };
  useEffect(() => {
    const getallSchools = async () => {
      await allSchools();
    };
    getallSchools();
  }, []);
  return (
    <div className="space-y-2">
      <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
        Select School
      </label>
      <Select
        disabled={disabled}
        value={selectedSchool?.id}
        onValueChange={onSelectSchool}
      >
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Select a school" />
        </SelectTrigger>
        <SelectContent>
          {allschools.map((school) => (
            <SelectItem key={school.uniqueNumber} value={school._id}>
              {school.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
