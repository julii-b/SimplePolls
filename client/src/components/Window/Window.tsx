import React, { useEffect, useRef, type JSX } from "react";
import stylesWindow from './Window.module.css';
import { createPortal } from "react-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { useTranslation } from "react-i18next";

/**
 * Window component that can be used to display content in a window overlay.
 * 
 * @param param - Props for the window component.
 * @param {React.ReactNode} param.children - The content to be displayed inside the window.
 * @param {() => void} param.closeButtonFunction - Function to be called when the close button is clicked.
 * @param {string} param.windowClassName - Optional class name for the window container.
 * @param {string} param.closeButtonClassName - Optional class name for the close button.
 * @returns {JSX.Element} The rendered window component.
 */
const Window = ({
  children,
  closeButtonFunction,
  windowClassName,
  closeButtonClassName,
  ...props
}: {
  children: React.ReactNode,
  closeButtonFunction: ()=>void,
  windowClassName?: string,
  closeButtonClassName?: string
}): JSX.Element	 => {
  const { t } = useTranslation();

  const closeButtonRef = useRef<HTMLButtonElement|null>(null);

  // After mount, focus close button and add escape key listener to close window:
  useEffect(() => {
    closeButtonRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        closeButtonFunction();
      }
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [closeButtonFunction]);
  

  const WindowEl = (
    <>

    <div className={stylesWindow.overlay} />

    <div
    className={`contentCard ${stylesWindow.shareWindowContainer} ${windowClassName}`}
    {...props}
    >
      
      <div className={stylesWindow.shareWindowContent}>

        <button // Close button
        className={`button ${stylesWindow.closeButton} ${closeButtonClassName}`}
        onClick={closeButtonFunction}
        ref={closeButtonRef}
        title={t('common.closeWindowTitle')} // tooltip
        aria-label={t('common.closeWindowAriaLabel')}
        >
          <FontAwesomeIcon icon={faXmark} />
        </button>
        <div
        className={stylesWindow.contentContainer}
        >
          {children}
        </div>

      </div>
    </div>
    </>

  );

  // Use portal to render window directly under root element:
  return createPortal(WindowEl, document.getElementById('root') as HTMLElement);
};

export default Window;