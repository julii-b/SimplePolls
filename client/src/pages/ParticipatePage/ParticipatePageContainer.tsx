import { Outlet } from 'react-router-dom';
import style from './ParticipatePage.module.css';

const VoteContainer = () => {
  return (
    <div className={`cardsContainer`}>
      <div className={`contentCard ${style.participatePageCard}`}>
        <h2>Participate</h2>
          <Outlet/>
          </div>
       </div>
  );
};
export default VoteContainer;