import { type JSX } from "react";
import QRCode from "react-qr-code";
import config from "../../../../config/config.ts";
import stylesShareW from './ShareWindow.module.css';
import { createPortal } from "react-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCommentSms, faEllipsis, faEnvelope, faXmark } from "@fortawesome/free-solid-svg-icons";
import { faTelegram, faWhatsapp } from "@fortawesome/free-brands-svg-icons";

const ShareWindow = ({ pollId, toggleVisibility }: { pollId: number, toggleVisibility: ()=>void }): JSX.Element	 => {

  const pollUrl = `${config.clientUrl}/participate/${pollId}`;
  const encodedPollUrl = encodeURIComponent(pollUrl);

  const shareWindowEl = (

    <div className={stylesShareW.overlay}>

      <div className={`contentCard ${stylesShareW.shareWindowContainer}`}>
        <div className={stylesShareW.shareWindowContent}>

          <button // Close button
          className={`button ${stylesShareW.closeButton}`}
          onClick={toggleVisibility}
          >
            <FontAwesomeIcon icon={faXmark} />
          </button>

          <h2
          className={stylesShareW.title}
          >Share this poll</h2>

          <p
          className={stylesShareW.instructions}
          >
            Scan the QR-Code:
          </p>

          <QRCode
          value={pollUrl}
          className={stylesShareW.qrCode}
          />

          <p
          className={stylesShareW.instructions}
          >
            Or share the link:
          </p>

          <div
          className={stylesShareW.socialsContainer}
          >
            
            <button
            className={`button ${stylesShareW.socialButton} ${stylesShareW.whatsAppButton}`}
            onClick={()=>{
              window.open(`https://wa.me/?text=${encodedPollUrl}`, '_blank', 'noopener,noreferrer');
            }}
            >
              <FontAwesomeIcon icon={faWhatsapp} />
            </button>

            <button
            className={`button ${stylesShareW.socialButton} ${stylesShareW.telegramButton}`}
            onClick={()=>{
              window.open(`https://t.me/share/url?url=${encodedPollUrl}`, '_blank', 'noopener,noreferrer')
            }}
            >
              <FontAwesomeIcon icon={faTelegram} />
            </button>

            <button
            className={`button ${stylesShareW.socialButton} ${stylesShareW.emailButton}`}
            onClick={()=>{
              window.location.href = `mailto:?subject=${encodeURIComponent('Participate in this poll')}&body=${encodedPollUrl}`;
            }}
            >
              <FontAwesomeIcon icon={faEnvelope} />
            </button>

            <button
            className={`button ${stylesShareW.socialButton} ${stylesShareW.smsButton}`}
            onClick={()=>{
              window.location.href = `sms:?body=${encodedPollUrl}`;
            }}
            >
              <FontAwesomeIcon icon={faCommentSms} />
            </button>

            { navigator.share && <button // Use Share API if available
            className={`button ${stylesShareW.socialButton} ${stylesShareW.otherShareButton} `}
            onClick={() => {
              navigator.share({
                title:'SimplePolls Poll',
                text: 'Participate in this poll:',
                url: pollUrl
              })
            }}
            >
              <FontAwesomeIcon icon={faEllipsis} />
            </button> }

          </div>

          <p
          className={stylesShareW.instructions}
          >
            Or copy the link:
          </p>
          <input
          className={`inputField ${stylesShareW.linkInput}`}
          type="text"
          readOnly
          value={pollUrl}
          onFocus={(e) => e.target.select()}
          />


        </div>

      </div>
    </div>

  );

  // Use portal to render window directly under body:
  return createPortal(shareWindowEl, document.body);
};

export default ShareWindow;