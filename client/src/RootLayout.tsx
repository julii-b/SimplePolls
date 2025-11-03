import { Link, Outlet, useNavigation } from 'react-router-dom';
import stylesRootLayout from './RootLayout.module.css'
import LoadingPage from './pages/LoadingPage.tsx';


const RootLayout = () => {

  const navigation = useNavigation();

  return (
    <>
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
