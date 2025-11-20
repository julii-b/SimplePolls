import stylesInfoB from './InfoButton.module.css';
import useWindow from "../../customHooks/useWindow";
import { useTranslation } from 'react-i18next';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInfo } from '@fortawesome/free-solid-svg-icons';
import type { JSX } from 'react/jsx-dev-runtime';
import InfoContent from './InfoContent';

/**
 * A button to change the language of the application.
 * Opens a window with language options when clicked.
 * 
 * @returns {JSX.Element} The rendered button component.
 */
const InfoButton = (): JSX.Element => {
    const { t } = useTranslation();

    // Create the window:
    const [ InfoWindow, openWindow, _ ] = useWindow({
    children: (
      <div className={stylesInfoB.contentContainer}>

        <InfoContent />

      </div>
    ),
    windowClassName: stylesInfoB.window,
    closeButtonClassName: stylesInfoB.closeButton
  });

  return (
    <>
      <button // Button to open info window
      className={`button ${stylesInfoB.openWindowButton}`}
      onClick={() => {openWindow();}}
      aria-label={t('common.infoButtonAriaLabel')}
        title={t('common.infoButtonTitle')}
      >
        <FontAwesomeIcon icon={faInfo} />
      </button>
      { InfoWindow }
    </>
  );
};

export default InfoButton;