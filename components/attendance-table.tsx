'use client'

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Check, X } from 'lucide-react'

const students = [
  { id: 1, name: "Alice Smith", status: "present", lateDays: 2, absentDays: 1 },
  { id: 2, name: "Bob Johnson", status: "absent", lateDays: 1, absentDays: 3 },
  { id: 3, name: "Charlie Brown", status: "late", lateDays: 4, absentDays: 0 },
  { id: 4, name: "Diana Wilson", status: "present", lateDays: 0, absentDays: 2 },
  { id: 5, name: "Edward Davis", status: "present", lateDays: 1, absentDays: 1 },
]

export function AttendanceTable() {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Student Name</TableHead>
            <TableHead>Today's Status</TableHead>
            <TableHead className="text-right">Late Days</TableHead>
            <TableHead className="text-right">Absent Days</TableHead>
            <TableHead className="text-right">Mark Attendance</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {students.map((student) => (
            <TableRow key={student.id}>
              <TableCell className="font-medium">{student.name}</TableCell>
              <TableCell>
                <Badge
                  variant={
                    student.status === "present"
                      ? "success"
                      : student.status === "late"
                      ? "warning"
                      : "destructive"
                  }
                >
                  {student.status.charAt(0).toUpperCase() + student.status.slice(1)}
                </Badge>
              </TableCell>
              <TableCell className="text-right">{student.lateDays}</TableCell>
              <TableCell className="text-right">{student.absentDays}</TableCell>
              <TableCell className="text-right">
                <div className="flex items-center justify-end gap-2">
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <Check className="h-4 w-4 text-green-500" />
                  </Button>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <X className="h-4 w-4 text-red-500" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

