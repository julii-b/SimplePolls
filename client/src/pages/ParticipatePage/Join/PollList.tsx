import type { JSX } from "react";
import type { Poll } from "../../../types/poll";
import { Link } from "react-router-dom";

/**
 * Renders an array of polls with links to the polls.
 * 
 * @param param
 * @param  { Poll[] } param.polls - Array of polls to render
 * @returns { JSX.Element }
 */
const PollList = ({polls}: {polls: Poll[]}): JSX.Element => {

  let pollsJSX: JSX.Element[] = [];

  for (let poll of polls) {
    const pollJSX = (
      <div key={poll.id}>
        <Link
          to={'/participate/'+poll.id}
        >{poll.questionText}</Link><br />
      </div>
    );
    pollsJSX.push(pollJSX);
  }

  return (
    <>
     {pollsJSX}
    </>
  );
}
export default PollList;