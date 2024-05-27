import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import providers from '../api/oidc-providers';

const Callback = () => {
  const history = useNavigate();
  const { provider } = useParams();

  useEffect(() => {
    if (provider && providers[provider]) {
      providers[provider].signinRedirectCallback().then(() => {
        navigate('/');
      }).catch(err => {
        console.error(err);
      });
    }
  }, [provider, history]);

  return <div>Loading...</div>;
};

export default Callback;
