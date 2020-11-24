// Selectors
const wholeInput = document.querySelector(".todo-add-input");
const inputField = document.querySelector(".item-input");
const inputBtn = document.querySelector(".add-btn");
const selectOption = document.querySelector(".todo-select-input select");
const todoList = document.querySelector(".todo-list");

let shakeTime = 100; // The delay speed of the field after each shake

// Functions
// Function to shake the input field when it is empty
const shakeInput = (x, y) => {
  wholeInput.style.transform = `translate(${x}px,${y}px)`;
};

const createList = (myTask) => {
  // Create your task
  const todoItem = document.createElement("div");
  todoItem.classList.add("todo-item");

  const item = `  <li class="task light">${myTask}</li>
                <div class="btn-grp">
                    <button class="btn btn-primary check-btn">
                        <i class="fa fa-check"></i>
                    </button>
                    <button class="btn btn-danger delete-btn">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>`;
  todoItem.innerHTML = item;
  todoList.appendChild(todoItem);

  //   Clear the input field
  inputField.value = "";

  todoItem.addEventListener("click", deleteCheck);
};

const deleteCheck = (e) => {
  // Fetching the specific item's delete button
  if (e.target.classList.contains("delete-btn")) {
    //   delete the task
    const deleteBtn = e.target;
    const thisTask = deleteBtn.parentElement.parentElement;
    // Task deletion animation
    thisTask.style.transform = "translateX(-15rem)";
    thisTask.style.opacity = 0;

    // When the transition of the task item gets ended we have to immediately remove this item
    thisTask.addEventListener("transitionend", () => {
      thisTask.remove();
    });
  } else if (e.target.classList.contains("check-btn")) {
    //   Mark the task
    const checkBtn = e.target;
    const thisTask = checkBtn.parentElement.parentElement;
    thisTask.classList.toggle("checked");
  }
};

const addTasks = (e) => {
  //   First checking wether the task is inputted or not
  let myTask = "";

  if (inputField.value === "" || inputField.value === null) {
    // Shake the field when no input given
    for (let i = 0; i < 6; i++) {
      // In 6 cycles the field will shake
      setTimeout(shakeInput, shakeTime * i, ((i % 2) * 2 - 1) * 20, 0); // Toggling the input positions by +20px and -20px
      setTimeout(shakeInput, shakeTime * (i + 1), 0, 0); // Get back to the original position after the end of the cycle
    }
  } else {
    // Add the task
    myTask = inputField.value;
    createList(myTask);
  }
};

const filterTask = (e) => {
  const todoItem = document.querySelectorAll(".todo-item");
  let filterOption = selectOption.value;
  //   console.log(filterOption);
  todoItem.forEach((item) => {
    switch (filterOption) {
      case "All":
        item.style.display = "flex";
        break;
      case "Completed":
        if (item.classList.contains("checked")) {
          item.style.display = "flex";
        } else {
          item.style.display = "none";
        }
        break;
      case "Pending":
        if (!item.classList.contains("checked")) {
          item.style.display = "flex";
        } else {
          item.style.display = "none";
        }
        break;
    }
  });
};

// Event listeners
inputBtn.addEventListener("click", addTasks);
selectOption.addEventListener("click", filterTask);
