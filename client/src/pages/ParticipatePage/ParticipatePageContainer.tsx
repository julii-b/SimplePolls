import { Outlet } from 'react-router-dom';
import style from './ParticipatePage.module.css';

/**
 * ParticipatePage container component that wraps the JoinPage and VotePage components.
 * @returns {JSX.Element} The ParticipatePage component to be used as an outlet in the RootLayout component.
 */
const ParticipatePage = () => {
  return (
    <div
    className={`cardsContainer`}
    role='main'
    >
      <div className={`contentCard ${style.participatePageCard}`}>
        <Outlet/>
      </div>
    </div>
  );
};
export default ParticipatePage;