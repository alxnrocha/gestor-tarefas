import { useState } from 'react'

import { AppHeader } from './components/AppHeader'
import { DashboardLayout } from './components/DashboardLayout'
import { HeroSection } from './components/HeroSection'
import { demoTasks } from './data/demoTasks'
import type { Task, TaskInput } from './types/task'
import { createTask, getTaskSummary, replaceTask } from './utils/taskUtils'

function App() {
  const [tasks, setTasks] = useState<Task[]>(demoTasks)
  const [editingTaskId, setEditingTaskId] = useState<string | null>(null)
  const summary = getTaskSummary(tasks)
  const editingTask =
    tasks.find((task) => task.id === editingTaskId) ?? null

  function handleCreateTask(input: TaskInput) {
    setTasks((currentTasks) => [createTask(input), ...currentTasks])
  }

  function handleUpdateTask(taskId: string, input: TaskInput) {
    setTasks((currentTasks) => {
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

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <AppHeader />
      <main>
        <HeroSection summary={summary} />
        <DashboardLayout
          editingTask={editingTask}
          onCancelEdit={() => setEditingTaskId(null)}
          onCreateTask={handleCreateTask}
          onEditTask={setEditingTaskId}
          onUpdateTask={handleUpdateTask}
          summary={summary}
          tasks={tasks}
        />
      </main>
    </div>
  )
}

export default App
