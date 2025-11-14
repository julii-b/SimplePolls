import { useEffect, useRef, type JSX } from "react";
import QRCode from "react-qr-code";
import config from "../../../../config/config.ts";
import stylesShareW from './ShareWindow.module.css';
import { createPortal } from "react-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCommentSms, faEllipsis, faEnvelope, faXmark } from "@fortawesome/free-solid-svg-icons";
import { faTelegram, faWhatsapp } from "@fortawesome/free-brands-svg-icons";
import { useTranslation } from "react-i18next";

const ShareWindow = ({ pollId, toggleVisibility }: { pollId: string, toggleVisibility: ()=>void }): JSX.Element	 => {
  const { t } = useTranslation();
  
  const pollUrl = `${config.clientUrl}/participate/${pollId}`;
  const encodedPollUrl = encodeURIComponent(pollUrl);
  const closeButtonRef = useRef<HTMLButtonElement|null>(null);

  // After mount, focus close button and add escape key listener to close window:
  useEffect(() => {
    closeButtonRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        toggleVisibility();
      }
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [toggleVisibility]);
  

  const shareWindowEl = (

    <div className={stylesShareW.overlay}>

      <div className={`contentCard ${stylesShareW.shareWindowContainer}`}>
        <div className={stylesShareW.shareWindowContent}>

          <button // Close button
          className={`button ${stylesShareW.closeButton}`}
          onClick={toggleVisibility}
          ref={closeButtonRef}
          title={t('common.closeWindowTitle')} // tooltip
          aria-label={t('common.closeWindowAriaLabel')}
          >
            <FontAwesomeIcon icon={faXmark} />
          </button>

          <h2
          className={stylesShareW.title}
          >
            {t('participate.sharePollTitle')}
          </h2>

          <p
          className={stylesShareW.instructions}
          >
            {t('participate.qrCodeText')}
          </p>

          <QRCode
          value={pollUrl}
          className={stylesShareW.qrCode}
          />

          <p
          className={stylesShareW.instructions}
          >
            {t('participate.shareLinkText')}
          </p>

          <div
          className={stylesShareW.socialsContainer}
          >
            
            <button
            className={`button ${stylesShareW.socialButton} ${stylesShareW.whatsAppButton}`}
            onClick={()=>{
              window.open(`https://wa.me/?text=${encodedPollUrl}`, '_blank', 'noopener,noreferrer');
            }}
            title={t('participate.shareWhatsappAriaLabel')} // tooltip
            aria-label={t('participate.shareWhatsappAriaLabel')}
            >
              <FontAwesomeIcon icon={faWhatsapp} />
            </button>

            <button
            className={`button ${stylesShareW.socialButton} ${stylesShareW.telegramButton}`}
            onClick={()=>{
              window.open(`https://t.me/share/url?url=${encodedPollUrl}`, '_blank', 'noopener,noreferrer')
            }}
            title={t('participate.shareTelegramAriaLabel')} // tooltip
            aria-label={t('participate.shareTelegramAriaLabel')}
            >
              <FontAwesomeIcon icon={faTelegram} />
            </button>

            <button
            className={`button ${stylesShareW.socialButton} ${stylesShareW.emailButton}`}
            onClick={()=>{
              window.location.href = `mailto:?subject=${encodeURIComponent('Participate in this poll')}&body=${encodedPollUrl}`;
            }}
            title={t('participate.shareEmailAriaLabel')} // tooltip
            aria-label={t('participate.shareEmailAriaLabel')}
            >
              <FontAwesomeIcon icon={faEnvelope} />
            </button>

            <button
            className={`button ${stylesShareW.socialButton} ${stylesShareW.smsButton}`}
            onClick={()=>{
              window.location.href = `sms:?body=${encodedPollUrl}`;
            }}
            title={t('participate.shareSmsAriaLabel')} // tooltip
            aria-label={t('participate.shareSmsAriaLabel')}
            >
              <FontAwesomeIcon icon={faCommentSms} />
            </button>

            { navigator.share && <button // Use Share API if available
            className={`button ${stylesShareW.socialButton} ${stylesShareW.otherShareButton} `}
            onClick={() => {
              navigator.share({
                url: pollUrl
              })
            }}
            title={t('participate.shareOtherAriaLabel')} // tooltip
            aria-label={t('participate.shareOtherAriaLabel')}
            >
              <FontAwesomeIcon icon={faEllipsis} />
            </button> }

          </div>

          <p
          className={stylesShareW.instructions}
          >
            {t('participate.copyLinkText')}
          </p>
          <input
          className={`inputField ${stylesShareW.linkInput}`}
          type="text"
          readOnly
          value={pollUrl}
          onFocus={(e) => e.target.select()}
          aria-label='Poll link'
          />


        </div>

      </div>
    </div>

  );

  // Use portal to render window directly under body:
  return createPortal(shareWindowEl, document.body);
};

export default ShareWindow;