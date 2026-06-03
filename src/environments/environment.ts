const isLocalhost = typeof window !== 'undefined' && 
  (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1');

export const environment = {
  production: !isLocalhost,
  apiUrl: isLocalhost ? 'http://localhost:8000/api' : 'https://abroado.in/api',
  chatApiUrl: isLocalhost ? 'http://localhost:8000/api/chat' : 'https://abroado.in/api/chat',
  analyticsApiUrl: isLocalhost ? 'http://localhost:8000/api/analytics' : 'https://abroado.in/api/analytics'
};
