import { describe, expect, it } from 'vitest'

import type { Task, TaskFilters, TaskInput } from '../types/task'
import {
  createTask,
  filterTasks,
  getTaskCategories,
  getTaskSummary,
  isTaskOverdue,
  removeTask,
  replaceTask,
  setTaskStatus,
  toggleTaskStatus,
  updateTask,
} from '../utils/taskUtils'

const FIXED_DATE = new Date('2026-08-01T12:00:00.000Z')

function buildTask(overrides: Partial<Task> = {}): Task {
  return {
    id: 'task-test-001',
    title: 'Tarea de prueba',
    description: 'Descripcion de la tarea de prueba',
    status: 'pending',
    priority: 'medium',
    category: 'Desarrollo',
    dueDate: '2026-12-31',
    createdAt: '2026-07-01T08:00:00.000Z',
    updatedAt: '2026-07-01T08:00:00.000Z',
    ...overrides,
  }
}

describe('createTask', () => {
  const input: TaskInput = {
    title: '  Preparar presentacion  ',
    description: '  Revisar diapositivas y notas  ',
    priority: 'high',
    category: '  Trabajo  ',
    dueDate: '2026-09-15',
  }

  it('trims title, description, and category', () => {
    const task = createTask(input, FIXED_DATE)

    expect(task.title).toBe('Preparar presentacion')
    expect(task.description).toBe('Revisar diapositivas y notas')
    expect(task.category).toBe('Trabajo')
  })

  it('sets status to pending', () => {
    const task = createTask(input, FIXED_DATE)

    expect(task.status).toBe('pending')
  })

  it('removes diacritics from the generated id', () => {
    const task = createTask(
      { ...input, title: 'Accion corazon cañon' },
      FIXED_DATE,
    )

    expect(task.id).toMatch(/^accion-corazon-canon-\d+$/)
  })

  it('uses title and timestamp for the id', () => {
    const task = createTask(input, FIXED_DATE)

    expect(task.id).toBe(
      `preparar-presentacion-${FIXED_DATE.getTime()}`,
    )
  })

  it('falls back to "task" slug when title is empty after trim', () => {
    const task = createTask({ ...input, title: '   ??? ' }, FIXED_DATE)

    expect(task.id).toMatch(/^task-/)
  })

  it('sets createdAt and updatedAt to now', () => {
    const task = createTask(input, FIXED_DATE)

    expect(task.createdAt).toBe(FIXED_DATE.toISOString())
    expect(task.updatedAt).toBe(FIXED_DATE.toISOString())
  })
})

describe('updateTask', () => {
  const original = buildTask()
  const updatedDate = new Date('2026-08-15T20:00:00.000Z')

  it('updates title, description, and category with trimming', () => {
    const updated = updateTask(
      original,
      { title: '  Nuevo titulo  ', description: '  Nueva desc  ', category: '  Diseno  ' },
      updatedDate,
    )

    expect(updated.title).toBe('Nuevo titulo')
    expect(updated.description).toBe('Nueva desc')
    expect(updated.category).toBe('Diseno')
  })

  it('updates priority and dueDate', () => {
    const updated = updateTask(
      original,
      { priority: 'high', dueDate: '2027-01-15' },
      updatedDate,
    )

    expect(updated.priority).toBe('high')
    expect(updated.dueDate).toBe('2027-01-15')
  })

  it('keeps unchanged fields', () => {
    const updated = updateTask(original, {}, updatedDate)

    expect(updated.title).toBe(original.title)
    expect(updated.description).toBe(original.description)
    expect(updated.priority).toBe(original.priority)
    expect(updated.status).toBe(original.status)
  })

  it('bumps updatedAt', () => {
    const updated = updateTask(original, { title: 'X' }, updatedDate)

    expect(updated.updatedAt).toBe(updatedDate.toISOString())
  })

  it('does not change id or createdAt', () => {
    const updated = updateTask(original, { title: 'X' }, updatedDate)

    expect(updated.id).toBe(original.id)
    expect(updated.createdAt).toBe(original.createdAt)
  })
})

