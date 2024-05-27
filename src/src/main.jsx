import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App.jsx'
import Auth0ProviderWithHistory from './components/auth0.jsx';
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <App />
)
