import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './global.css';
import './globalComponents.css';
import './i18n.ts';
import router from './router.tsx'
import { RouterProvider } from 'react-router-dom';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
