import { useEffect, useState, type JSX } from "react";
import type { Answer } from "../../types/answer";

/**
 * Renders the elements to change/delete already existing answers and to create new answers.
 * 
 * @param props
 * @param { Answer[] } props.answers - Array of all already existing answers.
 * @returns { JSX.Element[] }
 */
const EditAnswers = ({answers}: {answers: Answer[]}): JSX.Element[] => {

  const [answersJSX, setAnswersJSX] = useState<JSX.Element[]>([]); // Array of all answers, old and new

  // Function to create one new answer and add it to the array:
  const createNewAnswer = (index: number) => {
    const newAnswer = <NewAnswer
      key={'newAnswer-'+index}
      answerIndex={index}
      onNewAnswer={() => createNewAnswer(index+1)} // Can itself call the function to create another new answer
    />;
    setAnswersJSX((answersJSX) => [
      ...answersJSX,
      newAnswer
    ]);
  }

  // Create all already existing answers and set up possibility to create new answers:
  useEffect(() => {
    // Create all already existing answers and add them to the array:
    for (let answer of answers){
      setAnswersJSX((answersJSX) => [
        ...answersJSX,
        <EditAnswer
          key={'existingAnswer-'+answer.id}
          answer={answer}
        />
      ]
      );
    }

    // Create one new answer at the beginning:
    createNewAnswer(0);

  }, []);

  // Render all answers:
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
const EditAnswer = ({answer}: {answer: Answer}): JSX.Element => {

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
 * @param { number } props.answerIndex - Index of the new answer in the form, so a unique name can be assigned
 * @param { ()=>{} } props.onNewAnswer - function to call, when the input field is filled out for the first time. Is used to create a new input field.
 * @returns 
 */
const NewAnswer = ({answerIndex, onNewAnswer}: {answerIndex: number, onNewAnswer: ()=>void}): JSX.Element => {
  const [answerText, setAnswerText] = useState('');
  const [firstChange, setFirstChange] = useState(true); // is initially true, and false after the user typed in the input field
  return (
    <>
      <input
        name={'newAnswer-'+answerIndex} // 'newAnswer', so action function knows what to do
        placeholder='Type to add a new answer to your poll...'
        value={answerText}
        onChange={(e) => {
          if (firstChange) onNewAnswer(); // If the current change is the first change, create new answer input field
          setFirstChange(false);
          setAnswerText(e.target.value)
        }}
      /><br />
    </>
  )
}