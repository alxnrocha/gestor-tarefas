import { useState } from 'react'

import { AppHeader } from './components/AppHeader'
import { DashboardLayout } from './components/DashboardLayout'
import { HeroSection } from './components/HeroSection'
import { demoTasks } from './data/demoTasks'
import type { Task, TaskFilters, TaskInput } from './types/task'
import {
  createTask,
  filterTasks,
  getTaskCategories,
  getTaskSummary,
  removeTask,
  replaceTask,
  toggleTaskStatus,
} from './utils/taskUtils'
import { loadStoredTasks, saveStoredTasks } from './utils/taskStorage'

const initialFilters: TaskFilters = {
  status: 'all',
  priority: 'all',
  category: 'all',
  query: '',
}

function App() {
  const [tasks, setTasks] = useState<Task[]>(() => loadStoredTasks(demoTasks))
  const [editingTaskId, setEditingTaskId] = useState<string | null>(null)
  const [filters, setFilters] = useState<TaskFilters>(initialFilters)
  const summary = getTaskSummary(tasks)
  const visibleTasks = filterTasks(tasks, filters)
  const categories = getTaskCategories(tasks)
  const editingTask =
    tasks.find((task) => task.id === editingTaskId) ?? null

  function handleCreateTask(input: TaskInput) {
    updateTasks((currentTasks) => [createTask(input), ...currentTasks])
  }

  function handleUpdateTask(taskId: string, input: TaskInput) {
    updateTasks((currentTasks) => {
      const currentTask = currentTasks.find((task) => task.id === taskId)

      if (!currentTask) {
        return currentTasks
      }

      return replaceTask(currentTasks, {
        ...currentTask,
        ...input,
        title: input.title.trim(),
        description: input.description.trim(),
        category: input.category.trim(),
        updatedAt: new Date().toISOString(),
      })
    })
    setEditingTaskId(null)
  }

  function handleToggleTask(taskId: string) {
    updateTasks((currentTasks) => {
      const currentTask = currentTasks.find((task) => task.id === taskId)

      if (!currentTask) {
        return currentTasks
      }

      return replaceTask(currentTasks, toggleTaskStatus(currentTask))
    })
  }

  function handleDeleteTask(taskId: string) {
    updateTasks((currentTasks) => removeTask(currentTasks, taskId))

    if (editingTaskId === taskId) {
      setEditingTaskId(null)
    }
  }

  function updateTasks(getNextTasks: (currentTasks: Task[]) => Task[]) {
    setTasks((currentTasks) => {
      const nextTasks = getNextTasks(currentTasks)

      saveStoredTasks(nextTasks)

      return nextTasks
    })
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <AppHeader />
      <main id="contenido" tabIndex={-1}>
        <HeroSection summary={summary} />
        <DashboardLayout
          editingTask={editingTask}
          onCancelEdit={() => setEditingTaskId(null)}
          onCreateTask={handleCreateTask}
          onDeleteTask={handleDeleteTask}
          onEditTask={setEditingTaskId}
          onFiltersChange={setFilters}
          onToggleTask={handleToggleTask}
          onUpdateTask={handleUpdateTask}
          taskCategories={categories}
          taskFilters={filters}
          summary={summary}
          tasks={visibleTasks}
          totalTaskCount={tasks.length}
        />
      </main>
    </div>
  )
}

export default App
