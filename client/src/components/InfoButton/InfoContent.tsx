import infoButtonStyles from "./InfoButton.module.css";
import { faCircleExclamation } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useTranslation } from "react-i18next";

const InfoContent = () => {
  const { t, i18n } = useTranslation();
  
  return (
    <>
      <h2>About SimplePolls</h2>
      <p>
        {i18n.language !== 'en' && (<>
          <FontAwesomeIcon icon={faCircleExclamation} className={infoButtonStyles.warningIcon} />
          <span className={infoButtonStyles.warningText}>{t('common.warningEnglishOnly')}</span><br /><br />
        </>)}

        SimplePolls is a full-stack polling application built with React and Express. Users can use the app to ask each other productive or fun questions and vote in real-time.<br /><br />

        It has the following features:
        <ul>
          <li>Users can create new polls and edit existing polls in their ownership</li>
          <li>Users can share their polls to other users</li>
          <li>Users can participate in polls created by other users</li>
          <li>The app is available in three languages</li>
          <li>The app's responsive design allows it to be used on mobile and desktop</li>
        <li>The backend offers a public API</li>
        </ul><br />

        You can have a look at the code here: <a href="https://github.com/julii-b/SimplePolls" target="_blank" rel="noopener noreferrer">github.com/julii-b/SimplePolls</a><br /><br />

        And view the API documentation here: <a href="https://apisimplepolls.julius-busch.com/docs" target="_blank" rel="noopener noreferrer">apisimplepolls.julius-busch.com/docs</a>
      </p>
    </>
  );
};

export default InfoContent;