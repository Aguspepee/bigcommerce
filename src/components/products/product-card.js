import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import { addItemToCarts, createCarts } from '@/services/carts-service';
import { useState } from 'react';

export default function ProductCard({ product, updateCart, cart, customerID }) {
  const { name, price, condition } = product
  const [quantity, setQuantity] = useState()
  let lineItems = cart?.data?.line_items?.physical_items
  const cleanedName = name.replace('[Sample] ', '');
  const formattedPrice = price.toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
  });

  const addToCart = async (item) => {
    try {
      if (cart?.data?.id) {
        //If the cart exists it needs to sum one to the quantity of the product is exist or to add a new product
        let itemIndex = lineItems?.findIndex((lineItem) => lineItem.product_id === item?.id);
        if (itemIndex === -1) {
          lineItems = [...lineItems, { ...item, quantity: 1 }];
        } else {
          const itemToUpdate = lineItems[itemIndex];
          lineItems = [
            ...lineItems.slice(0, itemIndex),
            { ...itemToUpdate, quantity: itemToUpdate.quantity + 1 },
            ...lineItems.slice(itemIndex + 1),
          ];
        }
        //Some bug here
        //const res = await addItemToCarts({ line_items: lineItems, id: cart?.data?.id })
        //updateCart({ ...cart, data: { ...cart.data, line_items: { physical_items: lineItems } } });
      } else {
        const res = await createCarts({ customer_id: customerID, product: product })
        console.log(res.data?.cart)
        updateCart(res.data?.cart)
      }
    } catch (error) {
      console.log(error)
    }
  }
console.log(cart?.data)
  return (
    <Card sx={{ minWidth: 275, height: '100%' }} >
      <CardContent>
        <Typography variant="h5" component="div">
          {cleanedName}
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          {condition}
        </Typography>
        <Typography variant="body2">
          {formattedPrice}
        </Typography>
      </CardContent>
      <CardActions sx={{ position: 'bottom' }}>
        <Button variant="contained" onClick={() => addToCart(product)} startIcon={<AddShoppingCartIcon />} color="primary">
          Add to Cart
        </Button>
      </CardActions>
    </Card>
  );
}