let taskList = [
  {
    id: 1734222153003,
    title: "Estudar JavaScript",
    completed: false,
    taskDate: "2024-12-14",
  },
  {
    id: 1734222154797,
    title: "Fazer exercícios",
    completed: false,
    taskDate: "2024-12-13",
  },
];

const addNewTaskToList = (task) => {
  const newTask = {
    id: Date.now(),
    title: task.task,
    completed: false,
    taskDate: task["task-date"],
  };
  taskList.push(newTask);
  console.log(`Tarefa "${newTask.title}" adicionada com ID ${newTask.id}!`);
};

const handleNewTaskSubmission = (e) => {
  e.preventDefault();

  const formData = new FormData(e.target);
  const taskFormData = Object.fromEntries(formData.entries());
  addNewTaskToList(taskFormData); // Create a new task from form data

  e.target.reset();

  renderTaskList(); // Update task list on List
};

// Render only one task
const createTaskListItem = (task) => {
  const taskElement = document.createElement("li");
  taskElement.innerHTML = `
      <input class="checkbox" type="checkbox" name="task-checkbox" id="${
        task.id
      }" ${task.completed ? "checked" : ""}>
      <div class="task">
          <span class="task-title">${task.title}</span>
          <span class="task-date">${task.taskDate}</span>
      </div>
      <div class="delete">
          <img src="./img/trash-bold.svg" alt="">
      </div>
      `;

  return taskElement;
};

// Render all taskList
const renderTaskList = (filteredOrCustomTaskList) => {
  const taskListContainer = document.querySelector(".list");
  taskListContainer.innerHTML = "";

  const taskListToRender = Array.isArray(filteredOrCustomTaskList)
    ? filteredOrCustomTaskList
    : taskList;

  if (!taskListToRender || taskListToRender.length === 0) {
    taskListContainer.innerHTML = `<li>Você não possui tarefas</li>`;
    return;
  }

  taskListToRender.map((task) => {
    taskListContainer.appendChild(createTaskListItem(task));
  });
};

// Event to show initial data when DOM content loaded
document.addEventListener("DOMContentLoaded", renderTaskList);
