import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'https://localhost:7199/api/Product',
  headers: {
    'Content-Type': 'application/json'
  }
});

export default {
  getProducts(offset = 0, limit = 10, categoryId = 0) {
    return apiClient.get(`/list?offset=${offset}&limit=${limit}&categoryId=${categoryId}`);
  },
  getProduct(id) {
    return apiClient.get(`/get?id=${id}`);
  },
  getProductsCount(categoryId = 0) {
    return apiClient.get(`/getProductsCount?categoryId=${categoryId}`);
  }
};
