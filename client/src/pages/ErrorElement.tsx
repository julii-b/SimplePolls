import { isRouteErrorResponse, Link, useRouteError } from "react-router-dom";
import styles from './ErrorElement.module.css';
import { useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";

const ErrorPage = () => {
  const {t} = useTranslation();
  const error = useRouteError();

  let errorTitle:string = '';
  let errorMessage:string = '';

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

  // Focus the h2 when the component is mounted (relevant for screen readers):
  const reloadRef = useRef<HTMLAnchorElement | null>(null);
  useEffect(() => {
    reloadRef.current?.focus();
  }, []);

  return (
    <div
    className={`contentCard ${styles.errorContainer}`}
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
      ref={reloadRef}
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
  );
}
export default ErrorPage;