import React, { useState } from "react";
import { fetchQuizQuestions } from "./API";
import { shuffleArray } from "./utils";
//components
import { QuestionCard } from "./components/QuestionCard";
//types
import { Question, QuestionState } from "./API";

type AnswerObject = {
  question: string;
  answer: string;
  correct: boolean;
  correctAnswer: string;
}

const TOTAL_QUESTIONS = 10

export const App = () => {
  const [ loading, setLoading ] = useState(false)
  const [ questions, setQuestions] = useState<QuestionState[]>([])
  const [number, setNumber] = useState(0)
  const [userAnswers, setUserAnswers] = useState<AnswerObject[]>([])
  const [score, setScore] = useState(0)
  const [gameOver, setGameOver] = useState(true)

  console.log(fetchQuizQuestions(TOTAL_QUESTIONS, "easy"))

  // const startTrivia = () => {
  //   setLoading(true);
  //   setGameOver(false);

  //   fetchQuizQuestions(TOTAL_QUESTIONS, "easy")
  //   .then(setQuestions)
    
    

  //   setScore(0);
  //   setUserAnswers([]);
  //   setNumber(0);
  //   setLoading(false);

  // }

  const startTrivia = async () => {
      setLoading(true);
      setGameOver(false);

      const newQuestions = await fetchQuizQuestions(TOTAL_QUESTIONS, "easy")

      setQuestions(newQuestions)

      setScore(0);
      setUserAnswers([]);
      setNumber(0);
      setLoading(false)
  }

  const checkAnswer = (e: React.MouseEvent<HTMLButtonElement>) => {

  }


  const nextQuestion = () => {

  }

  return (
    <>
    <div className="App">
      <h1>REACT QUIZ</h1>
      {gameOver || userAnswers.length === TOTAL_QUESTIONS ? <button className="start" onClick={startTrivia}>
        Start
      </button> : null}
      <p className="score">Score: {score}</p>
      { loading ? <p>Loading Questions...</p> : null}
      <QuestionCard 
        questionNr={number + 1}
        totalQuestions={TOTAL_QUESTIONS}
        question={questions[number]?.question}
        answers={questions[number]?.answers}
        userAnswer={userAnswers ? userAnswers[number] : undefined}
        callback={checkAnswer}
      />
      <button className="next" onClick={nextQuestion}>
        Next
      </button>
    </div>
    </>
  );
}