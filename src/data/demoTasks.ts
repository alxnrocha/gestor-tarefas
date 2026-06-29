import type { Task } from '../types/task'

export const demoTasks: Task[] = [
  {
    id: 'task-brief-cliente',
    title: 'Preparar propuesta del cliente',
    description: 'Reunir notas, alcance y proximos pasos antes de enviar.',
    status: 'pending',
    priority: 'high',
    category: 'Trabajo',
    dueDate: '2026-07-01',
    createdAt: '2026-06-25T09:00:00.000Z',
    updatedAt: '2026-06-25T09:00:00.000Z',
  },
  {
    id: 'task-presupuesto-semanal',
    title: 'Revisar presupuesto semanal',
    description: 'Actualizar gastos previstos y tareas financieras abiertas.',
    status: 'completed',
    priority: 'medium',
    category: 'Finanzas',
    dueDate: '2026-06-28',
    createdAt: '2026-06-24T12:00:00.000Z',
    updatedAt: '2026-06-28T18:30:00.000Z',
  },
  {
    id: 'task-documentacion',
    title: 'Enviar documentacion pendiente',
    description: 'Comprobar archivos adjuntos y confirmar envio.',
    status: 'pending',
    priority: 'medium',
    category: 'Trabajo',
    dueDate: '2026-07-03',
    createdAt: '2026-06-26T15:15:00.000Z',
    updatedAt: '2026-06-26T15:15:00.000Z',
  },
]
