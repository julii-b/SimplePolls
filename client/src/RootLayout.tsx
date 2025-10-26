import { Link, Outlet, useNavigation } from 'react-router-dom';
import './RootLayout.css'
import LoadingPage from './pages/LoadingPage.tsx';


const RootLayout = () => {

  const navigation = useNavigation();

  return (
    <>
      <Link to='/'>
        <h1 className='simplePollsTitle'>
          <span className='simpleTitle'>Simple</span>
          <wbr />
          <span className='pollsTitle'>Polls</span>
        </h1>
      </Link>
      { navigation.state === 'loading' || navigation.state === 'submitting'
      ? <LoadingPage />
      : <Outlet /> }
    </>
  );
};
export default RootLayout;
