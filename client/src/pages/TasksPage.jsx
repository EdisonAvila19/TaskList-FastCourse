import { useEffect } from 'react'
import { useTasks } from '../context/TasksContext'
import TaskCard from '../components/TaskCard'

export default function TasksPage() {
  const { tasks, getTasks } = useTasks()

  const doHaveTasks = tasks.length >= 1
  
  useEffect(() => {
    getTasks()
  }, [])

  return (
    <>
      {
        doHaveTasks
          ? (<div className='grid md:grid-cols-2 lg:grid-cols-3 gap-2'>
            {
              tasks.map((task) => <TaskCard key={task._id} task={task} />)
            }
          </div>)
          : (<h1>No tasks</h1>)
      }
    </>
  )
}
