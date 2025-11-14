import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './global.css';
import './globalComponents.css';
import router from './router.tsx'
import { RouterProvider } from 'react-router-dom';
import { TranslationProvider } from './contexts/TranslationContext.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <TranslationProvider>
      <RouterProvider router={router} />
    </TranslationProvider>
  </StrictMode>,
)
