export type TaskStatus = 'pending' | 'completed'

export type TaskPriority = 'low' | 'medium' | 'high'

export type Task = {
  id: string
  title: string
  description: string
  status: TaskStatus
  priority: TaskPriority
  category: string
  dueDate: string
  createdAt: string
  updatedAt: string
}

export type TaskInput = {
  title: string
  description: string
  priority: TaskPriority
  category: string
  dueDate: string
}

export type TaskFilters = {
  status: TaskStatus | 'all'
  priority: TaskPriority | 'all'
  category: string | 'all'
  query: string
}

export type TaskSummary = {
  total: number
  pending: number
  completed: number
  overdue: number
  highPriority: number
}

export const TASK_STATUSES: TaskStatus[] = ['pending', 'completed']

export const TASK_PRIORITIES: TaskPriority[] = ['low', 'medium', 'high']
