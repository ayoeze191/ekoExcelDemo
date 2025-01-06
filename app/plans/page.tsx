import { PlanEditor } from "@/components/plan-editor"

export default function PlansPage() {
  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
      <div className="flex-1 flex flex-col">
        <PlanEditor />
      </div>
    </div>
  )
}

