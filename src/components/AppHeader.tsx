import { ClipboardList } from 'lucide-react'

const navItems = [
  { href: '#tareas', label: 'Tareas' },
  { href: '#filtros', label: 'Filtros' },
  { href: '#resumen', label: 'Resumen' },
]

export function AppHeader() {
  return (
    <header className="sticky top-0 z-20 border-b border-white/10 bg-slate-950/90 backdrop-blur">
      <a
        className="sr-only focus:not-sr-only focus:absolute focus:left-5 focus:top-4 focus:z-30 focus:rounded-lg focus:bg-emerald-400 focus:px-4 focus:py-3 focus:text-sm focus:font-bold focus:text-slate-950"
        href="#contenido"
      >
        Saltar al contenido
      </a>
      <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-4 px-5 py-4 sm:px-8 md:flex-row md:items-center">
        <a className="flex min-w-0 items-center gap-3 font-bold" href="#inicio">
          <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-emerald-400 text-slate-950">
            <ClipboardList aria-hidden="true" size={21} strokeWidth={2.25} />
          </span>
          <span className="truncate">Gestor de Tareas</span>
        </a>

        <nav
          aria-label="Principal"
          className="flex w-full items-center gap-2 overflow-x-auto pb-1 md:w-auto md:gap-6 md:overflow-visible md:pb-0"
        >
          {navItems.map((item) => (
            <a
              className="shrink-0 rounded-full border border-white/10 px-3 py-2 text-sm font-medium text-slate-300 transition hover:border-emerald-300/50 hover:text-white md:border-0 md:px-0 md:py-0"
              href={item.href}
              key={item.href}
            >
              {item.label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  )
}
