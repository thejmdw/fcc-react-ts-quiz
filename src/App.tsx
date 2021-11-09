import React, { useState } from "react";
import { fetchQuizQuestions } from "./API";
// import { shuffleArray } from "./utils";
//components
import { QuestionCard } from "./components/QuestionCard";
//types
import { Question, QuestionState } from "./API";
//styles
import { GlobalStyle, Wrapper } from "./App.styles";

export type AnswerObject = {
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
    if (!gameOver) {

      const answer = e.currentTarget.value;

      const correct = questions[number].correct_answer === answer

      if (correct) setScore(prev => prev + 1)

      const answerObj = { 
        question: questions[number].question,
        answer,
        correct,
        correctAnswer: questions[number].correct_answer
      }

      setUserAnswers(prev => [...prev, answerObj])
    }
  }


  const nextQuestion = () => {
    
    const nextQuestion = number + 1

    if (nextQuestion === TOTAL_QUESTIONS) {
      setGameOver(true)
    } else {
      setNumber(nextQuestion)
    }
  }

  return (
    <>
    <GlobalStyle />
    <Wrapper>
      <h1>REACT QUIZ</h1>
      {gameOver || userAnswers.length === TOTAL_QUESTIONS ? <button className="start" onClick={startTrivia}>
        Start
      </button> : null}
      {!gameOver ? <p className="score">Score: {score}</p> : null}
      { loading && <p>Loading Questions...</p>}
      {!loading && !gameOver ? <QuestionCard 
        questionNr={number + 1}
        totalQuestions={TOTAL_QUESTIONS}
        question={questions[number]?.question}
        answers={questions[number]?.answers}
        userAnswer={userAnswers ? userAnswers[number] : undefined}
        callback={checkAnswer}
      /> : null}
      {!gameOver && !loading && userAnswers.length === number + 1 ? 
      <button className="next" onClick={nextQuestion}>
        Next
      </button> : null}
    </Wrapper>
    </>
  );
}