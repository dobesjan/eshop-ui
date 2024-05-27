import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import categoryService from './api/categoryService';
import ProductList from './components/ProductList';
import ProductDetail from './components/ProductDetail';
import CategoryMenu from './components/Menu';
import Callback from './components/Callback';
import LoginPage from './components/LoginPage';
import { useAuth0 } from '@auth0/auth0-react';
import LoginButton from './components/LoginButton';
import LogoutButton from './components/LogoutButton';
import Auth0ProviderWithHistory from './components/auth0.jsx';

const App = () => {
  const [categories, setCategories] = useState([]);
  const { isAuthenticated, error } = useAuth0();
  
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

  useEffect(() => {
    if (error) {
      console.error('Authentication error:', error);
      // Handle the error, for example, by displaying an error message or redirecting the user
      // You can also show a notification to the user or redirect them to a login page
    }
  }, [error]);

  return (
    <Router>
      <Auth0ProviderWithHistory>
          {isAuthenticated ? <LogoutButton /> : <LoginButton />}
          <CategoryMenu categories={categories} />
          <Routes>
            <Route path="/callback/:provider" element={<Callback />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/" element={<ProductList />} />
            <Route path="/category/:categoryId" element={<ProductList />} />
            <Route path="/product/:id" element={<ProductDetail />} />
          </Routes>
      </Auth0ProviderWithHistory>
    </Router>
  );
};

export default App;
