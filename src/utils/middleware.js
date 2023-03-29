export const withMiddleware = (handlers) => async (req, res) => {
    const { method } = req
  
    if (!handlers[method]) {
      res.status(400).json({ error: `Method ${method} not supported` })
      return
    }
  
    try {
      await handlers[method](req, res)
    } catch (error) {
        console.error(error)
        res.status(500).json({ error: 'Internal server error' })
      }
    }