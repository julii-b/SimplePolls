import { createBrowserRouter } from 'react-router-dom';

import App from './RootLayout.tsx';
import HomePage from './pages/HomePage.tsx';
import CreatePage, { action as createAction } from './pages/CreatePage/CreateContainer.tsx';
import {loader as createLoader} from './pages/CreatePage/createLoader.tsx'
import ParticipatePage from './pages/ParticipatePage/ParticipateContainer.tsx';
import JoinPage, { loader as joinLoader } from './pages/ParticipatePage/Join/JoinContainer.tsx';
import VotePage, { loader as voteLoader, action as voteAction } from './pages/ParticipatePage/Vote/VoteContainer.tsx';


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
                    loader: createLoader,
                    action: createAction,
                    element: <CreatePage />
                },
                {
                    path: ':pollId', // '/create/:pollId'
                    loader: createLoader,
                    action: createAction,
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
                    loader: joinLoader, // load list of all polls of user
                    element: <JoinPage />
                },
                {
                    path: ':pollId', // '/participate/:pollId'
                    loader: voteLoader, // load poll and answers
                    action: voteAction, // submit vote/change poll/change answer/add answer/remove answer
                    element: <VotePage />
                }
            ]
        }
    ]
},
]);

export default router;