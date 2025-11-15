import { Link, useSearchParams } from "react-router-dom";
import { useEffect, type JSX } from "react";
import stylesHeader from './Header.module.css';
import stylesShareW from './ShareWindow.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShare, faPencil, faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { useTranslation } from "react-i18next";
import useWindow from "../../../customHooks/useWindow";
import ShareWindowContent from "./ShareWindowContent";


/**
 * Renders the vote-page header including edit button (if user is owner)
 * 
 * @returns { JSX.Element }
 */
const VotePageHeader = (
  {questionText, userIsOwner, pollId}
  : {questionText: string, userIsOwner: boolean, pollId: string}
): JSX.Element	 => {

  const { t } = useTranslation();

  // Create shareWindow:
  const [ShareWindowEl, showShareWindow, _] = useWindow({
    children: <ShareWindowContent pollId={pollId} />,
    windowClassName: stylesShareW.shareWindow,
    closeButtonClassName: stylesShareW.closeButton
  });
  // Show share window if URL has showShare param:
  let [searchParams ] = useSearchParams();
  useEffect(() => {
    if (searchParams.has('showShare')) {
      showShareWindow();
    }
  }, []);

  const formattedPollId: string = (`${pollId.slice(0, 3)}-${pollId.slice(3,6)}-${pollId.slice(6)}`).toUpperCase();

  return (
    <>
      {ShareWindowEl}

      <div className={stylesHeader.headerContainer}>

        <Link // back-button that leads to join-page
        to='/participate'
        className={`button ${stylesHeader.button}`}
        title={t('common.goBackButtonTitle')} // tooltip
        aria-label={t('common.goBackButtonAriaLabel')}
        >
          <FontAwesomeIcon icon={faChevronLeft} />
        </Link>

        <div // question text
        className={stylesHeader.questionText}
        >
          {questionText}
        </div>

        <div className={stylesHeader.headerRightContainer}>

          <button // share-button
          className={`button ${stylesHeader.button}`}
          onClick={showShareWindow}
          aria-label={t('participate.shareButtonAriaLabel')}
          title={t('participate.shareButtonTitle')}
          >
            <FontAwesomeIcon icon={faShare} />
          </button>
          
          {userIsOwner && //Link to edit for owner of poll
            <Link
            to={'/create/'+pollId}
            className={`button ${stylesHeader.button}`}
            aria-label={t('participate.editButtonAriaLabel')}
            title={t('participate.editButtonTitle')}
            >
              <FontAwesomeIcon icon={faPencil} />
            </Link>
          }
        </div>
      </div>

      <div
      className={stylesHeader.pollId}
      aria-hidden='true'
      >
        ID: {formattedPollId}
      </div>

    </>
  );

};
export default VotePageHeader;