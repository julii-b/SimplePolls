import { Link } from "react-router-dom";
import { customFetch } from "../services/backendApi";

const HomePage = () => {

    customFetch('/me').then( (res)=>{
        console.log(res);
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
};
export default HomePage;