import { useEffect, useState } from 'react';
import productService from '../api/productService';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    productService.getProducts(0, 10)
      .then(response => {
        setProducts(response.data.data);
        setLoading(false);
      })
      .catch(error => {
        setError(error);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading products: {error.message}</p>;

  return (
    <div>
      <h1>Product List</h1>
      <ul>
        {products.map(product => (
          <li key={product.id}>
            {product.name} - {product.isInStock ? 'Available' : 'Unavailable'}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductList;
