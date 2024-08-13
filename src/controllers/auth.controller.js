
import bcrypt from 'bcryptjs'
import User from '../models/user.model.js'
import { createAccessToken } from '../libs/jwt.js'

/** */
export async function login (req, res) {
  const { email, password } = req.body
  try {
    const userFound = await User.findOne({email})
    if (!userFound) throw new Error('User not found')
    
    const isMatch = await bcrypt.compare(password, userFound.password)
    if (!isMatch) throw new Error('Incorrect password')

    const token = await createAccessToken({ id: userFound._id })
    res.cookie('token', token)
    res.json({ 
      id: userFound._id,
      username: userFound.username,
      email: userFound.email,
      createdAt: userFound.createdAt, 
      updatedAt: userFound.updatedAt
    })

  } catch (e) {
    res.status(400).json({ error: [e.message] })
  }
}

export async function register (req, res) {
  const { email, password, username } = req.body
  try {

    const userFound = await User.findOne({email})
    if (userFound) throw new Error('The email is already in use')
    const passwordHash = await bcrypt.hash(password, 10)
    const newUser = new User({
      email, 
      username,
      password: passwordHash,
    })
    
    // Salvar en DB
    const userSaved = await newUser.save()

    const token = await createAccessToken({ id: userSaved._id })
    
    // Respuesta al Frontend
    res.cookie('token', token)
    res.json({
      id: userSaved._id,
      username: userSaved.username,
      email: userSaved.useremail, 
      createdAt: userSaved.createdAt, 
      updatedAt: userSaved.updatedAt
    })

  } catch (e) {
    res.status(500).json({ error: [e.message] })
  }
}

export async function logout (req, res) {
  console.log('logout backend')
  res.cookie('token', '', { expires: new Date(0) })
  return res.sendStatus(200)
}

export async function profile (req, res) {
  const userFound = await User.findById(req.user.id)
  if (!userFound) return res.status(400).json({ error: 'User not found' })
  return res.json({
    id: userFound._id,
    username: userFound.username,
    email: userFound.email, 
    createdAt: userFound.createdAt, 
    updatedAt: userFound.updatedAt
  })
}

export async function verifyToken (req, res) {
  const userFound = await User.findById(req.user.id)
  if (!userFound) return res.status(400).json({ error: 'User not found' })
  return res.json({
    id: userFound._id,
    username: userFound.username,
    email: userFound.email, 
    createdAt: userFound.createdAt, 
    updatedAt: userFound.updatedAt
  })
}