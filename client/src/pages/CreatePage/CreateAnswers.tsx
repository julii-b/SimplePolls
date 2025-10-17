import { useEffect, useState, type JSX } from "react";
import type { Answer } from "../../types/answer";

type NewAnswer = { // Type declaration for a new answer, which will be later stored in the db
  newAnswerIndex: number; // Index of the new answer
  onNewAnswer: ()=>void // Function to create another new answer
}

/**
 * Renders the elements to change/delete already existing answers and to create new answers.
 * 
 * @param props
 * @param { Answer[] } props.answers - Array of all already existing answers.
 * @returns { JSX.Element[] }
 */
const EditAnswers = ({answers}: {answers: (Answer|NewAnswer)[]}): JSX.Element[] => {

  const [answersToRender, setAnswersToRender] = useState<(Answer|NewAnswer)[]>(answers); // Array of all answers, old and new

  // Function to create a new answer and add it to the array:
  const createNewAnswer = (index: number) => {
    const newAnswer: NewAnswer = {
      newAnswerIndex: index,
      onNewAnswer: ()=>createNewAnswer(index+1) // Answer itself can create a new answer
    }
    setAnswersToRender(answers =>[
      ...answers,
      newAnswer
    ])
  };

  // Create one new answer at the start:
  useEffect(() => {
    createNewAnswer(0);
  }, []);

  // Build array of all answers and render them:
  let answersJSX: JSX.Element[] = [];
  for (const answer of answersToRender){
    if (!('newAnswerIndex' in answer)){ // If answer is an answer from the db
      answersJSX.push(<EditExistingAnswer key={'existingAnswer-'+answer.id} answer={answer}/>);
    } else { // If answer is a new answer
      answersJSX.push(<EditNewAnswer key={'newAnswer-'+answer.newAnswerIndex} answer={answer}/>);
    }
  }
  return answersJSX;
}
export default EditAnswers;


/**
 * Renders the elements needed in a form to edit/delete an already existing Answer object.
 * 
 * @param props 
 * @param { Answer } props.answer - Answer which should be edited with this element
 * @returns {JSX.Element}
 */
const EditExistingAnswer = ({answer}: {answer: Answer}): JSX.Element => {

  const [answerText, setAnswerText] = useState(answer.answerText);

  return (
    <>
      <input
        name={'existingAnswer-'+answer.id} // 'existingAnswer-<id>', so action function knows what to do
        value={answerText}
        onChange={(e) => {setAnswerText(e.target.value)}}
      />
      <button
        type='submit'
        name='action' // action: delete - can later be used to determine if form was submitted using delete button
        value={'delete-'+answer.id} // 'delete-<id>', so action function knows which answer to delete
      >
        Delete
      </button> <br />
    </>
  );
}


/**
 * Renders the elements needed in a form to create a new Answer object.
 * 
 * @param props
 * @param { NewAnswer } props.answer - New answer which should be edited with this element
 * @returns {JSX.Element}
 */
const EditNewAnswer = ({answer}: {answer: NewAnswer}): JSX.Element => {

  const [answerText, setAnswerText] = useState('');
  const [firstChange, setFirstChange] = useState(true); // is initially true, and false after the user typed in the input field
  return (
    <>
      <input
        name={'newAnswer-'+answer.newAnswerIndex} // 'newAnswer', so action function knows what to do
        placeholder='Type to add a new answer to your poll...'
        value={answerText}
        onChange={(e) => {
          if (firstChange) answer.onNewAnswer(); // If the current change is the first change, create new answer input field
          setFirstChange(false);
          setAnswerText(e.target.value)
        }}
      /><br />
    </>
  );
}