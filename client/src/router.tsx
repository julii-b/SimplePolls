import { createBrowserRouter } from 'react-router-dom';

import App from './App.tsx';
import HomePage from './pages/HomePage.tsx';
import CreatePage from './pages/CreatePage/CreateContainer.tsx';
import ParticipatePage from './pages/ParticipatePage/ParticipateContainer.tsx';
import JoinNewPage from './pages/ParticipatePage/JoinNew/JoinNewContainer.tsx';
import VotePage from './pages/ParticipatePage/Vote/VoteContainer.tsx';


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
            path: 'create', // '/create'
            element: <CreatePage />
        },
        {
            path: 'participate',
            element: <ParticipatePage />,
            children: [
                {
                    index: true, // '/participate'
                    element: <JoinNewPage />
                },
                {
                    path: ':pollId', // '/participate/:pollId'
                    element: <VotePage />
                }
            ]
        }
    ]
},
]);

export default router;