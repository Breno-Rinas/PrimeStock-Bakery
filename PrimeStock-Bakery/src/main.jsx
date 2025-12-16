import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
const _originalFetch = window.fetch;
window.fetch = (input, init = {}) => {
  try {
    const url = typeof input === 'string' ? input : input.url;
    if (url && url.startsWith('http://localhost:3002')) {
      const token = localStorage.getItem('token');
      init = init || {};
      init.headers = Object.assign({}, init.headers || {}, token ? { Authorization: `Bearer ${token}` } : {});
    }
  } catch (e) {
  }
  return _originalFetch(input, init);
};

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
