import { useNavigate } from 'react-router-dom';
import { Auth0Provider, useAuth0 } from '@auth0/auth0-react';
import { useEffect } from 'react';

const Auth0ProviderWithNavigate = ({ children }) => {
  const navigate = useNavigate();

  const domain = 'dev-c2revach3lofx66y.us.auth0.com';
  const clientId = 'NLvz2lNLMmL00WNsLcSNMFZWX4sCmuQW';
  const audience = 'https://eshop-api';

  const onRedirectCallback = (appState) => {
    navigate(appState?.returnTo || window.location.pathname);
  };

  return (
    <Auth0Provider
      domain={domain}
      clientId={clientId}
      redirectUri={window.location.origin}
      onRedirectCallback={onRedirectCallback}
      audience={audience}
    >
      <AuthHandler />
      {children}
    </Auth0Provider>
  );
};

const AuthHandler = () => {
  const { isAuthenticated, getAccessTokenSilently } = useAuth0();

  useEffect(() => {
    const storeToken = async () => {
      if (isAuthenticated) {
        try {
          const token = await getAccessTokenSilently();
          localStorage.setItem('jwtToken', token);
        } catch (error) {
          console.error('Failed to get access token:', error);
        }
      }
    };

    storeToken();
  }, [isAuthenticated, getAccessTokenSilently]);

  return null;
};

export default Auth0ProviderWithNavigate;
