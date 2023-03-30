import { useState } from 'react';
import {
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Typography,
  IconButton,
  TextField,
} from '@mui/material';
import { Add, Remove } from '@mui/icons-material';

const ProductListItem = ({ product, quantity, onChangeQuantity }) => {
  const [localQuantity, setLocalQuantity] = useState(product.quantity);
  const cleanedName = product.name?.replace('[Sample] ', '');

  const handleQuantityChange = (event) => {
    const newQuantity = parseInt(event.target.value);
    setLocalQuantity(newQuantity);
    onChangeQuantity(newQuantity);
  };

  return (
    <Card sx={{ display: 'flex', marginBottom: '1rem' }}>
      <CardMedia
        component="img"
        image={product.image_url}
        alt={cleanedName}
        sx={{ width: '25%', minWidth: '10rem', objectFit: 'contain' }}
      />
      <CardContent sx={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
        <Typography variant="h6" component="h2">
          {cleanedName}
        </Typography>
        <Typography variant="subtitle1" sx={{ color: 'text.secondary' }}>
          {product.price}
        </Typography>
        <CardActions sx={{ marginTop: 'auto', alignSelf: 'flex-end' }}>
          <IconButton
            size="small"
            color="primary"
            aria-label="remove one from quantity"
            onClick={() => {
              setLocalQuantity(Math.max(1, localQuantity - 1));
              onChangeQuantity(Math.max(1, localQuantity - 1));
            }}
          >
            <Remove />
          </IconButton>
          <TextField
          size='small'
            type="number"
            value={localQuantity}
            onChange={handleQuantityChange}
            sx={{ width: '4rem' }}
            inputProps={{ min: 1 }}
          />
          <IconButton
            size="small"
            color="primary"
            aria-label="add one to quantity"
            onClick={() => {
              setLocalQuantity(localQuantity + 1);
              onChangeQuantity(localQuantity + 1);
            }}
          >
            <Add />
          </IconButton>
        </CardActions>
      </CardContent>
    </Card>
  );
};

export default ProductListItem;