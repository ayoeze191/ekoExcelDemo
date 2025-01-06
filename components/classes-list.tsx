'use client'

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { MoreHorizontal, Users } from 'lucide-react'

const classes = [
  {
    id: 1,
    name: "Mathematics",
    grade: "Grade 6",
    section: "A",
    students: 28,
    schedule: "Mon, Wed, Fri",
    time: "9:00 AM - 10:00 AM",
  },
  {
    id: 2,
    name: "Science",
    grade: "Grade 6",
    section: "B",
    students: 25,
    schedule: "Tue, Thu",
    time: "11:00 AM - 12:00 PM",
  },
  {
    id: 3,
    name: "English",
    grade: "Grade 6",
    section: "A",
    students: 30,
    schedule: "Mon, Wed, Fri",
    time: "1:00 PM - 2:00 PM",
  },
  {
    id: 4,
    name: "Social Studies",
    grade: "Grade 6",
    section: "C",
    students: 26,
    schedule: "Tue, Thu",
    time: "2:00 PM - 3:00 PM",
  },
]

export function ClassesList() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {classes.map((classItem) => (
        <Card key={classItem.id} className="p-6">
          <div className="flex items-start justify-between">
            <div className="space-y-1">
              <h3 className="font-semibold">{classItem.name}</h3>
              <div className="flex items-center gap-2">
                <Badge variant="secondary">{classItem.grade}</Badge>
                <Badge variant="outline">Section {classItem.section}</Badge>
              </div>
            </div>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </div>
          <div className="mt-4 space-y-2">
            <div className="flex items-center text-sm text-muted-foreground">
              <Users className="mr-2 h-4 w-4" />
              {classItem.students} Students
            </div>
            <div className="text-sm">
              <div>{classItem.schedule}</div>
              <div className="text-muted-foreground">{classItem.time}</div>
            </div>
          </div>
          <div className="mt-4 flex gap-2">
            <Button variant="outline" className="w-full">View Details</Button>
            <Button variant="outline" className="w-full">Take Attendance</Button>
          </div>
        </Card>
      ))}
    </div>
  )
}

