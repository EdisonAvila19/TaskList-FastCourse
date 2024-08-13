import { Outlet } from 'react-router-dom'
import { TaskProvider } from './context/TasksContext'

export default function TasksRoute() {
  
  return (
    <TaskProvider>
      <Outlet />
    </TaskProvider>
  )
}