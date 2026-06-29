import type {
  Task,
  TaskFilters,
  TaskInput,
  TaskStatus,
  TaskSummary,
} from '../types/task'

const DEFAULT_FILTERS: TaskFilters = {
  status: 'all',
  priority: 'all',
  category: 'all',
  query: '',
}

export function createTask(input: TaskInput, now = new Date()): Task {
  const timestamp = now.toISOString()

  return {
    id: createTaskId(input.title, now),
    title: input.title.trim(),
    description: input.description.trim(),
    status: 'pending',
    priority: input.priority,
    category: input.category.trim(),
    dueDate: input.dueDate,
    createdAt: timestamp,
    updatedAt: timestamp,
  }
}

export function updateTask(
  task: Task,
  input: Partial<TaskInput>,
  now = new Date(),
): Task {
  return {
    ...task,
    ...('title' in input ? { title: input.title?.trim() ?? task.title } : {}),
    ...('description' in input
      ? { description: input.description?.trim() ?? task.description }
      : {}),
    ...('priority' in input ? { priority: input.priority ?? task.priority } : {}),
    ...('category' in input
      ? { category: input.category?.trim() ?? task.category }
      : {}),
    ...('dueDate' in input ? { dueDate: input.dueDate ?? task.dueDate } : {}),
    updatedAt: now.toISOString(),
  }
}

export function setTaskStatus(
  task: Task,
  status: TaskStatus,
  now = new Date(),
): Task {
  return {
    ...task,
    status,
    updatedAt: now.toISOString(),
  }
}

export function toggleTaskStatus(task: Task, now = new Date()): Task {
  return setTaskStatus(
    task,
    task.status === 'completed' ? 'pending' : 'completed',
    now,
  )
}

export function removeTask(tasks: Task[], taskId: string): Task[] {
  return tasks.filter((task) => task.id !== taskId)
}

export function replaceTask(tasks: Task[], nextTask: Task): Task[] {
  return tasks.map((task) => (task.id === nextTask.id ? nextTask : task))
}

export function filterTasks(
  tasks: Task[],
  filters: Partial<TaskFilters> = DEFAULT_FILTERS,
): Task[] {
  const normalizedFilters = { ...DEFAULT_FILTERS, ...filters }
  const query = normalizeText(normalizedFilters.query)

  return tasks.filter((task) => {
    const matchesStatus =
      normalizedFilters.status === 'all' ||
      task.status === normalizedFilters.status
    const matchesPriority =
      normalizedFilters.priority === 'all' ||
      task.priority === normalizedFilters.priority
    const matchesCategory =
      normalizedFilters.category === 'all' ||
      task.category === normalizedFilters.category
    const searchableText = normalizeText(
      `${task.title} ${task.description} ${task.category}`,
    )
    const matchesQuery = query.length === 0 || searchableText.includes(query)

    return (
      matchesStatus && matchesPriority && matchesCategory && matchesQuery
    )
  })
}

export function getTaskSummary(
  tasks: Task[],
  today = new Date(),
): TaskSummary {
  return tasks.reduce<TaskSummary>(
    (summary, task) => {
      const isCompleted = task.status === 'completed'
      const isOverdue = !isCompleted && isTaskOverdue(task, today)

      return {
        total: summary.total + 1,
        pending: summary.pending + (isCompleted ? 0 : 1),
        completed: summary.completed + (isCompleted ? 1 : 0),
        overdue: summary.overdue + (isOverdue ? 1 : 0),
        highPriority:
          summary.highPriority + (task.priority === 'high' ? 1 : 0),
      }
    },
    {
      total: 0,
      pending: 0,
      completed: 0,
      overdue: 0,
      highPriority: 0,
    },
  )
}

export function getTaskCategories(tasks: Task[]): string[] {
  return Array.from(new Set(tasks.map((task) => task.category))).sort((a, b) =>
    a.localeCompare(b, 'es'),
  )
}

export function isTaskOverdue(task: Task, today = new Date()): boolean {
  if (!task.dueDate) {
    return false
  }

  return normalizeDate(task.dueDate) < normalizeDate(today.toISOString())
}

function createTaskId(title: string, now: Date): string {
  const slug = normalizeText(title)
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
    .slice(0, 48)

  return `${slug || 'task'}-${now.getTime()}`
}

function normalizeText(value: string): string {
  return value
    .normalize('NFD')
    .replace(/\p{Diacritic}/gu, '')
    .toLowerCase()
    .trim()
}

function normalizeDate(value: string): string {
  return value.slice(0, 10)
}
