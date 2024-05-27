import { useNavigate } from 'react-router-dom';
import { Auth0Provider } from '@auth0/auth0-react';

const Auth0ProviderWithHistory = ({ children }) => {
  const navigate = useNavigate();
  //const domain = process.env.REACT_APP_AUTH0_DOMAIN || 'REACT_APP_AUTH0_DOMAIN';
  //const clientId = process.env.REACT_APP_AUTH0_CLIENT_ID || 'REACT_APP_AUTH0_DOMAIN';
  const domain = 'dev-c2revach3lofx66y.us.auth0.com';
  const clientId = 'NLvz2lNLMmL00WNsLcSNMFZWX4sCmuQW';

  const onRedirectCallback = (appState) => {
    navigate(appState?.returnTo || window.location.pathname);
  };

  const onLoginSuccess = (loginRedirectResult) => {
    const accessToken = loginRedirectResult?.accessToken;
    if (accessToken) {
      localStorage.setItem('jwtToken', accessToken);
    }
    onRedirectCallback(loginRedirectResult.appState);
  };

  const onLoginFail = (error) => {
    // Handle authentication failure here
    console.error('Authentication failed:', error);
    // Redirect or perform other actions as needed
  };

  return (
    <Auth0Provider
      domain={domain}
      clientId={clientId}
      redirectUri={"http://localhost:5173"}
      onRedirectCallback={onLoginSuccess}
      onError={onLoginFail}
    >
      {children}
    </Auth0Provider>
  );
};

export default Auth0ProviderWithHistory;
