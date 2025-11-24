import { createPortal } from "react-dom";
import useIsOnline from "../../customHooks/useIsOnline";
import styles from './NetworkStatusIndicator.module.css';
import { useTranslation } from "react-i18next";
import type { JSX } from "react";

/**
 * Shows an overlay if the user is offline.
 * 
 * @returns {JSX.Element} The network status indicator component.
 */
const NetworkStatusIndicator = (): JSX.Element => {

  const { t } = useTranslation();

  // Check if the user is online:
  const isOnline = useIsOnline();

  // Render or don't render the indicator:
  const statusIndicatorEl = (
    <>
      {isOnline ? (<></>) : (
        <>
          <div className={styles.overlay} />
          <div
          className={styles.indicatorContainer}
          aria-live="assertive"
          >
            <img src='/LogoSad.png' alt='' aria-hidden="true" />
            <p>
              {t('common.offlineText')}
            </p>
          </div>
        </>
      )}
    </>
  );

  // Use a portal to render the indicator at the root level:
  return  createPortal(statusIndicatorEl, document.getElementById('root') as HTMLElement);
};
export default NetworkStatusIndicator;