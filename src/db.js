import mongoose from 'mongoose'
import 'dotenv/config'

export async function connectDB () {
  try {
    await mongoose.connect(process.env.DBURL)
    console.log('>>> DB is connected')
  } catch(e) {
    console.error(e)
  }
}
