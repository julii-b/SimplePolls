import { Link } from "react-router-dom";
import style from './HomePage.module.css';
import { useTranslation } from '../contexts/TranslationContext';

const HomePage = () => {
    const { t } = useTranslation();

    return (
        <div
        className={`cardsContainer`}
        role='main'
        >
            <div className={`contentCard ${style.createNewCard}`} >
                <img
                src="./../LogoCreate.png"
                alt=""
                className={style.createNewLogo}
                aria-hidden="true"
                />
                <Link className={`button ${style.createNewButton}`} to='/create'> {t('Create a new poll')} </Link>
            </div>
            <div className={`contentCard ${style.participateCard}`} >
                <img
                src="./../LogoParticipate.png"
                alt=""
                className={style.participateLogo}
                aria-hidden="true"
                />
                <Link className={`button ${style.participateButton}`} to='/participate'> {t('Participate in a poll')} </Link>
            </div>
        </div>
    );
};
export default HomePage;