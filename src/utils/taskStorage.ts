import type { Task } from '../types/task'

const STORAGE_KEY = 'gestor-tareas.tasks.v1'

export function loadStoredTasks(fallbackTasks: Task[]): Task[] {
  if (!isStorageAvailable()) {
    return fallbackTasks
  }

  try {
    const rawTasks = window.localStorage.getItem(STORAGE_KEY)

    if (!rawTasks) {
      return fallbackTasks
    }

    const parsedTasks: unknown = JSON.parse(rawTasks)

    return isTaskList(parsedTasks) ? parsedTasks : fallbackTasks
  } catch {
    return fallbackTasks
  }
}

export function saveStoredTasks(tasks: Task[]): void {
  if (!isStorageAvailable()) {
    return
  }

  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks))
}

export function clearStoredTasks(): void {
  if (!isStorageAvailable()) {
    return
  }

  window.localStorage.removeItem(STORAGE_KEY)
}

function isStorageAvailable(): boolean {
  return typeof window !== 'undefined' && 'localStorage' in window
}

function isTaskList(value: unknown): value is Task[] {
  return Array.isArray(value) && value.every(isTask)
}

function isTask(value: unknown): value is Task {
  if (!value || typeof value !== 'object') {
    return false
  }

  const task = value as Record<string, unknown>

  return (
    typeof task.id === 'string' &&
    typeof task.title === 'string' &&
    typeof task.description === 'string' &&
    (task.status === 'pending' || task.status === 'completed') &&
    (task.priority === 'low' ||
      task.priority === 'medium' ||
      task.priority === 'high') &&
    typeof task.category === 'string' &&
    typeof task.dueDate === 'string' &&
    typeof task.createdAt === 'string' &&
    typeof task.updatedAt === 'string'
  )
}
