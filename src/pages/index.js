import MenuBar from '@/components/layout/menu-bar';
import ProductCard from '@/components/products/product-card';
import ProductPagination from '@/components/products/products-pagination';
import { Container, Grid } from '@mui/material';
import Head from 'next/head';
import { useEffect, useState } from 'react';
import { getProducts } from '../services/products-service';

export default function Home() {
  const [customerID, setCustomerID] = useState(1) //Use id=1, then 
  const [cartID, setCartID] = useState(null)
  const [cart, setCart] = useState({})
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(9);
  const [pagination, setPagination] = useState({})

  const handlePageChange = (event) => {
    setPage(event)
  }
  const updateCartID = (id) => {
    setCartID(id)
    localStorage.setItem('cartID', id)

  }

  const updateCart = (cart) => {
    setCart(cart)
    localStorage.setItem('cartID', cart.data.id)

  }

  //checks for the existence of a cartId in localStorage and sets the state
  useEffect(() => {
    const cartIdFromLocalStorage = localStorage.getItem('cartID');
    if (cartIdFromLocalStorage) {
      setCartID(cartIdFromLocalStorage);
    }
  }, []);

  useEffect(() => {
    const getData = async () => {
      const res = await getProducts({ page, limit })
      setPagination(res.data?.meta.pagination)
      setProducts(res.data?.data)
    }
    getData()
  }, [page, limit])
  console.log(cart)

  return (
    <>
      <Head>
        <title>Ignite eCommerce</title>
        <meta name="description" content="In" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <MenuBar cart={cart}/>
      <Container style={{ paddingTop: '80px', alignItems: 'center' }}>
        <Grid spacing={3} container>
          {
            products.map((product, index) => {
              return (
                <Grid item key={index}
                  xl={4}
                  lg={4}
                  md={6}
                  xs={12}
                >
                  <ProductCard product={product} updateCart={updateCart} cart={cart} customerID={customerID}/>
                </Grid>
              )
            })
          }
        </Grid>
        <ProductPagination page={page} handlePageChange={handlePageChange} pagination={pagination} />
      </Container>
    </>
  )
}
