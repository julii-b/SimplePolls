import { Link, Outlet, useNavigation } from 'react-router-dom';
import stylesRootLayout from './RootLayout.module.css'
import LoadingPage from './pages/LoadingPage/LoadingPage.tsx';
import ChangeLanguageButton from './components/ChangeLanguageButton/ChangeLanguagButton.tsx';
import DownloadButton from './components/DownloadButton/DownloadButton.tsx';
import InfoButton from './components/InfoButton/InfoButton.tsx';
import NetworkStatusIndicator from './components/NetworkStatusIndicator/NetworkStatusIndicator.tsx';
import type { JSX } from 'react';

/**
 * Root layout component for the application. Parents all other pages.
 * @returns {JSX.Element}
 */
const RootLayout = (): JSX.Element => {
  const navigation = useNavigation();


  return (
    <>
      <NetworkStatusIndicator />

      <div className={stylesRootLayout.buttonsContainer}>
        <InfoButton />
        <DownloadButton />
        <ChangeLanguageButton />
      </div>
      
      
      <h1 className={stylesRootLayout.simplePollsTitle}>
        <Link to='/'>
          <span className={stylesRootLayout.simpleTitle}>Simple</span>
          <wbr />
          <span className={stylesRootLayout.pollsTitle}>Polls</span>
        </Link>
      </h1>

      { navigation.state === 'loading' || navigation.state === 'submitting'
      ? <LoadingPage />
      : <Outlet /> }
    </>
  );
};
export default RootLayout;
