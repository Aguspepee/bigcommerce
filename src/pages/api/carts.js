import axios from '../../utils/axios'
import nextConnect from 'next-connect';

// Create a Next.js API route using next-connect
const handler = nextConnect();

// Route handlers
handler.get(async (req, res) => {
  console.log(req.params)
    try {
        const { data } = await axios.get(`/carts/${req.query.id}`)
        res.status(200).json({ carts: data });
    } catch (error) {
        console.error(error)
        res.status(500).json({ error: 'Internal server error' })
    }
});

handler.post(async (req, res) => {
  try {
    const { line_item, custom_items, gift_certificates } = req.body;
    const { data } = await axios.post('/carts', {
      line_items: line_item,
      custom_items,
      gift_certificates,
    });

    res.status(201).json({ cart: data });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

handler.all((req, res) => {
    res.status(405).json({ message: 'Method Not Allowed' });
});

export default handler;