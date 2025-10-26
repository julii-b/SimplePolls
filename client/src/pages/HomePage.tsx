import { Link } from "react-router-dom";
import { customFetch } from "../services/backendApi";
import style from './HomePage.module.css';

const HomePage = () => {

    customFetch('/me').then( (res)=>{
        console.log(res);
    });
    return (
        <div className={`cardsContainer`} >
            <div className={`contentCard ${style.createNewCard}`} >
                <img src="./../LogoCreate.png" alt="Create Poll" className={style.createNewLogo}/>
                <Link className={`button ${style.createNewButton}`} to='/create'> Create a new poll </Link>
            </div>
            <div className={`contentCard ${style.participateCard}`} >
                <img src="./../LogoParticipate.png" alt="Participate Poll" className={style.participateLogo}/>
                <Link className={`button ${style.participateButton}`} to='/participate'> Participate in a poll </Link>
            </div>
        </div>
    );
};
export default HomePage;