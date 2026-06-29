import { CalendarDays, Plus } from 'lucide-react'

export function TaskFormPanel() {
  return (
    <section
      aria-labelledby="task-form-title"
      className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
      id="tareas"
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-bold uppercase text-emerald-700">
            Nueva tarea
          </p>
          <h2 className="mt-1 text-2xl font-bold" id="task-form-title">
            Captura rapida
          </h2>
        </div>
        <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700">
          <Plus aria-hidden="true" size={21} strokeWidth={2.25} />
        </span>
      </div>

      <div className="mt-5 grid gap-3 rounded-xl border border-dashed border-slate-300 bg-slate-50 p-4 text-sm text-slate-600">
        <p className="font-medium text-slate-900">
          Aqui entrara el formulario de creacion y edicion.
        </p>
        <p>
          La proxima etapa conectara titulo, descripcion, prioridad, categoria y
          fecha limite con el modelo de datos.
        </p>
        <div className="flex items-center gap-2 text-slate-500">
          <CalendarDays aria-hidden="true" size={17} />
          Campos previstos: prioridad, categoria y fecha.
        </div>
      </div>
    </section>
  )
}
