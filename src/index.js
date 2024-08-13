import app from './app.js'
import { connectDB } from './db.js'

import 'dotenv/config'

connectDB()

const PORT = process.env.PORT || 3001

app.listen(PORT, () =>  {
  console.log(`Escuchando en el puerto ${PORT}`);
})
