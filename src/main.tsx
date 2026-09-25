import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import AdminPage from './AdminPage.tsx';
import './index.css';

// Simple path-based routing: visiting /admin shows the password-protected
// dashboard instead of the main storefront. No router library needed since
// this is the only extra "page" in the app.
const isAdminRoute = window.location.pathname.startsWith('/admin');

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {isAdminRoute ? <AdminPage /> : <App />}
  </StrictMode>,
);
