import { Outlet } from 'react-router-dom';
import style from './ParticipatePage.module.css';

const VoteContainer = () => {
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
export default VoteContainer;