import { useCallback } from 'react';
import productService from '../api/productService';
import usePagination from '../hooks/usePagination';
import Pagination from './Pagination';

const ProductList = () => {
  const fetchProducts = useCallback(async (offset, limit) => {
    return productService.getProducts(offset, limit);
  }, []);

  const totalCount = useCallback(async () => {
    return productService.getProductsCount();
  }, []);

  const { data: products, loading, error, currentPage, totalPages, setCurrentPage } = usePagination(fetchProducts, totalCount);

  const handlePageChange = useCallback(pageNumber => {
    setCurrentPage(pageNumber);
  }, [setCurrentPage]);

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
      <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
    </div>
  );
};

export default ProductList;
