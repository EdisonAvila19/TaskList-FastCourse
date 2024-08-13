
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate, useParams } from 'react-router-dom'
import { useTasks } from '../context/TasksContext'

export default function TaskFormPage() {
  const { register, handleSubmit, setValue } = useForm()
  const { createTask, getTask, updateTask } = useTasks()
  const navigate = useNavigate()
  const params = useParams()

  const onSubmit = handleSubmit((data) => {
    console.log(data)
    const taskData = {
      ...data,
      date: data.date ? new Date(`${data.date}T00:00:00`).toISOString() : new Date().toISOString()
    }
    
    if(params.id){
      updateTask(params.id, taskData)
    } else {
      createTask(taskData)
    }
    navigate('/tasks')
  })

  useEffect(() => {
    if(params.id) {
      // const currentTask = tasks.find(task => task.id === params.id)
      const loadTask = async () => {
        try {
          const task = await getTask(params.id)
          if (task){
            const { title, description, date } = task

            const isoDate = new Date(date)
            const day = String(isoDate.getDate()).padStart(2, '0');
            const month = String(isoDate.getMonth() + 1).padStart(2, '0'); // Los meses en JS son 0-indexed
            const year = isoDate.getFullYear();
            const formatedDate = `${year}-${month}-${day}`

            setValue('title', title)
            setValue('description', description)
            setValue('date', formatedDate)
          }
        } catch (error) {
          console.error(error)          
        }
      }
      loadTask()
    }
  }, [])

  return (
    <div className='flex items-center justify-center h-[calc(100vh-100px)]'>
      <div className='bg-zinc-800 max-w-md p-10 rounded-md'>
        <h1 className='text-2xl font-bold mb-5'>Add a new task</h1>

        <form className='w-96 mb-5' onSubmit={onSubmit}>
          <input type='text' placeholder='Title' className='w-full bg-zinc-700 text-white p-2 my-2 rounded-md'
            {...register('title')}
            autoFocus
          />
          <textarea rows='3' placeholder='Description' className='w-full bg-zinc-700 text-white p-2 my-2 rounded-md'
            {...register('description')}
          ></textarea>
          <input type="date" className='w-full bg-zinc-700 text-white p-2 my-2 rounded-md'
            {...register('date')}
          />
          <button className='py-2 px-4 border rounded-lg mt-3'>
            Add task
          </button>
        </form>
      </div>
    </div>
  )
}
