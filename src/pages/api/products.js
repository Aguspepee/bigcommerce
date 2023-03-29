import axios from '../../utils/axios'
import { withMiddleware } from '../../utils/middleware'

const getAllProducts = async (req, res) => {
  try {
    const { data } = await axios.get('/catalog/products')
    res.status(200).json(data)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Internal server error' })
  }
}

const getProductById = async (req, res) => {
  const { id } = req.query

  try {
    const { data } = await axios.get(`/catalog/products/${id}`)
    res.status(200).json(data)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Internal server error' })
  }
}

const handlers = {
  GET: getAllProducts,
  GET: getProductById,
}

export default withMiddleware(handlers)