import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import categoryService from './api/categoryService';
import ProductList from './components/ProductList';
import ProductDetail from './components/ProductDetail';
import CategoryMenu from './components/Menu';
import Callback from './components/Callback';
import LoginPage from './components/LoginPage';
import AuthenticationProvider from './components/Authentication';

const App = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await categoryService.getCategories();
        setCategories(response.data.data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []);

  return (
    <AuthenticationProvider>
      <Router>
        <CategoryMenu categories={categories} />
        <Routes>
          <Route path="/callback/:provider" element={<Callback />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/" element={<ProductList />} />
          <Route path="/category/:categoryId" element={<ProductList />} />
          <Route path="/product/:id" element={<ProductDetail />} />
        </Routes>
      </Router>
    </AuthenticationProvider>
  );
};

export default App;
