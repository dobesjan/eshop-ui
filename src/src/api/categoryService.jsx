import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'https://localhost:7199/api/Category',
  headers: {
    'Content-Type': 'application/json'
  }
});

export default {
  getCategories() {
    return apiClient.get(`/list`);
  }
};
