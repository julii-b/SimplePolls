import { Form, useLoaderData } from 'react-router-dom';
import type { Poll } from '../../types/poll';
import InputsAnswers from './InputsAnswers/InputsAnswersContainer';
import styles from './CreatePage.module.css';
import CreatePageHeader from './Header';
import { useTranslation } from '../../contexts/TranslationContext';


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
    <div
    className={`cardsContainer`}
    role='main'
    >
      <div className={`contentCard ${styles.createPageCard}`} >
        <Form
          method='post'
          className={styles.votePageContainer}
          aria-label={useTranslation().t('Create new poll or edit existing poll')}
        >
          {poll && ( // store pollId as hidden input if poll was passed
            <input 
              type='hidden'
              name='pollId'
              value={poll.id}
              aria-hidden="true"
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