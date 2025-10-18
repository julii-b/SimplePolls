import { Outlet } from 'react-router-dom';

const VoteContainer = () => {
    return (
        <div>
            <h2>Participate</h2>
            <Outlet/>
        </div>
    );
};
export default VoteContainer;