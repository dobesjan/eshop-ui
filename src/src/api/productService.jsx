import apiClient from './apiClient';

const productService = {
  getProducts(offset = 0, limit = 10, categoryId = 0) {
    return apiClient.get(`/Product/list?offset=${offset}&limit=${limit}&categoryId=${categoryId}`);
  },
  getProduct(id) {
    return apiClient.get(`/Product/get?id=${id}`);
  },
  getProductsCount(categoryId = 0) {
    return apiClient.get(`/Product/getProductsCount?categoryId=${categoryId}`);
  }
};

export default productService;