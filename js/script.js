const allCircleCheckboxes = document.querySelectorAll(".circle-checkbox");
const allInputFields = document.querySelectorAll(".goals-container-input");
const errorLabel = document.querySelector(".error-label");
const progressBar = document.querySelector(".progress-bar");
const progressAmount = document.querySelector(".progress-amount");
const progressLabel = document.querySelector(".progress-label");
const bottomMotivation = document.querySelector(".bottom-motivation");

// const allGoals = {
//   first: {
//     name: "Learn JS",
//     completed: false,
//   },
//   second: {
//     name: "Learn JS",
//     completed: false,
//   },
//   third: {
//     name: "Learn JS",
//     completed: false,
//   },
// };

// const allGoals = {}; //Empty Object
const allGoals = JSON.parse(localStorage.getItem("allGoals")) || {};
let completedGoalsCount = Object.values(allGoals).filter(
  (task) => task.completed
).length;
progressAmount.style.width = `${(completedGoalsCount / 3) * 100}%`;
progressAmount.firstElementChild.innerText = `${completedGoalsCount}/3 completed`;

const allQuotes = [
  "Raise the bar by completing your goals!",
  "Well begun is half done!",
  "Just a step away, keep going!",
  "Whoa! You just completed all the goals, time for chill :D",
];
if (completedGoalsCount > 0) {
  bottomMotivation.innerText = `“Keep Going, You’re making great progress!”`;
} else {
  bottomMotivation.innerText = `“Move one step ahead, today!”`;
}
progressLabel.innerText = allQuotes[completedGoalsCount];

allCircleCheckboxes.forEach((checkbox) => {
  //Checks whether the value is present inside the field or not
  checkbox.addEventListener("click", (e) => {
    const allGoalsAdded = [...allInputFields].every((input) => {
      return input.value;
    });

    if (allGoalsAdded) {
      checkbox.parentElement.classList.toggle("completed"); //⭐Use toggle instead of add
      const inputId = checkbox.nextElementSibling.id;
      allGoals[inputId].completed = !allGoals[inputId].completed;
      completedGoalsCount = Object.values(allGoals).filter(
        (task) => task.completed
      ).length;
      progressAmount.style.width = `${(completedGoalsCount / 3) * 100}%`;
      progressAmount.firstElementChild.innerText = `${completedGoalsCount}/${allInputFields.length} completed`;
      progressLabel.innerText = allQuotes[completedGoalsCount];
      if (completedGoalsCount > 0) {
        bottomMotivation.innerText = `“Keep Going, You’re making great progress!”`;
      } else {
        bottomMotivation.innerText = `“Move one step ahead, today!”`;
      }
      localStorage.setItem("allGoals", JSON.stringify(allGoals));
    } else {
      //Show error when user tries to operate the checkbox without feeding string into the input field.
      errorLabel.parentElement.classList.add("show-error");
    }
  });
});

//Removing the caution once the user starts to type in the field.
allInputFields.forEach((field) => {
  if (allGoals[field.id]) {
    field.value = allGoals[field.id].task;
    if (allGoals[field.id].completed) {
      field.parentElement.classList.add("completed");
    }
  }

  field.addEventListener("focus", () => {
    errorLabel.parentElement.classList.remove("show-error");
  });

  field.addEventListener("input", (e) => {
    if (allGoals[field.id] && allGoals[field.id].completed) {
      field.value = allGoals[field.id].task;
      return;
    }
    allGoals[field.id] = {
      task: field.value,
      completed: false,
    }; //Putting key-value pairs in the object.
    localStorage.setItem("allGoals", JSON.stringify(allGoals));
  });
});
