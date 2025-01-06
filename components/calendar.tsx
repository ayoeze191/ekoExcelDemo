'use client'

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { MoreHorizontal } from 'lucide-react'

const subjects = [
  { name: "Language Arts", color: "bg-purple-100 text-purple-700 dark:bg-purple-900/50 dark:text-purple-200" },
  { name: "Mathematics", color: "bg-red-100 text-red-700 dark:bg-red-900/50 dark:text-red-200" },
  { name: "Reading", color: "bg-orange-100 text-orange-700 dark:bg-orange-900/50 dark:text-orange-200" },
  { name: "Science", color: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/50 dark:text-emerald-200" },
  { name: "Social Studies", color: "bg-amber-100 text-amber-700 dark:bg-amber-900/50 dark:text-amber-200" },
  { name: "Writing", color: "bg-blue-100 text-blue-700 dark:bg-blue-900/50 dark:text-blue-200" }
]

const days = [
  { name: "Tue", date: "Jan 7" },
  { name: "Wed", date: "Jan 8" },
  { name: "Thu", date: "Jan 9" },
  { name: "Fri", date: "Jan 10" }
]

export function Calendar() {
  return (
    <div className="flex-1 p-4 overflow-auto">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {days.map((day) => (
          <Card key={day.name} className="overflow-hidden">
            <div className="flex items-center justify-between p-4 border-b bg-white dark:bg-gray-800">
              <div className="flex flex-col">
                <span className="text-sm text-gray-600 dark:text-gray-400">{day.name}</span>
                <span className="text-sm font-medium text-primary">{day.date}</span>
              </div>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </div>
            <div className="space-y-2 p-4 bg-gray-50/50 dark:bg-gray-900/50 min-h-[400px]">
              {subjects.map((subject) => (
                <div
                  key={`${day.name}-${subject.name}`}
                  className={`${subject.color} p-3 rounded-lg shadow-sm`}
                >
                  <div className="font-medium">{subject.name}</div>
                </div>
              ))}
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}

