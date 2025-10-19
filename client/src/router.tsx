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

const router = createBrowserRouter([
{
    path: '/',
    element: <App />,
    children: [
        {
            index: true, // '/'
            element: <HomePage />
        },
        {
            path: 'create', 
            children: [
                {
                    index: true, // '/create'
                    loader: createPageLoader,
                    action: createPageAction,
                    element: <CreatePage />
                },
                {
                    path: ':pollId', // '/create/:pollId'
                    loader: createPageLoader,
                    action: createPageAction,
                    element: <CreatePage />
                }
            ]
        },
        {
            path: 'participate',
            element: <ParticipatePage />,
            children: [
                {
                    index: true, // '/participate'
                    loader: joinPageLoader, // load list of all polls of user
                    element: <JoinPage />
                },
                {
                    path: ':pollId', // '/participate/:pollId'
                    loader: votePageLoader, // load poll and answers
                    action: votePageAction, // submit vote/change poll/change answer/add answer/remove answer
                    element: <VotePage />
                }
            ]
        }
    ]
},
]);

export default router;