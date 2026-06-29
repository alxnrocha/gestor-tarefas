import { CheckCircle2, Circle } from 'lucide-react'

import type { Task } from '../types/task'

type TaskPreviewListProps = {
  pendingCount: number
  tasks: Task[]
}

export function TaskPreviewList({ pendingCount, tasks }: TaskPreviewListProps) {
  return (
    <aside
      aria-labelledby="task-list-title"
      className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
    >
      <div className="flex items-center justify-between gap-4 border-b border-slate-200 pb-4">
        <div>
          <p className="text-sm font-bold uppercase text-emerald-700">Hoy</p>
          <h2 className="mt-1 text-2xl font-bold" id="task-list-title">
            Panel de tareas
          </h2>
        </div>
        <span className="rounded-full bg-slate-950 px-3 py-1 text-sm font-bold text-white">
          {pendingCount} activas
        </span>
      </div>

      <div className="mt-4 grid gap-3">
        {tasks.map((task) => {
          const isCompleted = task.status === 'completed'
          const Icon = isCompleted ? CheckCircle2 : Circle

          return (
            <article
              className="flex items-start gap-3 rounded-xl border border-slate-200 bg-slate-50 p-4"
              key={task.id}
            >
              <Icon
                aria-hidden="true"
                className={isCompleted ? 'text-emerald-600' : 'text-slate-400'}
                size={22}
              />
              <div className="min-w-0">
                <h3 className="font-bold">{task.title}</h3>
                <p className="mt-1 text-sm text-slate-500">
                  {task.category} - Prioridad {task.priority}
                </p>
              </div>
            </article>
          )
        })}
      </div>
    </aside>
  )
}
