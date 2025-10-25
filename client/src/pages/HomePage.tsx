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
                <h2>Create new poll</h2>
                <Link to='/create'> Create </Link>
            </div>
            <div className={`contentCard ${style.participateCard}`} >
                <h2>Participate in a poll</h2>
                <Link to='/participate'> Participate </Link>
            </div>
        </div>
    );
};
export default HomePage;