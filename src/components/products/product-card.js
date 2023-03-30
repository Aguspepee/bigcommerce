import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import { createCarts } from '@/services/carts-service';
import { useState } from 'react';

export default function ProductCard({ product, updateCart, cart, customerID}) {
  const { name, price, condition } = product
  const [ quantity, setQuantity] = useState()
  const cleanedName = name.replace('[Sample] ', '');
  const formattedPrice = price.toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
  });


  const addToCart = async() =>{
    try {
      const res = await createCarts({customer_id:customerID, product:product})
      updateCart(res.data?.cart)
     
    } catch (error) {
      console.log(error)
    }
   
  }

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
        <Button variant="contained" onClick={addToCart} startIcon={<AddShoppingCartIcon />} color="primary">
          Add to Cart
        </Button>
      </CardActions>
    </Card>
  );
}