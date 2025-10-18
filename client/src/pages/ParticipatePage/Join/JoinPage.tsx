import type { JSX } from "react";
import { Link, useLoaderData } from "react-router-dom";
import type { Poll } from "../../../types/poll";

const JoinContainer = () => {
    
  const { polls }: { polls: Poll[]} = useLoaderData();

  let pollsJSX: JSX.Element[] = [];
  for (let poll of polls) {
    const pollJSX = (
      <>
        <Link
          to={'/vote/'+poll.id}
          key={poll.id}
        >{poll.questionText}</Link><br />
      </>
    );
    pollsJSX.push(pollJSX);
  }

  return (
    <>
      <div>
        {pollsJSX}
      </div>
    </>
  );
}
export default JoinContainer;