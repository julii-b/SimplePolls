import { Link, Outlet, useNavigation } from 'react-router-dom';
import stylesRootLayout from './RootLayout.module.css'
import LoadingPage from './pages/LoadingPage.tsx';
import ChangeLanguageButton from './components/ChangeLanguageButton/ChangeLanguagButton.tsx';
import DownloadButton from './components/DownloadButton/DownloadButton.tsx';
import InfoButton from './components/InfoButton/InfoButton.tsx';


const RootLayout = () => {
  const navigation = useNavigation();


  return (
    <>
      <div className={stylesRootLayout.buttonsContainer}>
        <InfoButton />
        <DownloadButton />
        <ChangeLanguageButton />
      </div>
      
      <Link to='/'>
        <h1 className={stylesRootLayout.simplePollsTitle}>
          <span className={stylesRootLayout.simpleTitle}>Simple</span>
          <wbr />
          <span className={stylesRootLayout.pollsTitle}>Polls</span>
        </h1>
      </Link>

      { navigation.state === 'loading' || navigation.state === 'submitting'
      ? <LoadingPage />
      : <Outlet /> }
    </>
  );
};
export default RootLayout;
