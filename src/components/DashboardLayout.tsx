import type { Task, TaskSummary } from '../types/task'
import { FilterPanel } from './FilterPanel'
import { TaskFormPanel } from './TaskFormPanel'
import { TaskPreviewList } from './TaskPreviewList'

type DashboardLayoutProps = {
  summary: TaskSummary
  tasks: Task[]
}

export function DashboardLayout({ summary, tasks }: DashboardLayoutProps) {
  return (
    <section className="bg-slate-100 text-slate-950">
      <div className="mx-auto grid max-w-7xl gap-6 px-5 py-8 sm:px-8 lg:grid-cols-[minmax(0,0.9fr)_minmax(360px,1fr)] lg:py-10">
        <div className="grid gap-6">
          <TaskFormPanel />
          <FilterPanel />
        </div>

        <TaskPreviewList pendingCount={summary.pending} tasks={tasks} />
      </div>
    </section>
  )
}
