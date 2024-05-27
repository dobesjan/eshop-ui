import apiClient from './apiClient';

const categoryService = {
  getCategories() {
    return apiClient.get('/Category/list');
  }
};

export default categoryService;