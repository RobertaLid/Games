const questionElement = document.getElementById("question");
const answerElement = document.getElementById("answer");
const scoreElement = document.getElementById("score");
const feedback = document.querySelector('#output')

let score = 0;
let gameIsOver = (score) => {
  if (score === 10) {
    return true;
  }
  return false;
}

function generateQuestion() {
  const num1 = Math.floor(Math.random() * 20) + 1;
  const num2 = Math.floor(Math.random() * 10) + 1;
  const operator = getRandomOperator();
  const question = createQuestion(num1, num2, operator);
  questionElement.textContent = question;
}

function createQuestion(num1, num2, operator) {
  let question;
  switch (operator) {
    case "+":
      question = `${num1} + ${num2} = `;
      break;
    case "-":
      question = `${num1} - ${num2} = `;
      break;
    case "*":
      question = `${num1} * ${num2} = `;
      break;
  }
  return question;
}

function getRandomOperator() {
  const operators = [
      '+',
      '-',
      '*'];
  const randomIndex = Math.floor(Math.random() * operators.length);
  return operators[randomIndex];
}

function updateScore() {
  scoreElement.textContent = `Score: ${ score }`;
}

function checkAnswer(event) {
  event.preventDefault();
  const answer = parseInt(answerElement.value, 10);
  if (isNaN(answer)) {
      alert('Please enter a valid number');
      return;
  }
  const [num1, operator, num2] = questionElement.textContent.split(' ');
  const correctAnswer = calculateAnswer(parseInt(num1, 10), parseInt(num2, 10), operator);
  if (answer === correctAnswer) {
      score++;
      updateScore();
      generateQuestion();
      answerElement.value = '';
      feedback.innerHTML = 'Well done!';
  } else {
      feedback.innerHTML = 'Wrong!';
  }
}

function calculateAnswer(num1, num2, operator) {
  let answer;
  switch (operator) {
    case "+":
      answer = num1 + num2;
      break;
    case "-":
      answer = num1 - num2;
      break;
    case "*":
      answer = num1 * num2;
      break;
  }
  return answer;
}


generateQuestion();
updateScore();
answerElement.focus();
document.querySelector("form").addEventListener("submit", checkAnswer);
