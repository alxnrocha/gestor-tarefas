import { Search, SlidersHorizontal, X } from 'lucide-react'

import type { TaskFilters, TaskPriority, TaskStatus } from '../types/task'

type FilterPanelProps = {
  categories: string[]
  filters: TaskFilters
  onFiltersChange: (filters: TaskFilters) => void
}

const emptyFilters: TaskFilters = {
  status: 'all',
  priority: 'all',
  category: 'all',
  query: '',
}

export function FilterPanel({
  categories,
  filters,
  onFiltersChange,
}: FilterPanelProps) {
  const hasActiveFilters =
    filters.status !== 'all' ||
    filters.priority !== 'all' ||
    filters.category !== 'all' ||
    filters.query.trim().length > 0

  function updateFilter<Field extends keyof TaskFilters>(
    field: Field,
    value: TaskFilters[Field],
  ) {
    onFiltersChange({ ...filters, [field]: value })
  }

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

      <div className="mt-5 grid gap-4 sm:grid-cols-3">
        <div>
          <label className="text-sm font-bold text-slate-800" htmlFor="status">
            Estado del filtro
          </label>
          <select
            className="mt-2 min-h-12 w-full rounded-lg border border-slate-300 bg-white px-3 text-sm text-slate-950 outline-none transition focus:border-emerald-500"
            id="status"
            onChange={(event) =>
              updateFilter('status', event.target.value as TaskStatus | 'all')
            }
            value={filters.status}
          >
            <option value="all">Todos</option>
            <option value="pending">Pendientes</option>
            <option value="completed">Completadas</option>
          </select>
        </div>

        <div>
          <label
            className="text-sm font-bold text-slate-800"
            htmlFor="filter-priority"
          >
            Prioridad del filtro
          </label>
          <select
            className="mt-2 min-h-12 w-full rounded-lg border border-slate-300 bg-white px-3 text-sm text-slate-950 outline-none transition focus:border-emerald-500"
            id="filter-priority"
            onChange={(event) =>
              updateFilter(
                'priority',
                event.target.value as TaskPriority | 'all',
              )
            }
            value={filters.priority}
          >
            <option value="all">Todas</option>
            <option value="low">Baja</option>
            <option value="medium">Media</option>
            <option value="high">Alta</option>
          </select>
        </div>

        <div>
          <label
            className="text-sm font-bold text-slate-800"
            htmlFor="filter-category"
          >
            Categoria del filtro
          </label>
          <select
            className="mt-2 min-h-12 w-full rounded-lg border border-slate-300 bg-white px-3 text-sm text-slate-950 outline-none transition focus:border-emerald-500"
            id="filter-category"
            onChange={(event) => updateFilter('category', event.target.value)}
            value={filters.category}
          >
            <option value="all">Todas</option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="mt-4">
        <label className="text-sm font-bold text-slate-800" htmlFor="query">
          Buscar tareas
        </label>
        <div className="mt-2 flex items-center gap-2 rounded-lg border border-slate-300 bg-white px-3 transition focus-within:border-emerald-500">
          <Search aria-hidden="true" className="text-slate-400" size={17} />
          <input
            className="min-h-12 w-full border-0 bg-transparent text-sm text-slate-950 outline-none"
            id="query"
            onChange={(event) => updateFilter('query', event.target.value)}
            placeholder="Titulo, descripcion o categoria"
            type="search"
            value={filters.query}
          />
        </div>
      </div>

      {hasActiveFilters && (
        <button
          className="mt-4 inline-flex min-h-11 items-center justify-center gap-2 rounded-lg border border-slate-300 px-4 text-sm font-bold text-slate-700 transition hover:border-slate-500"
          onClick={() => onFiltersChange(emptyFilters)}
          type="button"
        >
          <X aria-hidden="true" size={17} />
          Limpiar filtros
        </button>
      )}
    </section>
  )
}
