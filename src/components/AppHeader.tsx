import { ClipboardList } from 'lucide-react'

const navItems = [
  { href: '#tareas', label: 'Tareas' },
  { href: '#filtros', label: 'Filtros' },
  { href: '#resumen', label: 'Resumen' },
]

export function AppHeader() {
  return (
    <header className="sticky top-0 z-20 border-b border-white/10 bg-slate-950/90 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 py-4 sm:px-8">
        <a className="flex min-w-0 items-center gap-3 font-bold" href="#inicio">
          <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-emerald-400 text-slate-950">
            <ClipboardList aria-hidden="true" size={21} strokeWidth={2.25} />
          </span>
          <span className="truncate">Gestor de Tareas</span>
        </a>

        <nav aria-label="Principal" className="hidden items-center gap-6 md:flex">
          {navItems.map((item) => (
            <a
              className="text-sm font-medium text-slate-300 transition hover:text-white"
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
