import { Filter, Plus } from 'lucide-react'

import type { TaskSummary } from '../types/task'

type HeroSectionProps = {
  summary: TaskSummary
}

export function HeroSection({ summary }: HeroSectionProps) {
  return (
    <section className="border-b border-white/10" id="inicio">
      <div className="mx-auto grid w-full max-w-7xl gap-8 px-5 py-10 sm:px-8 lg:grid-cols-[minmax(0,0.9fr)_minmax(360px,1fr)] lg:items-center lg:py-14">
        <div className="min-w-0">
          <p className="inline-flex items-center gap-2 rounded-full border border-emerald-300/20 bg-emerald-300/10 px-4 py-2 text-sm font-semibold text-emerald-200">
            Productividad local
          </p>

          <h1 className="mt-6 max-w-2xl text-4xl font-bold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
            Organiza tareas, prioridades y avances en un solo lugar.
          </h1>

          <p className="mt-5 max-w-xl text-base leading-8 text-slate-300 sm:text-lg">
            Aplicacion responsive para crear, editar, filtrar y conservar
            tareas en el navegador mediante persistencia local.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg bg-emerald-400 px-5 py-3 text-sm font-bold text-slate-950 transition hover:bg-emerald-300"
              href="#tareas"
            >
              <Plus aria-hidden="true" size={18} />
              Nueva tarea
            </a>
            <a
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg border border-white/15 px-5 py-3 text-sm font-bold text-white transition hover:border-emerald-300/70 hover:text-emerald-100"
              href="#filtros"
            >
              <Filter aria-hidden="true" size={18} />
              Ver filtros
            </a>
          </div>
        </div>

        <div
          aria-label="Resumen general"
          className="grid gap-3 rounded-2xl border border-white/10 bg-white/[0.06] p-4 shadow-2xl shadow-black/30 backdrop-blur sm:grid-cols-2"
          id="resumen"
        >
          <SummaryMetric label="Total" value={summary.total} />
          <SummaryMetric label="Activas" value={summary.pending} />
          <SummaryMetric label="Completadas" value={summary.completed} />
          <SummaryMetric label="Alta prioridad" value={summary.highPriority} />
        </div>
      </div>
    </section>
  )
}

type SummaryMetricProps = {
  label: string
  value: number
}

function SummaryMetric({ label, value }: SummaryMetricProps) {
  return (
    <article className="rounded-xl border border-white/10 bg-slate-950/60 p-4">
      <p className="text-sm font-medium text-slate-400">{label}</p>
      <p className="mt-2 text-3xl font-bold text-white">{value}</p>
    </article>
  )
}
