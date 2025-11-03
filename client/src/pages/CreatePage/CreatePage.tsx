import { Form, useLoaderData } from 'react-router-dom';
import type { Poll } from '../../types/poll';
import InputsAnswers from './InputsAnswers/InputsAnswersContainer';
import styles from './CreatePage.module.css';
import CreatePageHeader from './Header';


/**
 * Renders the page to create/change a poll:
 * - Renders the element needed to create/change the question of a poll.
 * - Calls the function to also render the elements needed for the poll's answers.
 * 
 * @returns { JSX.Element }
 */
const CreatePage = () => {

  const loaderData = useLoaderData();
  let poll: Poll|undefined = loaderData.poll;

  return (
    <div className={`cardsContainer`} >
      <div className={`contentCard ${styles.createPageCard}`} >
        <Form
          method='post'
          className={styles.votePageContainer}
        >
          {poll && ( // store pollId as hidden input if poll was passed
            <input 
              type='hidden'
              name='pollId'
              value={poll.id}
            />
          )}

          <CreatePageHeader poll={poll} />

          <InputsAnswers answers={poll? poll.answers : []} />

        </Form>
      </div>
    </div>
  );
}

export default CreatePage;
export { action } from './action';
export { loader } from './loader';