import { useEffect, useRef, type JSX } from "react";
import QRCode from "react-qr-code";
import config from "../../../../config/config.ts";
import stylesShareW from './ShareWindow.module.css';
import { createPortal } from "react-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCommentSms, faEllipsis, faEnvelope, faXmark } from "@fortawesome/free-solid-svg-icons";
import { faTelegram, faWhatsapp } from "@fortawesome/free-brands-svg-icons";
import { useTranslation } from "../../../../contexts/TranslationContext";

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
          title={t('Close')} // tooltip
          aria-label={t('Close share window')}
          >
            <FontAwesomeIcon icon={faXmark} />
          </button>

          <h2
          className={stylesShareW.title}
          >{t('Share this poll')}</h2>

          <p
          className={stylesShareW.instructions}
          >
            {t('Scan the QR-Code:')}
          </p>

          <QRCode
          value={pollUrl}
          className={stylesShareW.qrCode}
          />

          <p
          className={stylesShareW.instructions}
          >
            {t('Or share the link:')}
          </p>

          <div
          className={stylesShareW.socialsContainer}
          >
            
            <button
            className={`button ${stylesShareW.socialButton} ${stylesShareW.whatsAppButton}`}
            onClick={()=>{
              window.open(`https://wa.me/?text=${encodedPollUrl}`, '_blank', 'noopener,noreferrer');
            }}
            title={t('Share on WhatsApp')} // tooltip
            aria-label={t('Share on WhatsApp')}
            >
              <FontAwesomeIcon icon={faWhatsapp} />
            </button>

            <button
            className={`button ${stylesShareW.socialButton} ${stylesShareW.telegramButton}`}
            onClick={()=>{
              window.open(`https://t.me/share/url?url=${encodedPollUrl}`, '_blank', 'noopener,noreferrer')
            }}
            title={t('Share on Telegram')} // tooltip
            aria-label={t('Share on Telegram')}
            >
              <FontAwesomeIcon icon={faTelegram} />
            </button>

            <button
            className={`button ${stylesShareW.socialButton} ${stylesShareW.emailButton}`}
            onClick={()=>{
              window.location.href = `mailto:?subject=${encodeURIComponent(t('Participate in this poll'))}&body=${encodedPollUrl}`;
            }}
            title={t('Share via Email')} // tooltip
            aria-label={t('Share via Email')}
            >
              <FontAwesomeIcon icon={faEnvelope} />
            </button>

            <button
            className={`button ${stylesShareW.socialButton} ${stylesShareW.smsButton}`}
            onClick={()=>{
              window.location.href = `sms:?body=${encodedPollUrl}`;
            }}
            title={t('Share via SMS')} // tooltip
            aria-label={t('Share via SMS')}
            >
              <FontAwesomeIcon icon={faCommentSms} />
            </button>

            { navigator.share && <button // Use Share API if available
            className={`button ${stylesShareW.socialButton} ${stylesShareW.otherShareButton} `}
            onClick={() => {
              navigator.share({
                title: t('SimplePolls Poll'),
                text: t('Participate in this poll:'),
                url: pollUrl
              })
            }}
            title={t('Share via other apps')} // tooltip
            aria-label={t('Share via other apps')}
            >
              <FontAwesomeIcon icon={faEllipsis} />
            </button> }

          </div>

          <p
          className={stylesShareW.instructions}
          >
            {t('Or copy the link:')}
          </p>
          <input
          className={`inputField ${stylesShareW.linkInput}`}
          type="text"
          readOnly
          value={pollUrl}
          onFocus={(e) => e.target.select()}
          aria-label={t('Poll link')}
          />


        </div>

      </div>
    </div>

  );

  // Use portal to render window directly under body:
  return createPortal(shareWindowEl, document.body);
};

export default ShareWindow;