import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Auth0Provider, useAuth0 } from '@auth0/auth0-react';

const Auth0ProviderWithHistory = ({ children }) => {
  const navigate = useNavigate();
  const domain = 'dev-c2revach3lofx66y.us.auth0.com';
  const clientId = 'NLvz2lNLMmL00WNsLcSNMFZWX4sCmuQW';

  const onRedirectCallback = (appState) => {
    navigate(appState?.returnTo || window.location.pathname);
  };

  return (
    <Auth0Provider
      domain={domain}
      clientId={clientId}
      redirectUri={window.location.origin}
      onRedirectCallback={onRedirectCallback}
    >
      <AuthWrapper>{children}</AuthWrapper>
    </Auth0Provider>
  );
};

const AuthWrapper = ({ children }) => {
  const { isAuthenticated, getAccessTokenSilently, error } = useAuth0();

  useEffect(() => {
    const handleLoginSuccess = async () => {
      if (isAuthenticated) {
        try {
          const accessToken = await getAccessTokenSilently();
          if (accessToken) {
            localStorage.setItem('jwtToken', accessToken);
          }
          // Additional actions on successful login can be added here
        } catch (err) {
          console.error('Failed to get access token:', err);
        }
      }
    };

    handleLoginSuccess();
  }, [isAuthenticated, getAccessTokenSilently]);

  useEffect(() => {
    if (error) {
      console.error('Authentication error:', error);
    }
  }, [error]);

  return <>{children}</>;
};

export default Auth0ProviderWithHistory;
