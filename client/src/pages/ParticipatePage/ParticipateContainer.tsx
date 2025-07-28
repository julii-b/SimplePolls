import { Outlet } from 'react-router-dom';

export default function VoteContainer () {
    return (
        <div>
            <h2>Participate</h2>
            <Outlet/>
        </div>
    );
}