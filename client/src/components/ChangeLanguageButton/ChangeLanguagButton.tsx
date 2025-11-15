import stylesLanguageB from './ChangeLanguageButton.module.css';
import useWindow from "../../customHooks/useWindow";
import { useTranslation } from 'react-i18next';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLanguage } from '@fortawesome/free-solid-svg-icons';
import type { JSX } from 'react/jsx-dev-runtime';

/**
 * A button to change the language of the application.
 * Opens a window with language options when clicked.
 * 
 * @returns {JSX.Element} The rendered button component.
 */
const ChangeLanguageButton = (): JSX.Element => {
    const { t, i18n } = useTranslation();

    // Create language selection window:
    const [ LanguageWindow, openLanguageWindow, closeLanguageWindow ] = useWindow({
    children: (
      <div className={stylesLanguageB.buttonsContainer}>

        <button
        className={`button ${stylesLanguageB.languageButton}`}
        onClick={() => {
          i18n.changeLanguage("en");
          closeLanguageWindow();
        }}
        >
          English
        </button>

        <button
        className={`button ${stylesLanguageB.languageButton}`}
        onClick={() => {
          i18n.changeLanguage("de");
          closeLanguageWindow();
        }}
        >
          Deutsch
        </button>

        <button
        className={`button ${stylesLanguageB.languageButton}`}
        onClick={() => {
          i18n.changeLanguage("fr");
          closeLanguageWindow();
        }}
        >
          Français
        </button>

      </div>
    ),
    windowClassName: stylesLanguageB.languageWindow,
    closeButtonClassName: stylesLanguageB.closeLanguageWindowButton
  });

  return (
    <>
      <button // Button to open language selection window
      className={`button ${stylesLanguageB.openLanguageWindowButton}`}
      onClick={() => {openLanguageWindow();}}
      aria-label={t('common.languageButtonAriaLabel')}
        title={t('common.languageButtonTitle')}
      >
        <FontAwesomeIcon icon={faLanguage} />
      </button>
      { LanguageWindow }
    </>
  );
};

export default ChangeLanguageButton;