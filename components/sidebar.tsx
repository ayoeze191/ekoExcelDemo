'use client'

import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { BookOpen, Users, GraduationCap, ClipboardList, Calendar, GripHorizontal, Mail, FileText, BarChart2, FolderOpen, Building2, Users2, Layout, Boxes, LogOut } from 'lucide-react'

export function Sidebar() {
  return (
    <div className="hidden lg:flex h-screen w-64 flex-col bg-white dark:bg-gray-800 border-r">
      <div className="p-6 flex items-center gap-3 border-b">
        <div className="bg-primary/10 p-2 rounded-lg">
          <BookOpen className="h-6 w-6 text-primary" />
        </div>
        <span className="text-xl font-semibold">EkoExcel</span>
      </div>
      <ScrollArea className="flex-1 px-3">
        <div className="space-y-1 py-3">
          {[
            { icon: ClipboardList, label: 'Plans', href: '/plans' },
            { icon: Users, label: 'Attendance', href: '/attendance' },
            { icon: GraduationCap, label: 'Classes', href: '/classes' },
            { icon: ClipboardList, label: 'Classwork' },
            { icon: Calendar, label: 'Events' },
            { icon: GripHorizontal, label: 'Grades' },
            { icon: BookOpen, label: 'Lesson Banks' },
            { icon: Mail, label: 'Messages' },
            { icon: FileText, label: 'Notes & To Do' },
            { icon: BarChart2, label: 'Reporting' },
            { icon: FolderOpen, label: 'Resources' },
            { icon: Building2, label: 'School Years' },
            { icon: Users2, label: 'Seating Charts' },
            { icon: Users, label: 'Students' },
            { icon: Layout, label: 'Templates' },
            { icon: Boxes, label: 'Units' },
          ].map((item) => (
            <Button
              key={item.label}
              variant="ghost"
              className="w-full justify-start font-normal"
              asChild={!!item.href}
            >
              {item.href ? (
                <a href={item.href}>
                  <item.icon className="mr-2 h-4 w-4" />
                  {item.label}
                </a>
              ) : (
                <>
                  <item.icon className="mr-2 h-4 w-4" />
                  {item.label}
                </>
              )}
            </Button>
          ))}
        </div>
      </ScrollArea>
      <div className="p-4 border-t">
        <Button variant="ghost" className="w-full justify-start">
          <LogOut className="mr-2 h-4 w-4" />
          Sign Out
        </Button>
      </div>
    </div>
  )
}

