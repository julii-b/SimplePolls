import { useEffect, useState, type JSX } from "react";
import type { Answer } from "../../../types/answer";
import stylesInpAnsws from './InputsAnswers.module.css';
import InputExistingAnswer from "./InputExistingAnswer";
import InputNewAnswer from "./InputNewAnswer";

export type NewAnswer = { // Type declaration for a new answer, which will be later stored in the db
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
const EditAnswers = ({answers}: {answers: (Answer|NewAnswer)[]}): JSX.Element => {

  // array of all answers (existing and new):
  const [answersToRender, setAnswersToRender] = useState<(Answer|NewAnswer)[]>(answers);

  // Function to create a new answer and add it to the array (used in InputNewAnswer):
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

    if (!('newAnswerIndex' in answer)){ // If answer is an existing answer from the db
      answersJSX.push(
        <InputExistingAnswer
        key={'existingAnswer-'+answer.id}
        answer={answer}
        />
      );

    } else { // If answer is a new answer
      answersJSX.push( 
        <InputNewAnswer
        key={'newAnswer-'+answer.newAnswerIndex}
        answer={answer}
        />
      );
    }
  }

  return (
    <div
    className={stylesInpAnsws.answersContainer}
    aria-live='polite' // so screen readers announce changes
    >{answersJSX}</div>
  );
}
export default EditAnswers;