describe('setTaskStatus', () => {
  const task = buildTask()
  const updatedDate = new Date('2026-09-01T10:00:00.000Z')

  it('sets the new status', () => {
    const updated = setTaskStatus(task, 'completed', updatedDate)

    expect(updated.status).toBe('completed')
  })

  it('bumps updatedAt', () => {
    const updated = setTaskStatus(task, 'completed', updatedDate)

    expect(updated.updatedAt).toBe(updatedDate.toISOString())
  })
})

describe('toggleTaskStatus', () => {
  it('toggles from pending to completed', () => {
    const task = buildTask({ status: 'pending' })
    const updated = toggleTaskStatus(task, FIXED_DATE)

    expect(updated.status).toBe('completed')
    expect(updated.updatedAt).toBe(FIXED_DATE.toISOString())
  })

  it('toggles from completed to pending', () => {
    const task = buildTask({ status: 'completed' })
    const updated = toggleTaskStatus(task, FIXED_DATE)

    expect(updated.status).toBe('pending')
  })
})

describe('removeTask', () => {
  it('removes the task with the matching id', () => {
    const tasks = [
      buildTask({ id: 'a', title: 'A' }),
      buildTask({ id: 'b', title: 'B' }),
    ]

    const result = removeTask(tasks, 'a')

    expect(result).toHaveLength(1)
    expect(result[0].id).toBe('b')
  })

  it('returns unchanged array when id does not exist', () => {
    const tasks = [buildTask({ id: 'a' })]
    const result = removeTask(tasks, 'z')

    expect(result).toEqual(tasks)
  })

  it('returns empty array when given an empty array', () => {
    expect(removeTask([], 'x')).toEqual([])
  })
})

describe('replaceTask', () => {
  it('replaces the task with matching id', () => {
    const tasks = [buildTask({ id: 'a', title: 'Old' })]
    const updated = buildTask({ id: 'a', title: 'New' })

    const result = replaceTask(tasks, updated)

    expect(result).toHaveLength(1)
    expect(result[0].title).toBe('New')
  })

  it('returns unchanged array when id does not match', () => {
    const tasks = [buildTask({ id: 'a' })]
    const updated = buildTask({ id: 'z' })

    const result = replaceTask(tasks, updated)

    expect(result).toEqual(tasks)
  })
})

describe('filterTasks', () => {
  const tasks: Task[] = [
    buildTask({ id: '1', title: 'Revision diaria', status: 'pending', priority: 'high', category: 'Desarrollo' }),
    buildTask({ id: '2', title: 'Actualizar docs', status: 'pending', priority: 'medium', category: 'Trabajo' }),
    buildTask({ id: '3', title: 'Enviar factura', status: 'completed', priority: 'high', category: 'Finanzas' }),
    buildTask({ id: '4', title: 'Comprar materiales', status: 'completed', priority: 'low', category: 'Desarrollo' }),
  ]

  it('returns all tasks with default filters', () => {
    expect(filterTasks(tasks, {})).toHaveLength(4)
  })

  it('filters by status', () => {
    const result = filterTasks(tasks, { status: 'completed' })

    expect(result).toHaveLength(2)
    expect(result.every((t) => t.status === 'completed')).toBe(true)
  })

  it('filters by priority', () => {
    const result = filterTasks(tasks, { priority: 'high' })

    expect(result).toHaveLength(2)
    expect(result.every((t) => t.priority === 'high')).toBe(true)
  })

  it('filters by category', () => {
    const result = filterTasks(tasks, { category: 'Desarrollo' })

    expect(result).toHaveLength(2)
    expect(result.every((t) => t.category === 'Desarrollo')).toBe(true)
  })

  it('filters by query matching title (accent-insensitive)', () => {
    const result = filterTasks(tasks, { query: 'FránÇa' } as TaskFilters)

    expect(result).toHaveLength(0)
  })

  it('filters by query matching title', () => {
    const result = filterTasks(tasks, { query: 'revision' })

    expect(result).toHaveLength(1)
    expect(result[0].id).toBe('1')
  })

  it('filters by query matching description', () => {
    const taskWithDesc = buildTask({ id: '5', title: 'Extra', description: 'buscar informacion urgente', category: 'Otros' })

    const result = filterTasks([...tasks, taskWithDesc], { query: 'buscar' })

    expect(result).toHaveLength(1)
    expect(result[0].id).toBe('5')
  })

  it('filters by query matching category', () => {
    const result = filterTasks(tasks, { query: 'finanzas' })

    expect(result).toHaveLength(1)
    expect(result[0].id).toBe('3')
  })

  it('combines multiple filters', () => {
    const result = filterTasks(tasks, { status: 'pending', priority: 'high' })

    expect(result).toHaveLength(1)
    expect(result[0].id).toBe('1')
  })

  it('returns empty when no task matches', () => {
    const result = filterTasks(tasks, { query: 'xyzznonexistent' })

    expect(result).toEqual([])
  })
})

