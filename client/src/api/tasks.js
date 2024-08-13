
export async function getTasksRequest () {
  return await fetch(`${import.meta.env.VITE_API}/tasks`, {
    credentials: 'include',
  })
}

export async function getTaskRequest (id) {
  return await fetch(`${import.meta.env.VITE_API}/tasks/${id}`, {
    credentials: 'include',
  })
}

export async function createTaskRequest (task) {
  return await fetch(`${import.meta.env.VITE_API}/tasks`, {
    method: "POST",
    headers: {
      'Content-Type': 'application/json'
    },
    credentials: 'include',
    body:  JSON.stringify(task)
  })
}

export async function updateTaskRequest (id, task) {
  return await fetch(`${import.meta.env.VITE_API}/tasks/${id}`, {
    method: "PUT",
    headers: {
      'Content-Type': 'application/json'
    },
    credentials: 'include',
    body:  JSON.stringify(task)
  })
}

export async function deleteTaskRequest (id) {
  return await fetch(`${import.meta.env.VITE_API}/tasks/${id}`, {
    method: "DELETE",
    credentials: 'include'
  })
}