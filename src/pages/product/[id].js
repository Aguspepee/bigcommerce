import axios from '../../utils/axios';
import { useRouter } from 'next/router';

function ProductDetailPage({ product }) {
  const router = useRouter();

  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>{product.name}</h1>
      <p>{product.description}</p>
      <p>Price: ${product.price}</p>
      {/* other product details */}
    </div>
  );
}

export async function getStaticPaths() {
  // Fetch the list of product IDs from the API
  const { data } = await axios.get('/products');

  // Map the product IDs to the `params` object required by Next.js
  const paths = data.map((product) => ({ params: { id: product.id.toString() } }));

  // Return the list of `params` objects to Next.js
  return { paths, fallback: true };
}

export async function getStaticProps({ params }) {
  // Fetch the product data from the API using the product ID in `params`
  const { data } = await axios.get(`/products/${params.id}`);

  // Return the product data as props to the `ProductDetailPage` component
  return { props: { product: data } };
}

export default ProductDetailPage;