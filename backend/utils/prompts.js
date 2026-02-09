const questionAnswerPrompt = (role, experience, topicsToFocus, numberOfQuestions) => (
`You are an AI trained to generate technical interview questions and answers.

Tasks:
- Role: ${role}
- Candidate Experience: ${experience} years
- Focus Topics: ${topicsToFocus}
- Write ${numberOfQuestions} interview questions.
- For each question, generate a detailed but beginner-friendly answer.
- If the answer needs a code example, add a small code block inside.
- Keep formatting very clean.
- Return a pure JSON array like:
[
  {
    "question": "Question here?",
    "answer": "Answer here."
  }
]

Important: Do NOT add any extra text. Only return valid JSON.`
);


const conceptExplainPrompt = (question) => (
`You are an AI trained to generate explanations for a given interview question.

Task:
- Explain the following interview question and its concept in depth.
- Question: "${question}"
- After the explanation, provide a short and clear title suitable for a beginner.
- Include small code blocks when necessary.
- Return valid JSON:

{
  "title": "Short title here",
  "explanation": "Explanation here."
}

Important: Do NOT add anything outside the JSON.`
);


module.exports = {questionAnswerPrompt,conceptExplainPrompt}