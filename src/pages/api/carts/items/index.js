import axios from '../../../../utils/axios'
import nextConnect from 'next-connect';

// Create a Next.js API route using next-connect
const handler = nextConnect();

//Add Cart Line Items
handler.post(async (req, res) => {
  console.log(req.body)
  try {
    const { data } = await axios.post(`/carts/${req.query.id}/items`, 
       {line_items:req.body.line_items}
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

//add enpoints to work with the items
export default handler;
