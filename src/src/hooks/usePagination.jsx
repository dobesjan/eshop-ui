import { useEffect, useState, useCallback } from 'react';

const usePagination = (fetchFunction, initialLimit = 10) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [totalItems, setTotalItems] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(initialLimit);

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetchFunction((currentPage - 1) * limit, limit);
      setData(response.data.data);
      setTotalItems(response.data.totalCount || response.data.data.length);
      setLoading(false);
    } catch (error) {
      setError(error);
      setLoading(false);
    }
  }, [currentPage, limit, fetchFunction]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const totalPages = Math.ceil(totalItems / limit);

  return {
    data,
    loading,
    error,
    currentPage,
    totalPages,
    setCurrentPage,
    setLimit
  };
};

export default usePagination;
