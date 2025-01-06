'use client'

import * as React from "react"
import { Bold, Italic, List, ListOrdered, ChevronDown } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"

export function PlanEditor() {
  return (
    <div className="flex-1 p-6">
      <div className="mx-auto max-w-4xl space-y-6">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <h1 className="text-2xl font-semibold">Mathematics - Grade 6</h1>
            <p className="text-sm text-muted-foreground">Tuesday, January 7th</p>
          </div>
          <Button>Save Plan</Button>
        </div>
        
        <div className="grid gap-6">
          <Card className="p-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="objective">Lesson Objective</Label>
                <Input
                  id="objective"
                  placeholder="Students will be able to..."
                  defaultValue="Students will be able to solve one-step equations using addition and subtraction"
                />
              </div>
              
              <div className="space-y-2">
                <Label>Materials Needed</Label>
                <div className="flex flex-wrap gap-2">
                  {["Whiteboards", "Markers", "Worksheet 6.1", "Calculator"].map((material) => (
                    <div
                      key={material}
                      className="rounded-full bg-primary/10 px-3 py-1 text-sm text-primary"
                    >
                      {material}
                    </div>
                  ))}
                  <Button variant="outline" size="sm" className="rounded-full">
                    + Add Material
                  </Button>
                </div>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Lesson Plan</Label>
                <div className="flex items-center gap-2 border-b pb-4">
                  <Button variant="outline" size="sm">
                    <Bold className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="sm">
                    <Italic className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="sm">
                    <List className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="sm">
                    <ListOrdered className="h-4 w-4" />
                  </Button>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" size="sm">
                        Normal Text
                        <ChevronDown className="ml-2 h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuItem>Normal Text</DropdownMenuItem>
                      <DropdownMenuItem>Heading 1</DropdownMenuItem>
                      <DropdownMenuItem>Heading 2</DropdownMenuItem>
                      <DropdownMenuItem>Heading 3</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
                <Textarea
                  className="min-h-[300px]"
                  placeholder="Write your lesson plan here..."
                  defaultValue={`1. Warm-up (10 minutes):
• Review previous day's homework
• Quick problems on the board

2. Introduction (15 minutes):
• Present the concept of one-step equations
• Demonstrate solving with real-world examples

3. Guided Practice (20 minutes):
• Work through example problems as a class
• Students solve problems on whiteboards

4. Independent Practice (25 minutes):
• Students complete Worksheet 6.1
• Circulate to provide support

5. Closure (10 minutes):
• Exit ticket: 3 problems
• Preview next day's lesson`}
                />
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="homework">Homework Assignment</Label>
                <Input
                  id="homework"
                  placeholder="Enter homework assignment..."
                  defaultValue="Complete problems 1-12 on page 127"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="notes">Additional Notes</Label>
                <Textarea
                  id="notes"
                  placeholder="Any additional notes..."
                  defaultValue="Remember to check for understanding frequently throughout the lesson. Some students may need additional support with negative numbers."
                />
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}

