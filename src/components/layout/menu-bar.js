import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Badge from '@mui/material/Badge';
import IconButton from '@mui/material/IconButton';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { Box, Button, Divider, Drawer, List, ListItem } from '@mui/material';
import ProductListItem from '../products/product-listitem';

export default function MenuBar({ cart }) {
  const cartItems = cart?.data?.line_items?.physical_items
  const cartItemCount = cartItems?.reduce((count, item) => count + item.quantity, 0);
  const [drawerOpen, setDrawerOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setDrawerOpen(true);
  };

  const handleDrawerClose = () => {
    setDrawerOpen(false);
  };
  return (
    <>
    <AppBar>
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Ignite Global Store
        </Typography>
        <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              onClick={handleDrawerOpen}
            >
              <ShoppingCartIcon />
              <Badge badgeContent={ cartItemCount} color="error">
              </Badge>
            </IconButton>
      </Toolbar>
    </AppBar>
    <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={handleDrawerClose}
      >
        <Box
          sx={{ width: 500 }}
          role="presentation"
        >
          <List>
            {cartItems?.map((product) => (
              <ListItem key={product.id} sx={{ padding: 0 }}>
               <ProductListItem product={product}/>
              </ListItem>
            ))}
          </List>
          <Divider />
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', padding: '10px' }}>
            <Button variant="contained" color="primary">
              Checkout
            </Button>
          </Box>
        </Box>
      </Drawer>
    </>
  );
}