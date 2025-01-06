'use client'

import { ChevronLeft, ChevronRight, List, Share, Plus, Search, CalendarDays } from 'lucide-react'
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function Header() {
  return (
    <div className="border-b bg-white dark:bg-gray-800 p-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="icon" className="lg:hidden">
            <List className="h-5 w-5" />
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="h-8 gap-2">
                <CalendarDays className="h-4 w-4" />
                View Options
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start">
              <DropdownMenuItem>Week View</DropdownMenuItem>
              <DropdownMenuItem>Month View</DropdownMenuItem>
              <DropdownMenuItem>List View</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 bg-gray-50 dark:bg-gray-700 rounded-lg p-1">
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <div className="flex items-center gap-3 px-2">
              <span className="text-sm font-medium">2024-2025</span>
              <div className="h-4 w-px bg-gray-300 dark:bg-gray-600" />
              <Button variant="secondary" size="sm" className="h-7">Today</Button>
              <div className="h-4 w-px bg-gray-300 dark:bg-gray-600" />
              <span className="text-sm font-medium">Jan 5-Jan 11</span>
            </div>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon">
            <Plus className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon">
            <Share className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon">
            <Search className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}

