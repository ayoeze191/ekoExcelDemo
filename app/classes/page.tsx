import { ClassesList } from "@/components/classes-list";
import { Button } from "@/components/ui/button";
export default function ClassesPage() {
  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
      <div className="flex-1 flex flex-col">
        <div className="flex-1 p-6">
          <div className="mx-auto max-w-6xl space-y-6">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <h1 className="text-2xl font-semibold">Classes</h1>
                <p className="text-sm text-muted-foreground">
                  Manage your classes and sections
                </p>
              </div>
              <Button>Add New Class</Button>
            </div>
            <ClassesList />
          </div>
        </div>
      </div>
    </div>
  );
}
