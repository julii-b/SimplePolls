import { useEffect, useState } from 'react';
import stylesLoadingPage from './LoadingPage.module.css';
import { useTranslation } from '../contexts/TranslationContext';

const LoadingPage = () => {
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
          {/* <source srcSet="/loadingSpinner.webp" type="image/webp" />*/}
          <img
          className={stylesLoadingPage.spinner} 
          src="/Logo.png"
          alt={t('Loading')}
          aria-label={t('Loading')}
          />
        </picture>

      <p
      className={stylesLoadingPage.loadingText}
      aria-hidden="true"
      >
        {t('Loading')}{dots}
      </p>

    </div>
  </div>
  );
}

export default LoadingPage;