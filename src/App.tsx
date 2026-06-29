import {
  CheckCircle2,
  Circle,
  ClipboardList,
  Filter,
  Plus,
} from 'lucide-react'

const previewTasks = [
  {
    title: 'Preparar propuesta del cliente',
    meta: 'Alta prioridad',
    done: false,
  },
  {
    title: 'Revisar presupuesto semanal',
    meta: 'Hoy',
    done: true,
  },
  {
    title: 'Enviar documentacion pendiente',
    meta: 'Trabajo',
    done: false,
  },
]

function App() {
  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <section className="mx-auto grid min-h-screen w-full max-w-6xl gap-8 px-5 py-8 sm:px-8 lg:grid-cols-[minmax(0,0.95fr)_minmax(360px,1fr)] lg:items-center lg:py-12">
        <div className="min-w-0">
          <p className="inline-flex items-center gap-2 rounded-full border border-emerald-300/20 bg-emerald-300/10 px-4 py-2 text-sm font-semibold text-emerald-200">
            <ClipboardList aria-hidden="true" size={18} />
            Gestor de tareas local
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
              href="#vista-previa"
            >
              <Plus aria-hidden="true" size={18} />
              Nueva tarea
            </a>
            <a
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg border border-white/15 px-5 py-3 text-sm font-bold text-white transition hover:border-emerald-300/70 hover:text-emerald-100"
              href="#flujo"
            >
              <Filter aria-hidden="true" size={18} />
              Ver flujo
            </a>
          </div>
        </div>

        <aside
          aria-label="Vista previa del gestor"
          className="rounded-2xl border border-white/10 bg-white/[0.06] p-4 shadow-2xl shadow-black/30 backdrop-blur"
          id="vista-previa"
        >
          <div className="rounded-xl bg-slate-100 p-4 text-slate-950">
            <div className="flex items-center justify-between gap-4 border-b border-slate-200 pb-4">
              <div>
                <p className="text-sm font-bold uppercase text-emerald-700">
                  Hoy
                </p>
                <h2 className="mt-1 text-2xl font-bold">Panel de tareas</h2>
              </div>
              <span className="rounded-full bg-slate-950 px-3 py-1 text-sm font-bold text-white">
                2 activas
              </span>
            </div>

            <div className="mt-4 grid gap-3">
              {previewTasks.map((task) => {
                const Icon = task.done ? CheckCircle2 : Circle

                return (
                  <article
                    className="flex items-start gap-3 rounded-lg border border-slate-200 bg-white p-4"
                    key={task.title}
                  >
                    <Icon
                      aria-hidden="true"
                      className={task.done ? 'text-emerald-600' : 'text-slate-400'}
                      size={22}
                    />
                    <div>
                      <h3 className="font-bold">{task.title}</h3>
                      <p className="mt-1 text-sm text-slate-500">{task.meta}</p>
                    </div>
                  </article>
                )
              })}
            </div>
          </div>
        </aside>
      </section>
    </main>
  )
}

export default App
