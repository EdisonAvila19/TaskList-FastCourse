import Task from '../models/task.model.js'

export async function getTasks (req, res) {
  console.log(req.user)
  const tasks = await Task.find({ user: req.user.id })
  res.json(tasks)
}

export async function getTask (req, res) {
  try {
    const task = await Task.findById(req.params.id).find({ user: req.user.id }).populate('user')
    if (!task || task.length === 0 ) throw new Error('Task no found')
    
    res.json(task)
  } catch (error) {
    return res.status(404).json({ error: error.message })
  }
}

export async function createTask (req, res) {
  const { title, description, date } = req.body
  const newTask = new Task ({
    title,
    description,
    date,
    user: req.user.id
  })
  const taskSaved = await newTask.save()
  res.json(taskSaved)
}

export async function updateTask (req, res) {
  const task = await Task.findOneAndUpdate({ _id: req.params.id, user: req.user.id }, req.body, { new: true })
  if (!task) return res.status(404).json({ error: 'Task no found' })
  res.json(task)
}

export async function deleteTask (req, res) {
  const task = await Task.findOneAndDelete({_id: req.params.id, user: req.user.id})
  if (!task) return res.status(404).json({ error: 'Task no found' })

  res.sendStatus(204)
}
