import { useAuth } from './Authentication';

const LoginPage = () => {
  const { login } = useAuth();

  return (
    <div>
      <h1>Login Page</h1>
      <button onClick={() => login('provider1')}>Login with Provider 1</button>
      <button onClick={() => login('provider2')}>Login with Provider 2</button>
    </div>
  );
};

export default LoginPage;
