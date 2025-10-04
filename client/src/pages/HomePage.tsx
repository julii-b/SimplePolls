import { Link } from "react-router-dom";

export default function HomePage(){

    fetch('http://172.17.0.4:3000/me')
        .then(async res => {
            console.log('Headers:', Array.from(res.headers.entries()));
            console.log('X-New-Token:', res.headers.get('X-New-Token'));
        });
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