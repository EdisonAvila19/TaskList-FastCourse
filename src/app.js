import express from 'express'
import morgan from 'morgan'
import cookieParser from 'cookie-parser'
import cors from 'cors'

import authRoutes from './routes/auth.routes.js'
import taskRoutes from './routes/tasks.routes.js'

const app = express()

const allowedOrigins = [
  'http://localhost:5173'
]

const options = {
  origin: allowedOrigins,
  credentials: true,
}

app.use(cors(options))
app.use(morgan('dev'))
app.use(express.json())
app.use(cookieParser())

app.use('/api', authRoutes)
app.use('/api/tasks', taskRoutes)

export default app
