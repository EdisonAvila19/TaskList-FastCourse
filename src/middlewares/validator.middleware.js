
export function validateSchema (schema) {
  return (req, res, next) => {
    try {
      schema.parse(req.body)
      next()
    } catch (e) {
      return res.status(400).json({ error: e.issues.map( e => e.message) })
    }
  }
}