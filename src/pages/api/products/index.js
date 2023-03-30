import axios from '../../../utils/axios'
import nextConnect from 'next-connect';

// Create a Next.js API route using next-connect
const handler = nextConnect();

// Get Products
handler.get(async (req, res) => {
    try {
        const queryParams = new URLSearchParams(req.query);
        const { data } = await axios.get(`/catalog/products?${queryParams.toString()}`)
        res.status(200).json( data );
    } catch (error) {
        console.error(error)
        res.status(500).json({ error: 'Internal server error' })
    }
});

handler.all((req, res) => {
    res.status(405).json({ message: 'Method Not Allowed' });
});

export default handler;