import { AppHeader } from './components/AppHeader'
import { DashboardLayout } from './components/DashboardLayout'
import { HeroSection } from './components/HeroSection'
import { demoTasks } from './data/demoTasks'
import { getTaskSummary } from './utils/taskUtils'

function App() {
  const summary = getTaskSummary(demoTasks)

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <AppHeader />
      <main>
        <HeroSection summary={summary} />
        <DashboardLayout summary={summary} tasks={demoTasks} />
      </main>
    </div>
  )
}

export default App
