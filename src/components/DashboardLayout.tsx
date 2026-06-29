import type { Task, TaskSummary } from '../types/task'
import type { TaskInput } from '../types/task'
import { FilterPanel } from './FilterPanel'
import { TaskFormPanel } from './TaskFormPanel'
import { TaskPreviewList } from './TaskPreviewList'

type DashboardLayoutProps = {
  editingTask: Task | null
  onCancelEdit: () => void
  onCreateTask: (input: TaskInput) => void
  onEditTask: (taskId: string) => void
  onUpdateTask: (taskId: string, input: TaskInput) => void
  summary: TaskSummary
  tasks: Task[]
}

export function DashboardLayout({
  editingTask,
  onCancelEdit,
  onCreateTask,
  onEditTask,
  onUpdateTask,
  summary,
  tasks,
}: DashboardLayoutProps) {
  return (
    <section className="bg-slate-100 text-slate-950">
      <div className="mx-auto grid max-w-7xl gap-6 px-5 py-8 sm:px-8 lg:grid-cols-[minmax(0,0.9fr)_minmax(360px,1fr)] lg:py-10">
        <div className="grid gap-6">
          <TaskFormPanel
            editingTask={editingTask}
            key={editingTask?.id ?? 'new-task'}
            onCancelEdit={onCancelEdit}
            onCreateTask={onCreateTask}
            onUpdateTask={onUpdateTask}
          />
          <FilterPanel />
        </div>

        <TaskPreviewList
          onEditTask={onEditTask}
          pendingCount={summary.pending}
          tasks={tasks}
        />
      </div>
    </section>
  )
}
