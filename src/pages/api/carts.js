import axios from '../../utils/axios'
import { withMiddleware } from '../../utils/middleware'

const createCart = async (req, res) => {
  try {
    const { data } = await axios.post('/carts', {})
    res.status(200).json(data)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Internal server error' })
  }
}

const getCartById = async (req, res) => {
  const { id } = req.query

  try {
    const { data } = await axios.get(`/carts/${id}`)
    res.status(200).json(data)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Internal server error' })
  }
}

const handlers = {
  POST: createCart,
  GET: getCartById,
}

export default withMiddleware(handlers)