import { Outlet, useNavigation } from 'react-router-dom';
import './RootLayout.css'
import LoadingPage from './pages/LoadingPage.tsx';


const RootLayout = () => {

  const navigation = useNavigation();

  return (
    <>
      <h1>SimplePolls</h1>
      { navigation.state === 'loading' || navigation.state === 'submitting'
      ? <LoadingPage />
      : <Outlet /> }
    </>
  );
};
export default RootLayout;
