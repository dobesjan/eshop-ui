import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import productService from '../api/productService';

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    productService.getProduct(id)
      .then(response => {
        setProduct(response.data.data);
        setLoading(false);
      })
      .catch(error => {
        setError(error);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading product: {error.message}</p>;
  if (!product) return <p>Product not found</p>;

  return (
    <div>
      <h1>{product.name}</h1>
      <p>{product.isInStock ? 'Available' : 'Unavailable'}</p>
      <p>Price: {product.prices?.[0]?.Cost}</p>
    </div>
  );
};

export default ProductDetail;
