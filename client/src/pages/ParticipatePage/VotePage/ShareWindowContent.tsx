import { type JSX } from "react";
import QRCode from "react-qr-code";
import config from "../../../config/config.ts";
import stylesShareW from './ShareWindow.module.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCommentSms, faEllipsis, faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { faTelegram, faWhatsapp } from "@fortawesome/free-brands-svg-icons";
import { useTranslation } from "react-i18next";

/**
 *  Renders the content of the share-window inside a Window component
 * 
 * @param param
 * @param { string } param.pollId - ID of the poll to share
 * @returns {JSX.Element} The ShareWindowContent component to be used inside a Window component.
 */
const ShareWindowContent = ({ pollId }: { pollId: string }): JSX.Element	 => {
  const { t } = useTranslation();
  
  const pollUrl = `${config.clientUrl}/participate/${pollId}`;
  const encodedPollUrl = encodeURIComponent(pollUrl);

  return (
    <div className={stylesShareW.shareWindowContent}>
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
  );
};

export default ShareWindowContent;