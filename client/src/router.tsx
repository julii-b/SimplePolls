import { createBrowserRouter } from 'react-router-dom';

import App from './RootLayout.tsx';

import HomePage from './pages/HomePage/HomePage.tsx';
import CreatePage, {loader as createLoader, action as createAction} from './pages/CreatePage/CreatePage.tsx';
import ParticipatePage from './pages/ParticipatePage/ParticipatePageContainer.tsx';
import JoinPage, { loader as joinLoader } from './pages/ParticipatePage/JoinPage/JoinPage.tsx';
import VotePage, { loader as voteLoader } from './pages/ParticipatePage/VotePage/VotePage.tsx';
import ErrorElement from './components/ErrorElement/ErrorElement.tsx';

const router = createBrowserRouter([
{
    path: '/',
    element: <App />,
    errorElement: <ErrorElement />,
    children: [
        {
            index: true, // '/'
            element: <HomePage />,
            errorElement: <ErrorElement />
        },
        {
            path: 'create', 
            children: [
                {
                    index: true, // '/create'
                    loader: createLoader,
                    action: createAction,
                    element: <CreatePage />,
                    errorElement: <ErrorElement />
                },
                {
                    path: ':pollId', // '/create/:pollId'
                    loader: createLoader,
                    action: createAction,
                    element: <CreatePage />,
                    errorElement: <ErrorElement />
                }
            ]
        },
        {
            path: 'participate',
            element: <ParticipatePage />,
            errorElement: <ErrorElement />,
            children: [
                {
                    index: true, // '/participate'
                    loader: joinLoader, // load list of all polls of user
                    element: <JoinPage />,
                    errorElement: <ErrorElement />
                },
                {
                    path: ':pollId', // '/participate/:pollId'
                    loader: voteLoader, // load poll and answers
                    element: <VotePage />,
                    errorElement: <ErrorElement />
                }
            ]
        }
    ]
},
]);

export default router;