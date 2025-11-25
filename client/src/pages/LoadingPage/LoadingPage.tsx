import { useEffect, useState, type JSX } from 'react';
import stylesLoadingPage from './LoadingPage.module.css';
import { useTranslation } from 'react-i18next';

/**
 * Loading page component to be displayed during navigation loading states.
 * 
 * @returns {JSX.Element} The LoadingPage component to be used in the router, will be an outlet in the RootLayout component.
 */
const LoadingPage = (): JSX.Element => {
  const { t } = useTranslation();

  // State for animated dots and effect to update them:
  const [ dots, setDots ] = useState<string>('');
  useEffect(() => {
    const intervalId = setInterval(() => {
      setDots((prev) => (prev.length < 6 ? prev+' .' : ''));
    }, 200);
    return () => clearInterval(intervalId);
  }, []);


  return (
  <
  div className={`cardsContainer`}
  role='main'
  >
    <div className={`contentCard ${stylesLoadingPage.loadingCard}`} >

      <picture>
        <source srcSet="/Logo.webp" type="image/webp" />
        <img
        className={stylesLoadingPage.spinner} 
        src="/Logo.png"
        alt="Loading"
        aria-label="Loading"
        />
      </picture>

      <p
      className={stylesLoadingPage.loadingText}
      aria-hidden="true"
      >
        {t('common.loadingText')}{dots}
      </p>

    </div>
  </div>
  );
}

export default LoadingPage;