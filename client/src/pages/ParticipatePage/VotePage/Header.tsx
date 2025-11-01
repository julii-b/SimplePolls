import { Link } from "react-router-dom";
import type { JSX } from "react";
import styles from './votePage.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShare, faPencil, faChevronLeft } from '@fortawesome/free-solid-svg-icons';


/**
 * Renders the vote-page header including edit button (if user is owner)
 * 
 * @returns { JSX.Element }
 */
const VotePageHeader = (
  {questionText, userIsOwner, pollId}
  : {questionText: string, userIsOwner: boolean, pollId: number}
): JSX.Element	 => {


  return (
    <>
      <div className={styles.headerContainer}>

        <Link // back-button that leads to join-page
        to='/participate'
        className={`button ${styles.button}`}
        >
          <FontAwesomeIcon icon={faChevronLeft} />
        </Link>

        <div // question text
        className={styles.questionText}
        >
          {questionText}
        </div>

        <div className={styles.headerRightContainer}>

          <button // share-button (to be implemented)
          className={`button ${styles.button}`}
          >
            <FontAwesomeIcon icon={faShare} />
          </button>
          
          {userIsOwner && //Link to edit for owner of poll
            <Link
            to={'/create/'+pollId}
            className={`button ${styles.button}`}
            >
              <FontAwesomeIcon icon={faPencil} />
            </Link>
          }
        </div>
      </div>

      <div className={styles.pollId}>
        Poll ID: {pollId}
      </div>

    </>
  );

};
export default VotePageHeader;