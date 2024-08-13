import mongoose from 'mongoose'

const taskSchemma = new mongoose.Schema({
  title: {
    type: String,
    require: true,
  },
  description: {
    type: String,
    require: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    require: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
}, {
  timestamps: true
})

export default mongoose.model('Task', taskSchemma)
