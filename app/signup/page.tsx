"use client";

import * as React from "react";
import Image from "next/image";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

// Example schools data
const schools = [
  { value: "harvard", label: "Harvard University" },
  { value: "mit", label: "Massachusetts Institute of Technology" },
  { value: "stanford", label: "Stanford University" },
  { value: "yale", label: "Yale University" },
  { value: "princeton", label: "Princeton University" },
  { value: "oxford", label: "University of Oxford" },
  { value: "cambridge", label: "University of Cambridge" },
  { value: "caltech", label: "California Institute of Technology" },
  { value: "columbia", label: "Columbia University" },
  { value: "chicago", label: "University of Chicago" },
];

export default function SignupForm() {
  const [open, setOpen] = React.useState(false);
  const [selectedSchool, setSelectedSchool] = React.useState("");

  return (
    <div className="mx-auto max-w-sm space-y-6 p-4">
      <div className="flex flex-col items-center space-y-4">
        <div className="relative h-16 w-16">
          <Image
            src="/ubc.webp"
            alt="Company Logo"
            fill
            className="object-contain"
            priority
          />
        </div>
        <div className="space-y-2 text-center">
          <h1 className="text-3xl font-bold">Create an Account</h1>
          <p className="text-muted-foreground">
            Enter your details to get started
          </p>
        </div>
      </div>
      <form className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="firstName">First name</Label>
            <Input id="firstName" placeholder="John" required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="lastName">Last name</Label>
            <Input id="lastName" placeholder="Doe" required />
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="john@example.com"
            required
          />
        </div>
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
                  ? schools.find((school) => school.value === selectedSchool)
                      ?.label
                  : "Select school..."}
                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-full p-0">
              <Command>
                <CommandInput placeholder="Search school..." />
                <CommandEmpty>No school found.</CommandEmpty>
                <CommandGroup className="max-h-60 overflow-auto">
                  {schools.map((school) => (
                    <CommandItem
                      key={school.value}
                      value={school.value}
                      onSelect={(currentValue) => {
                        setSelectedSchool(
                          currentValue === selectedSchool ? "" : currentValue
                        );
                        setOpen(false);
                      }}
                    >
                      <Check
                        className={cn(
                          "mr-2 h-4 w-4",
                          selectedSchool === school.value
                            ? "opacity-100"
                            : "opacity-0"
                        )}
                      />
                      {school.label}
                    </CommandItem>
                  ))}
                </CommandGroup>
              </Command>
            </PopoverContent>
          </Popover>
        </div>
        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <Input id="password" type="password" required />
        </div>
        <Button type="submit" className="w-full">
          Sign Up
        </Button>
      </form>
    </div>
  );
}
