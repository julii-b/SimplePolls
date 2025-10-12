import { useLoaderData } from "react-router-dom";

export async function loader () {

}

const JoinContainer = () => {
    
    const {userProfile} = useLoaderData();

    return (
        <div>
            Join a poll <br/>
            <input type="text" />
        </div>
    );
}
export default JoinContainer;