import { shuffleArray } from "./utils"

export type Question = {
    category: string;
    correct_answer: string;
    difficulty: string;
    incorrect_answers: string[];
    question: string;
    type: string;
}

export type QuestionState = Question & {
    answers: string[]
}

export type Difficulty = "easy" | "medium" | "hard"

// export const fetchQuizQuestions = (amount: number, difficulty: Difficulty) => {
//     const endpoint = `https://opentdb.com/api.php?amount=${amount}&difficulty=${difficulty}&type=multiple`
//     return fetch(endpoint)
//         .then(res => res.json())
//         .then(data => (data.results.map((question: Question) => (
//             {
//                 ...question,
//                 answers: shuffleArray([...question.incorrect_answers, question.correct_answer])
//             }
//         ))))
    
// }

export const fetchQuizQuestions = async (amount: number, difficulty: Difficulty) => {
    const endpoint = `https://opentdb.com/api.php?amount=${amount}&difficulty=${difficulty}&type=multiple`
    const data = await( await fetch(endpoint)).json()

    console.log(data)
    
    return data.results.map((question: Question) => (
        {
            ...question,
            answers: shuffleArray([...question.incorrect_answers, question.correct_answer])
        }
    ))
}