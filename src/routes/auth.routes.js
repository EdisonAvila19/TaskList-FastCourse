import { Router } from 'express'
import { login, register, logout, profile, verifyToken } from '../controllers/auth.controller.js'
import { authRequired } from '../middlewares/validateToken.js'
import { validateSchema } from '../middlewares/validator.middleware.js'
import { registerSchema, loginSchema } from '../schemas/auth.schema.js'

const router = Router()

router
  .post('/register', validateSchema(registerSchema), register)
  .post('/login', validateSchema(loginSchema), login)
  .post('/logout', logout)
  .get('/verify', authRequired, verifyToken)
  .get('/profile', authRequired, profile)

export default router
