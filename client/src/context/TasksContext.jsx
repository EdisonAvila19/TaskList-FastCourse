/* eslint-disable react/prop-types */
import { createContext, useContext, useState } from 'react'
import { createTaskRequest, getTasksRequest, deleteTaskRequest, getTaskRequest, updateTaskRequest } from '../api/tasks'

const TaskContext = createContext();

export const useTasks = () => {
  const context = useContext(TaskContext)

  if (!context)
    throw new Error('useTasks must be used within an TaskProvider')

  return context
}

export function TaskProvider({ children }) {

  const [tasks, setTasks] = useState([])
  
  const getTask = async (id) => {
    try {
      const res = await getTaskRequest(id)
      if(res.status !== 200) throw res.error
      const task = await res.json()
      return task[0]
    } catch (error) {
      console.error(error)
      return false
    }
  }

  const getTasks = async () => {
    try {
      const res = await getTasksRequest()
      if (res.status !== 200) throw new Error('Failure request')
      const data = await res.json()
      setTasks(data)
    } catch (error) {
      console.error(error)
    }
  }

  const createTask = async (task) => {
    try {
      const res = await createTaskRequest(task)
      if (res.status !== 200) throw res.error
      const newTask = await res.json()
      setTasks([
        ...tasks,
        newTask
      ])
    } catch (error) {
      console.log(error)
    }
  }

  const deleteTask = async (id) => {
    try {
      const res = await deleteTaskRequest(id)
      if (res.status !== 204) throw res.error
      const newTasks = tasks.filter(task => task._id !== id)
      setTasks(newTasks)
    } catch (error) {
      console.error(error)
    }
  }

  const updateTask = async (id, task) => {
    try {
      const res = await updateTaskRequest(id, task)
      if (res.status !== 200) throw res.error
    } catch (error) {
      console.error(error)
    }

  }

  return (
    <TaskContext.Provider 
      value={{
        tasks,
        getTask,
        getTasks,
        createTask,
        deleteTask,
        updateTask
      }}
    >
      { children }
    </TaskContext.Provider>
  )
}
