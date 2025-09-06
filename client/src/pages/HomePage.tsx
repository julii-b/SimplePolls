import { Link } from "react-router-dom";

export default function HomePage(){
    return (
        <div>
            <div>
                <h2>Create new poll</h2>
                <Link to='/create'> Create </Link>
            </div>
            <div>
                <h2>Participate in a poll</h2>
                <Link to='/participate'> Participate </Link>
            </div>
        </div>
    );
}