import infoButtonStyles from "./InfoButton.module.css";
import { faCircleExclamation } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import type { JSX } from "react";
import { useTranslation } from "react-i18next";


/**
 * Content for the info window.
 * 
 * @returns {JSX.Element}
 */
const InfoContent = (): JSX.Element => {
  const { t, i18n } = useTranslation();
  
  return (
    <>
      <h2>About SimplePolls</h2>

      <p>
        {i18n.language !== 'en' && (<>
          <FontAwesomeIcon icon={faCircleExclamation} className={infoButtonStyles.warningIcon} />
          <span className={infoButtonStyles.warningText}>{t('common.warningEnglishOnly')}</span>
        </>)}
      </p>

      <p>
        SimplePolls is a full‑stack polling application built with a React frontend and an Express backend. Users can use the app to ask each other productive or fun questions and vote on them.
      </p>

      <p>
        It has the following features:
        <ul>
          <li>Users can create new polls and edit existing polls in their ownership</li>
          <li>Users can share their polls to other users</li>
          <li>Users can participate in polls created by other users</li>
          <li>The frontend is available in English, German & French</li>
          <li>The frontend's responsive design allows it to be used on mobile and desktop</li>
          <li>The backend offers a public API</li>
        </ul>
      </p>

      <p>
        You can have a look at the code here: <a href="https://github.com/julii-b/SimplePolls" target="_blank" rel="noopener noreferrer">github.com/julii-b/SimplePolls</a>
      </p>

      <p>
        And view the API documentation here: <a href="https://apisimplepolls.julius-busch.com/docs" target="_blank" rel="noopener noreferrer">apisimplepolls.julius-busch.com/docs</a>
      </p>

      <h3>Tech Stack</h3>

      <h4>Frontend:</h4>
        <ul>
          <li><b>Language:</b> TypeScript</li>
          <li><b>Framework:</b> React</li>
          <li><b>Routing:</b> React Router (Data Mode)</li>
          <li><b>Build Tool:</b> Vite</li>
          <li><b>Internationalization:</b> i18next</li>
        </ul>
      <h4>Backend:</h4>
        <ul>
          <li><b>Language:</b> TypeScript</li>
          <li><b>Framework:</b> Express</li>
          <li><b>ORM:</b> Prisma with PostgreSQL</li>
          <li><b>API Documentation:</b> Swagger UI (OpenAPI)</li>
          <li><b>Tests:</b> Supertest & Vitest</li>
        </ul>
    </>
  );
};

export default InfoContent;