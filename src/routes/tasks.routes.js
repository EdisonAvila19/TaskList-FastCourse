import { Router } from 'express'
import { authRequired } from '../middlewares/validateToken.js'
import { getTask, getTasks, createTask, updateTask, deleteTask } from '../controllers/tasks.controller.js'
import { validateSchema } from '../middlewares/validator.middleware.js'
import { createTaskSchema } from '../schemas/task.schema.js'


const router = Router()

router
  .get('/', authRequired, getTasks)
  .get('/:id', authRequired, getTask)
  .post('/',authRequired, validateSchema(createTaskSchema), createTask)
  .put('/:id', authRequired, updateTask)
  .delete('/:id', authRequired, deleteTask)

export default router
