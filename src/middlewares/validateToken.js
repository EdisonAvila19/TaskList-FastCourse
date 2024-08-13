import jwt from 'jsonwebtoken'
import 'dotenv/config'

export function authRequired (req, res, next) {
  const { token } = req.cookies
  if(!token) return res.status(401).json({ error: 'No token, authorization denied' })

  jwt.verify(token, process.env.TOKENKEY, (err, decoded) => {
    if (err) return res.status(403).json({ error: 'Invalid token' })
    req.user = decoded
    next()
  })
  
}