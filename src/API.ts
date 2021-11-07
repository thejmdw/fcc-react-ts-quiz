

type difficulty = "easy" | "medium" | "hard"

export const fetchQuizQuestions = (amount: number, difficulty: difficulty) => {
    const endpoint = `https://opentdb.com/api.php?amount=${amount}&difficulty=${difficulty}&type=multiple`
    return fetch(endpoint)
    .then(res => res.json())
    .then(data => console.log(data))
    
}