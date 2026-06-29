import type { Task, TaskFilters, TaskSummary } from '../types/task'
import type { TaskInput } from '../types/task'
import { FilterPanel } from './FilterPanel'
import { TaskFormPanel } from './TaskFormPanel'
import { TaskPreviewList } from './TaskPreviewList'

type DashboardLayoutProps = {
  editingTask: Task | null
  onCancelEdit: () => void
  onCreateTask: (input: TaskInput) => void
  onDeleteTask: (taskId: string) => void
  onEditTask: (taskId: string) => void
  onFiltersChange: (filters: TaskFilters) => void
  onToggleTask: (taskId: string) => void
  onUpdateTask: (taskId: string, input: TaskInput) => void
  summary: TaskSummary
  taskCategories: string[]
  taskFilters: TaskFilters
  tasks: Task[]
  totalTaskCount: number
}

export function DashboardLayout({
  editingTask,
  onCancelEdit,
  onCreateTask,
  onDeleteTask,
  onEditTask,
  onFiltersChange,
  onToggleTask,
  onUpdateTask,
  summary,
  taskCategories,
  taskFilters,
  tasks,
  totalTaskCount,
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
          <FilterPanel
            categories={taskCategories}
            filters={taskFilters}
            onFiltersChange={onFiltersChange}
          />
        </div>

        <TaskPreviewList
          onDeleteTask={onDeleteTask}
          onEditTask={onEditTask}
          onToggleTask={onToggleTask}
          pendingCount={summary.pending}
          tasks={tasks}
          totalTaskCount={totalTaskCount}
        />
      </div>
    </section>
  )
}
