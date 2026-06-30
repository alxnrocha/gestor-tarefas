import { CheckCircle2, Circle, Pencil, Trash2 } from 'lucide-react'

import type { Task } from '../types/task'

type TaskPreviewListProps = {
  onDeleteTask: (taskId: string) => void
  onEditTask: (taskId: string) => void
  onToggleTask: (taskId: string) => void
  pendingCount: number
  tasks: Task[]
  totalTaskCount: number
}

export function TaskPreviewList({
  onDeleteTask,
  onEditTask,
  onToggleTask,
  pendingCount,
  tasks,
  totalTaskCount,
}: TaskPreviewListProps) {
  return (
    <aside
      aria-labelledby="task-list-title"
      className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm lg:sticky lg:top-28 lg:self-start"
    >
      <div className="flex items-center justify-between gap-4 border-b border-slate-200 pb-4">
        <div>
          <p className="text-sm font-bold uppercase text-emerald-700">Hoy</p>
          <h2 className="mt-1 text-2xl font-bold" id="task-list-title">
            Panel de tareas
          </h2>
        </div>
        <span
          aria-live="polite"
          className="shrink-0 rounded-full bg-slate-950 px-3 py-1 text-sm font-bold text-white"
          role="status"
        >
          {tasks.length}/{totalTaskCount} visibles
        </span>
      </div>

      <p aria-live="polite" className="mt-4 text-sm text-slate-500" role="status">
        {pendingCount} tareas activas en total.
      </p>

      <div className="mt-4 grid gap-3">
        {tasks.length === 0 && (
          <div className="rounded-xl border border-dashed border-slate-300 bg-slate-50 p-6 text-center">
            <p className="font-bold text-slate-900">
              No hay tareas con estos filtros.
            </p>
            <p className="mt-2 text-sm text-slate-500">
              Ajusta la busqueda o limpia los filtros para recuperar la lista.
            </p>
          </div>
        )}

        {tasks.map((task) => {
          const isCompleted = task.status === 'completed'
          const Icon = isCompleted ? CheckCircle2 : Circle

          return (
            <article
              className="grid min-w-0 gap-4 rounded-xl border border-slate-200 bg-slate-50 p-4"
              key={task.id}
            >
              <div className="flex min-w-0 items-start gap-3">
                <button
                  aria-label={
                    isCompleted
                      ? `Reactivar ${task.title}`
                      : `Completar ${task.title}`
                  }
                  className="mt-0.5 shrink-0 rounded-full text-slate-400 transition hover:text-emerald-700"
                  onClick={() => onToggleTask(task.id)}
                  type="button"
                >
                  <Icon
                    aria-hidden="true"
                    className={
                      isCompleted ? 'text-emerald-600' : 'text-slate-400'
                    }
                    size={24}
                  />
                </button>
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <h3
                      className={
                        isCompleted
                          ? 'break-words font-bold text-slate-500 line-through'
                          : 'break-words font-bold text-slate-950'
                      }
                    >
                      {task.title}
                    </h3>
                    <span className="rounded-full bg-white px-2 py-1 text-xs font-bold text-slate-600">
                      {isCompleted ? 'Completada' : 'Pendiente'}
                    </span>
                  </div>
                  {task.description && (
                    <p className="mt-2 break-words text-sm leading-6 text-slate-600">
                      {task.description}
                    </p>
                  )}
                  <dl className="mt-3 flex flex-wrap gap-2 text-xs font-semibold text-slate-500">
                    <div className="rounded-full bg-white px-2 py-1">
                      <dt className="sr-only">Categoria</dt>
                      <dd className="break-words">{task.category}</dd>
                    </div>
                    <div className="rounded-full bg-white px-2 py-1">
                      <dt className="sr-only">Prioridad</dt>
                      <dd>Prioridad {task.priority}</dd>
                    </div>
                    {task.dueDate && (
                      <div className="rounded-full bg-white px-2 py-1">
                        <dt className="sr-only">Fecha limite</dt>
                        <dd>{task.dueDate}</dd>
                      </div>
                    )}
                  </dl>
                </div>
              </div>

              <div className="flex flex-col gap-2 sm:flex-row sm:flex-wrap">
                <button
                  aria-label={`Editar tarea ${task.title}`}
                  className="inline-flex min-h-10 items-center justify-center gap-2 rounded-lg border border-slate-300 px-3 text-xs font-bold text-slate-700 transition hover:border-emerald-500 hover:text-emerald-700"
                  onClick={() => onEditTask(task.id)}
                  type="button"
                >
                  <Pencil aria-hidden="true" size={15} />
                  Editar
                </button>
                <button
                  aria-label={`Eliminar tarea ${task.title}`}
                  className="inline-flex min-h-10 items-center justify-center gap-2 rounded-lg border border-red-200 px-3 text-xs font-bold text-red-700 transition hover:border-red-400 hover:bg-red-50"
                  onClick={() => onDeleteTask(task.id)}
                  type="button"
                >
                  <Trash2 aria-hidden="true" size={15} />
                  Eliminar
                </button>
              </div>
            </article>
          )
        })}
      </div>
    </aside>
  )
}
