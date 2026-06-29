import { Search, SlidersHorizontal } from 'lucide-react'

export function FilterPanel() {
  return (
    <section
      aria-labelledby="filters-title"
      className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
      id="filtros"
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-bold uppercase text-emerald-700">
            Filtros
          </p>
          <h2 className="mt-1 text-2xl font-bold" id="filters-title">
            Vista de trabajo
          </h2>
        </div>
        <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-slate-700">
          <SlidersHorizontal aria-hidden="true" size={21} strokeWidth={2.25} />
        </span>
      </div>

      <div className="mt-5 grid gap-3 sm:grid-cols-3">
        {['Estado', 'Prioridad', 'Categoria'].map((label) => (
          <div
            className="rounded-xl border border-slate-200 bg-slate-50 p-3"
            key={label}
          >
            <p className="text-xs font-bold uppercase text-slate-500">
              {label}
            </p>
            <p className="mt-2 text-sm font-semibold text-slate-900">Todas</p>
          </div>
        ))}
      </div>

      <div className="mt-3 flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-3 py-3 text-sm text-slate-500">
        <Search aria-hidden="true" size={17} />
        Busqueda por titulo, descripcion o categoria
      </div>
    </section>
  )
}
