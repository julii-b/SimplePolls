import { useEffect, useState, type JSX } from "react";
import useWindow from "../../customHooks/useWindow";
import styles from './LoadingOverlay.module.css';
import { useTranslation } from "react-i18next";


/**
 * Loading overlay component that can be rendered to indicate a loading state.
 * 
 * @returns {JSX.Element}
 */
const LoadingOverlay = (): JSX.Element => {
  const { t } = useTranslation();

  // State for animated dots and effect to update them:
  const [ dots, setDots ] = useState<string>('');
  useEffect(() => {
    const intervalId = setInterval(() => {
      setDots((prev) => (prev.length < 6 ? prev+' .' : ''));
    }, 200);
    return () => clearInterval(intervalId);
  }, []);
  
  // Use useWindow hook to create loading overlay:
  const [loadingOverlay, showLoadingOverlay, _] = useWindow({
    children: (
      <div className={styles.spinnerContainer}>
        <picture>
          <source srcSet="/Logo.webp" type="image/webp" />
          <img
          className={styles.spinner} 
          src="/Logo.png"
          alt="Loading"
          aria-label="Loading"
          />
        </picture>
        <p className={styles.loadingText}
        aria-hidden="true"
        >
          {t('common.loadingText')}{dots}
        </p>
      </div>
    ),
    windowClassName: styles.loadingWindow,
    closeButtonClassName: styles.closeButton
  });

  // Show the loading overlay on mount:
  useEffect(() => {
    showLoadingOverlay();
  }, []);

  return <>{loadingOverlay}</>;
}

export default LoadingOverlay;