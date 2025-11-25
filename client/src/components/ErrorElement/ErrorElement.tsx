import { isRouteErrorResponse, Link, useRouteError } from "react-router-dom";
import styles from './ErrorElement.module.css';
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import useWindow from "../../customHooks/useWindow";

/**
 * Error element component to be used by the router on errors.
 * Displays an error window with options to reload or go home.
 * 
 * @returns {JSX.Element} The rendered error window component.
 */
const ErrorElement = () => {
  const {t} = useTranslation();
  const error = useRouteError();

  let errorTitle:string = '';
  let errorMessage:string = '';
  // Determine appropriate error title and message:
  if (isRouteErrorResponse(error)) {
    errorTitle = 'Error ' + error.status;
    errorMessage = error.statusText;
  } else if (error instanceof Error) {
    errorTitle = 'Error';
    errorMessage = error.message;
  } else {
    errorTitle = 'Unknown Error';
    errorMessage = 'An unknown error has occurred.';
  }

  // Use useWindow hook to create error window:
  const [errorWindow, showErrorWindow, _] = useWindow({
    children: (
      <div
      className={`${styles.errorContainer}`}
      >
        <div>
          <h2
          tabIndex={-1}
          >
            {errorTitle}
          </h2>
          <p>
            {errorMessage}
          </p>
        </div>

        <Link
        to={window.location.pathname}
        className={`button ${styles.errorButton}`}
        onClick={(e) => {
        e.preventDefault();
        window.location.reload();
        }}
        >
          {t('error.reloadButtonText')}
        </Link>

        <Link
        className={`button ${styles.errorButton}`}
        to='/'
        >
          {t('error.goHomeButtonText')}
        </Link>
      </div>
    ),
    windowClassName: styles.errorWindow,
    closeButtonClassName: styles.errorCloseButton
  });

  // Show error window on mount:
  useEffect(() => {
    showErrorWindow();
  }, []);

  return <>{errorWindow}</>;
}
export default ErrorElement;