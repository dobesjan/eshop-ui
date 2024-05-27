import { useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import providers from './oidc-providers';

const Callback = () => {
  const history = useHistory();
  const { provider } = useParams();

  useEffect(() => {
    if (provider && providers[provider]) {
      providers[provider].signinRedirectCallback().then(() => {
        history.push('/');
      }).catch(err => {
        console.error(err);
      });
    }
  }, [provider, history]);

  return <div>Loading...</div>;
};

export default Callback;
