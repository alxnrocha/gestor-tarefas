import { afterEach, beforeEach, describe, expect, it } from 'vitest'

import type { Task } from '../types/task'
import {
  clearStoredTasks,
  loadStoredTasks,
  saveStoredTasks,
} from '../utils/taskStorage'

const STORAGE_KEY = 'gestor-tareas.tasks.v1'

const sampleTasks: Task[] = [
  {
    id: 'task-test-001',
    title: 'Tarea de prueba',
    description: 'Descripcion de la tarea de prueba',
    status: 'pending',
    priority: 'medium',
    category: 'Desarrollo',
    dueDate: '2026-12-31',
    createdAt: '2026-07-01T08:00:00.000Z',
    updatedAt: '2026-07-01T08:00:00.000Z',
  },
]

beforeEach(() => {
  window.localStorage.clear()
})

afterEach(() => {
  window.localStorage.clear()
})

describe('loadStoredTasks', () => {
  it('returns fallback when localStorage is empty', () => {
    const result = loadStoredTasks(sampleTasks)

    expect(result).toEqual(sampleTasks)
  })

  it('returns parsed tasks when valid JSON is stored', () => {
    window.localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(sampleTasks),
    )

    expect(loadStoredTasks([])).toEqual(sampleTasks)
  })

  it('returns fallback when JSON is malformed', () => {
    window.localStorage.setItem(STORAGE_KEY, '{not-valid-json')

    expect(loadStoredTasks(sampleTasks)).toEqual(sampleTasks)
  })

  it('returns fallback when stored data is not a task array', () => {
    window.localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ nope: true }),
    )

    expect(loadStoredTasks(sampleTasks)).toEqual(sampleTasks)
  })

  it('returns fallback when stored task is missing required fields', () => {
    window.localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify([{ id: 'x', title: 'Incomplete' }]),
    )

    expect(loadStoredTasks(sampleTasks)).toEqual(sampleTasks)
  })
})

describe('saveStoredTasks', () => {
  it('persists tasks to localStorage', () => {
    saveStoredTasks(sampleTasks)

    const raw = window.localStorage.getItem(STORAGE_KEY)

    expect(JSON.parse(raw!)).toEqual(sampleTasks)
  })
})

describe('clearStoredTasks', () => {
  it('removes tasks from localStorage', () => {
    window.localStorage.setItem(STORAGE_KEY, 'whatever')
    clearStoredTasks()

    expect(window.localStorage.getItem(STORAGE_KEY)).toBeNull()
  })
})