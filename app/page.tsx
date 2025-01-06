import { Calendar } from "@/components/calendar"
import { Sidebar } from "@/components/sidebar"
import { Header } from "@/components/header"

export default function Page() {
  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header />
        <Calendar />
      </div>
    </div>
  )
}

