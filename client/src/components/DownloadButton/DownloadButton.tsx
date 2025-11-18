import stylesDownloadB from './DownloadButton.module.css';
import useWindow from "../../customHooks/useWindow";
import { useTranslation } from 'react-i18next';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDownload } from '@fortawesome/free-solid-svg-icons';
import type { JSX } from 'react/jsx-dev-runtime';

/**
 * A button to change the language of the application.
 * Opens a window with language options when clicked.
 * 
 * @returns {JSX.Element} The rendered button component.
 */
const DownloadButton = (): JSX.Element => {
    const { t } = useTranslation();

    // Create the window:
    const [ DownloadWindow, openWindow, _ ] = useWindow({
    children: (
      <div className={stylesDownloadB.contentContainer}>

        Download the PWA: to be implemented

      </div>
    ),
    windowClassName: stylesDownloadB.window,
    closeButtonClassName: stylesDownloadB.closeButton
  });

  return (
    <>
      <button // Button to open download window
      className={`button ${stylesDownloadB.openButton}`}
      onClick={() => {openWindow();}}
      aria-label={t('common.downloadButtonAriaLabel')}
        title={t('common.downloadButtonTitle')}
      >
        <FontAwesomeIcon icon={faDownload} />
      </button>
      { DownloadWindow }
    </>
  );
};

export default DownloadButton;