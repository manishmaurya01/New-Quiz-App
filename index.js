const easyDiff = document.querySelector(".easy");
const mediumDiff = document.querySelector(".medium");
const hardDiff = document.querySelector(".hard");

// Array to store quiz data
const datas = [{ question: "", answer: "", Option: [] }];

let diffname = "";
let setcategorie = "";
easyDiff.addEventListener("click", () => {
  diffname = "easy";
  loaddata();
  document.querySelector(".difficulty").style.display = "none";
  document.querySelector(".display").style.display = "block";
});
mediumDiff.addEventListener("click", () => {
  diffname = "medium";
  loaddata();
  document.querySelector(".difficulty").style.display = "none";
  document.querySelector(".display").style.display = "block";
});
hardDiff.addEventListener("click", () => {
  diffname = "hard";
  loaddata();
  document.querySelector(".difficulty").style.display = "none";
  document.querySelector(".display").style.display = "block";
});

function addcategory(element) {
  setcategorie = element.getAttribute("category");
  document.querySelector(".categories").style.display = "none";
  document.querySelector(".difficulty").style.display = "block";
}

// Function to load data from an API
function loaddata() {
  // Fetch data from the API
  fetch(
    ` https://opentdb.com/api.php?amount=1&category=${setcategorie}&difficulty=${diffname}&type=multiple`
  )
    .then((Response) => {
      return Response.json();
    })
    .then((data) => {
      // Fill data from API response
      filldata(data);
      // Add data to the quiz
      adddata(data);
    })
    .catch((error) => console.log(error))
    .then(() => {
      document.querySelector(".startbtn").innerHTML = "Next Question";
    });

  resetQuiz();
}

// Function to fill data from API response
function filldata(data) {
  datas[0].question = data.results[0].question;
  datas[0].answer = data.results[0].correct_answer;
  datas[0].Option = data.results[0].incorrect_answers;
}

// Function to add data to the quiz with a shuffled correct answer
function adddata(data) {
  // Shuffle the options array (including the correct answer)
  const options = data.results[0].incorrect_answers;
  options.push(data.results[0].correct_answer);
  shuffleArray(options);

  // Fill the question text
  document.querySelector(".question").innerHTML = data.results[0].question;

  // Assign shuffled options to HTML elements
  const optionElements = document.querySelectorAll(".option");
  for (let i = 0; i < optionElements.length; i++) {
    optionElements[i].innerHTML = options[i];
    if (options[i] === data.results[0].correct_answer) {
      optionElements[i].setAttribute("data-correct", "true");
    } else {
      optionElements[i].setAttribute("data-correct", "false");
    }
  }
}

// Shuffle an array randomly
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

// Add click event listeners to options
// Select all elements with class "option" and loop through them
const options = document.querySelectorAll(".option");
options.forEach((option) => {
  // Add a click event listener to each "option"
  option.addEventListener("click", () => {
    // Determine if the clicked option is the correct answer
    const isCorrect = option.getAttribute("data-correct") === "true";

    // Loop through all options again to handle styling
    options.forEach((otherOption) => {
      if (otherOption === option) {
        // If it's the clicked option
        if (isCorrect) {
          option.classList.add("right-answer");
          option.style.backgroundColor = "#95d5b2";
          setTimeout(() => {
            option.style.backgroundColor = "";
          }, 600);
          loaddata();
          // Add "right-answer" class if it's correct and load next question
        } else {
          option.classList.add("wrong-answer"); // Add "wrong-answer" class if it's incorrect
        }
      }
    });
  });
});
// Function to reset the quiz
function resetQuiz() {
  options.forEach((option) => {
    option.classList.remove("right-answer", "wrong-answer");
  });
}

// dark mode

const lightBtn = document.getElementById("light");
const darkBtn = document.getElementById("dark");

let darkMode = false;
darkBtn.addEventListener("click", () => {
  darkMode = true;
  document.querySelector(".display") && document.body.classList.remove("light");
  document.querySelector(".display") && document.body.classList.add("dark");
  darkBtn.style.display = "none";
  lightBtn.style.display = "initial";
});

lightBtn.addEventListener("click", () => {
  darkMode = false;
  document.querySelector(".display") && document.body.classList.remove("dark");
  document.querySelector(".display") && document.body.classList.add("light");
  darkBtn.style.display = "initial";
  lightBtn.style.display = "none";
});
