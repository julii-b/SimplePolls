import { createBrowserRouter } from 'react-router-dom';

import App from './RootLayout.tsx';

import HomePage from './pages/HomePage.tsx';
import CreatePage from './pages/CreatePage/CreatePageContainer.tsx';
import createPageLoader from './pages/CreatePage/createPageLoader.tsx';
import createPageAction from './pages/CreatePage/createPageAction.tsx';
import ParticipatePage from './pages/ParticipatePage/ParticipatePageContainer.tsx';
import JoinPage from './pages/ParticipatePage/Join/JoinPageContainer.tsx';
import { loader as joinPageLoader } from './pages/ParticipatePage/Join/joinPageLoader.tsx';
import VotePage from './pages/ParticipatePage/Vote/VotePageContainer.tsx';
import { loader as votePageLoader } from './pages/ParticipatePage/Vote/votePageLoader.tsx';
import { action as votePageAction } from './pages/ParticipatePage/Vote/votePageAction.tsx';
import ErrorElement from './pages/ErrorElement.tsx';

const router = createBrowserRouter([
{
    path: '/',
    element: <App />,
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
                    loader: createPageLoader,
                    action: createPageAction,
                    element: <CreatePage />,
                    errorElement: <ErrorElement />
                },
                {
                    path: ':pollId', // '/create/:pollId'
                    loader: createPageLoader,
                    action: createPageAction,
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
                    loader: joinPageLoader, // load list of all polls of user
                    element: <JoinPage />,
                    errorElement: <ErrorElement />
                },
                {
                    path: ':pollId', // '/participate/:pollId'
                    loader: votePageLoader, // load poll and answers
                    action: votePageAction, // submit vote/change poll/change answer/add answer/remove answer
                    element: <VotePage />,
                    errorElement: <ErrorElement />
                }
            ]
        }
    ]
},
]);

export default router;