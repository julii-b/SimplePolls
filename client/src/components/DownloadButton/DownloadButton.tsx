import stylesDownloadB from './DownloadButton.module.css';
import { useTranslation } from 'react-i18next';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDownload } from '@fortawesome/free-solid-svg-icons';
import type { JSX } from 'react/jsx-dev-runtime';
import { useEffect, useState } from 'react';

// Extended event interface for beforeinstallprompt:
interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed"; platform?: string }>;
}

/**
 * A button to change the language of the application.
 * Opens a window with language options when clicked.
 * 
 * @returns {JSX.Element} The rendered button component.
 */
const DownloadButton = (): JSX.Element => {
  const { t } = useTranslation();

  const [installPrompt, setInstallPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  
  // Capture the beforeinstallprompt event to use the prompt later:
  useEffect(() => {
    const handler = (e: Event) => {
      e.preventDefault();
      setInstallPrompt(e as BeforeInstallPromptEvent);
    };
    window.addEventListener("beforeinstallprompt", handler);
    return () => window.removeEventListener("beforeinstallprompt", handler);
  }, []);


  if (installPrompt) { // Render button only if installPrompt is available
    return (
      <>
        <button // Button to open download window
        className={`button ${stylesDownloadB.openButton}`}
        onClick={async (e) => {
          e.preventDefault();
          await installPrompt.prompt(); // Show install prompt
          if ((await installPrompt.userChoice).outcome === "accepted") { // Hide button after acceptance
            setInstallPrompt(null); 
          }
        }}
        aria-label={t('common.downloadButtonAriaLabel')}
          title={t('common.downloadButtonTitle')}
        >
          <FontAwesomeIcon icon={faDownload} />
        </button>
      </>
    );
  } else {
    return <></>;
  }
};

export default DownloadButton;