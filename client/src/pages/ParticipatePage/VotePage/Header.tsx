import { Link } from "react-router-dom";
import type { JSX } from "react";
import stylesHeader from './Header.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShare, faPencil, faChevronLeft } from '@fortawesome/free-solid-svg-icons';


/**
 * Renders the vote-page header including edit button (if user is owner)
 * 
 * @returns { JSX.Element }
 */
const VotePageHeader = (
  {questionText, userIsOwner, pollId, showShareWindow}
  : {questionText: string, userIsOwner: boolean, pollId: number, showShareWindow: ()=>void}
): JSX.Element	 => {


  return (
    <>
      <div className={stylesHeader.headerContainer}>

        <Link // back-button that leads to join-page
        to='/participate'
        className={`button ${stylesHeader.button}`}
        title='Back' // tooltip
        aria-label="Go back to the poll list"
        >
          <FontAwesomeIcon icon={faChevronLeft} />
        </Link>

        <div // question text
        className={stylesHeader.questionText}
        aria-label={`Text of poll ${pollId} question`}
        >
          {questionText}
        </div>

        <div className={stylesHeader.headerRightContainer}>

          <button // share-button (to be implemented)
          className={`button ${stylesHeader.button}`}
          onClick={showShareWindow}
          aria-label={`Share poll ${pollId}`}
          title='Share' // tooltip
          >
            <FontAwesomeIcon icon={faShare} />
          </button>
          
          {userIsOwner && //Link to edit for owner of poll
            <Link
            to={'/create/'+pollId}
            className={`button ${stylesHeader.button}`}
            aria-label={`Edit poll ${pollId}`}
            title='Edit' // tooltip
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
        Poll ID: {pollId}
      </div>

    </>
  );

};
export default VotePageHeader;