describe('getTaskSummary', () => {
  it('computes totals correctly', () => {
    const tasks: Task[] = [
      buildTask({ id: '1', status: 'pending', priority: 'high' }),
      buildTask({ id: '2', status: 'pending', priority: 'medium' }),
      buildTask({ id: '3', status: 'completed', priority: 'high' }),
      buildTask({ id: '4', status: 'completed', priority: 'low' }),
    ]

    const summary = getTaskSummary(tasks, FIXED_DATE)

    expect(summary).toEqual({
      total: 4,
      pending: 2,
      completed: 2,
      overdue: 0,
      highPriority: 2,
    })
  })

  it('counts overdue tasks correctly', () => {
    const tasks = [
      buildTask({ id: '1', status: 'pending', dueDate: '2026-01-01' }),
      buildTask({ id: '2', status: 'pending', dueDate: '2027-06-01' }),
    ]

    const summary = getTaskSummary(tasks, FIXED_DATE)

    expect(summary.overdue).toBe(1)
  })

  it('does not count completed tasks as overdue', () => {
    const tasks = [
      buildTask({ id: '1', status: 'completed', dueDate: '2026-01-01' }),
    ]

    const summary = getTaskSummary(tasks, FIXED_DATE)

    expect(summary.overdue).toBe(0)
  })

  it('returns zeroes for empty task list', () => {
    expect(getTaskSummary([], FIXED_DATE)).toEqual({
      total: 0,
      pending: 0,
      completed: 0,
      overdue: 0,
      highPriority: 0,
    })
  })
})

describe('getTaskCategories', () => {
  it('returns unique sorted categories', () => {
    const tasks = [
      buildTask({ category: 'Trabajo' }),
      buildTask({ category: 'Desarrollo' }),
      buildTask({ category: 'Trabajo' }),
      buildTask({ category: 'Finanzas' }),
    ]

    expect(getTaskCategories(tasks)).toEqual([
      'Desarrollo',
      'Finanzas',
      'Trabajo',
    ])
  })

  it('returns empty array for empty task list', () => {
    expect(getTaskCategories([])).toEqual([])
  })
})

describe('isTaskOverdue', () => {
  it('returns false when dueDate is not set', () => {
    const task = buildTask({ dueDate: '', status: 'pending' })

    expect(isTaskOverdue(task, FIXED_DATE)).toBe(false)
  })

  it('returns true when dueDate is before today', () => {
    const task = buildTask({ dueDate: '2026-01-15' })

    expect(isTaskOverdue(task, FIXED_DATE)).toBe(true)
  })

  it('returns false when dueDate is today', () => {
    const task = buildTask({ dueDate: '2026-08-01' })

    expect(isTaskOverdue(task, FIXED_DATE)).toBe(false)
  })

  it('returns false when dueDate is after today', () => {
    const task = buildTask({ dueDate: '2027-02-01' })

    expect(isTaskOverdue(task, FIXED_DATE)).toBe(false)
  })
})