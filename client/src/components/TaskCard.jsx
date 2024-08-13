/* eslint-disable react/prop-types */

import { Link } from 'react-router-dom'
import { useTasks } from '../context/TasksContext'

export default function TaskCard({ task }) {
  const { deleteTask } = useTasks()
  const { _id:id, title, description, date } = task

  const isoDate = new Date(date)
  const day = String(isoDate.getDate()).padStart(2, '0')
  const month = String(isoDate.getMonth() + 1).padStart(2, '0')
  const year = isoDate.getFullYear()
  const formatedDate = `${day}/${month}/${year}`

  const handleDelete = () => {
    deleteTask(id)
  }

  return (
    <div className='bg-zinc-800 max-w-md w-full p-10 rounded-md'>
      <header className='flex justify-between'>
        <h1 className='text-2xl font-bold'>{title}</h1>
        <div className='flex gap-x-2 items-center'>
          <button 
            onClick={handleDelete}
            className='bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md'
          >delete</button>
          <Link 
            to={`/tasks/${id}`}
            className='bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md'
          >edit</Link>
        </div>
      </header>
      <p className='text-slate-300'>{description}</p>
      <p>{formatedDate}</p>
    </div>
  )
}
