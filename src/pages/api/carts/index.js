import axios from '../../../utils/axios'
import nextConnect from 'next-connect';

// Create a Next.js API route using next-connect
const handler = nextConnect();

//Get a cart by ID
handler.get(async (req, res) => {
    try {
        const { data } = await axios.get(`/carts/${req.query.id}`)
        res.status(200).json({ carts: data });
    } catch (error) {
        console.error(error)
        res.status(500).json({ error: 'Internal server error' })
    }
});

//Create a cart
handler.post(async (req, res) => {
  try {
    const { data } = await axios.post('/carts', 
       req.body
    );
    res.status(201).json({ cart: data });
  } catch (error) {
    //console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

handler.all((req, res) => {
    res.status(405).json({ message: 'Method Not Allowed' });
});

export default handler;