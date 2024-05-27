import { useEffect, useState, createContext, useContext } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import providers from './api/oidc-providers';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

const AuthenticationProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [provider, setProvider] = useState(null);
  const location = useLocation();
  const history = useHistory();

  useEffect(() => {
    const query = new URLSearchParams(location.search);
    const selectedProvider = query.get('provider');
    if (selectedProvider && providers[selectedProvider]) {
      setProvider(providers[selectedProvider]);
      providers[selectedProvider].signinRedirect();
    }
  }, [location]);

  useEffect(() => {
    if (provider) {
      provider.getUser().then(user => {
        if (user) {
          setUser(user);
          localStorage.setItem('jwtToken', user.access_token);
          console.log('User logged in', user);
        } else {
          provider.signinRedirect();
        }
      });
    }
  }, [provider]);

  const login = (providerKey) => {
    history.push(`/?provider=${providerKey}`);
  };

  const logout = () => {
    if (provider) {
      provider.signoutRedirect();
      setUser(null);
      localStorage.removeItem('jwtToken');
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthenticationProvider;
