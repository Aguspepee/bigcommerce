import MenuBar from '@/components/layout/menu-bar';
import ProductCard from '@/components/products/product-card';
import ProductPagination from '@/components/products/products-pagination';
import { Container, Grid } from '@mui/material';
import Head from 'next/head';
import { useEffect, useState } from 'react';
import { getProducts } from '../services/products-service';

export default function Home() {
  const [customerID, setCustomerID] = useState(1) //This customer id may be obtained using authentication
  const [products, setProducts] = useState([]);

  //Cart state and update
  const [cart, setCart] = useState({})
  const updateCart = (cart) => {
    setCart(cart)
  }

  //Paggination options
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(9);
  const [pagination, setPagination] = useState({})

  const handlePageChange = (event) => {
    setPage(event)
  }

  useEffect(() => {
    const getData = async () => {
      const res = await getProducts({ page, limit })
      setPagination(res.data?.meta.pagination)
      setProducts(res.data?.data)
    }
    getData()
  }, [page, limit])

  return (
    <>
      <Head>
        <title>Ignite eCommerce</title>
        <meta name="description" content="In" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <MenuBar cart={cart} />
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
                  <ProductCard product={product} updateCart={updateCart} cart={cart} customerID={customerID} />
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
