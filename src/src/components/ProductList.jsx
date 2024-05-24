import { useEffect, useState } from 'react';
import productService from '../api/productService';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [offset, setOffset] = useState(0);
  const [limit] = useState(10); // You can make this dynamic if needed
  const [totalProducts, setTotalProducts] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const response = await productService.getProducts((currentPage - 1) * limit, limit);
        setProducts(response.data.data);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchProducts();
  }, [currentPage, limit]);

  useEffect(() => {
    const fetchTotalProducts = async () => {
      try {
        const response = await productService.getProductsCount();
        setTotalProducts(response.data.data.count);
      } catch (error) {
        setError(error);
      }
    };

    fetchTotalProducts();
  }, []);

  const totalPages = Math.ceil(totalProducts / limit);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const renderPageNumbers = () => {
    const pageNumbers = [];
    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      pageNumbers.push(1);
      let startPage = Math.max(currentPage - 2, 2);
      let endPage = Math.min(currentPage + 2, totalPages - 1);

      if (startPage > 2) {
        pageNumbers.push('...');
      }

      for (let i = startPage; i <= endPage; i++) {
        pageNumbers.push(i);
      }

      if (endPage < totalPages - 1) {
        pageNumbers.push('...');
      }

      pageNumbers.push(totalPages);
    }
    return pageNumbers;
  };

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
      <div>
        {renderPageNumbers().map((pageNumber, index) => (
          <button
            key={index}
            onClick={() => typeof pageNumber === 'number' && handlePageChange(pageNumber)}
            disabled={currentPage === pageNumber}
            style={{ margin: '0 5px', cursor: pageNumber === '...' ? 'default' : 'pointer' }}
          >
            {pageNumber}
          </button>
        ))}
      </div>
      <p>Showing {offset + 1} to {Math.min(offset + limit, totalProducts)} of {totalProducts} products</p>
    </div>
  );
};

export default ProductList;
