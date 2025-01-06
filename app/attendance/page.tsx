import { AttendanceTable } from "@/components/attendance-table"

export default function AttendancePage() {
  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
      <div className="flex-1 flex flex-col">
        <div className="flex-1 p-6">
          <div className="mx-auto max-w-6xl space-y-6">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <h1 className="text-2xl font-semibold">Attendance</h1>
                <p className="text-sm text-muted-foreground">Grade 6 - Mathematics</p>
              </div>
            </div>
            <AttendanceTable />
          </div>
        </div>
      </div>
    </div>
  )
}

