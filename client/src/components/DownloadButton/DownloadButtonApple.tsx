import stylesDownloadB from './DownloadButton.module.css';
import { useTranslation } from 'react-i18next';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUpFromBracket, faDownload } from '@fortawesome/free-solid-svg-icons';
import type { JSX } from 'react/jsx-dev-runtime';
import useWindow from '../../customHooks/useWindow';
import { faSquarePlus } from '@fortawesome/free-regular-svg-icons';

/**
 * A button to show instructions for installing the app on Apple devices.
 * Opens a window with instructions when clicked.
 * 
 * @returns {JSX.Element} The rendered button component.
 */
const DownloadButtonApple = (): JSX.Element => {
  const { t } = useTranslation();

  // Create window with download instructions:
  const windowContent: JSX.Element = (
    <div className={stylesDownloadB.contentContainer}>
      {t('common.downloadAppleTitle')}
      <ol>
        <li>{t('common.downloadAppleShare1')}<FontAwesomeIcon icon={faArrowUpFromBracket} />{t('common.downloadAppleShare2')}</li>
        <li>{t('common.downloadAppleAdd1')}<FontAwesomeIcon icon={faSquarePlus} />{t('common.downloadAppleAdd2')}</li>
      </ol>
    </div>
  );
  const [downloadWindowEl, showDownloadWindow, _] = useWindow({ children: windowContent });

  
   const isAppInstalled = (): boolean => {
    return ( window.matchMedia('(display-mode: standalone)').matches || (navigator as any).standalone === true );
  };

  if (!isAppInstalled) { // Render button only if not installed yet
    return (<>
      {downloadWindowEl}
      <button // Button to open download window
        className={`button ${stylesDownloadB.openButton}`}
        onClick={async (e) => { // Show download instructions window
          e.preventDefault();
          showDownloadWindow();
        }}
        aria-label={t('common.downloadButtonAriaLabel')}
          title={t('common.downloadButtonTitle')}
        >
          <FontAwesomeIcon icon={faDownload} />
        </button>
    </>);
  } else {
    return <></>;
  }
};

export default DownloadButtonApple;