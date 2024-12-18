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

/* DOM manipulation functions */
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

  const deleteBtn = taskElement.querySelector(".delete");
  deleteBtn.addEventListener("click", () => {
    if (
      confirm(
        `Deseja apagar a tarefa "${task.title}"? \nEsta ação é irreversível!`
      )
    ) {
      removeTaskById(task.id);
    }
  });

  const checkbox = taskElement.querySelector(".checkbox");
  checkbox.addEventListener("change", () => {
    toggleTaskCompletionById(task.id);
  });

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
    if (task && task.id !== undefined) {
      taskListContainer.appendChild(createTaskListItem(task));
    }
  });
};

/* CRUD functions */
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

const removeTaskById = (id) => {
  taskList = taskList.filter((task) => task.id !== id);
  console.log(`Tarefa com ID ${id} removida!`);
  renderTaskList();
};

const toggleTaskCompletionById = (id) => {
  taskList = taskList.map((task) =>
    task.id === id ? { ...task, completed: !task.completed } : task
  );
  console.log(`Status da tarefa com ID ${id} alterada!`);
};

/* filters */
const filterTasksByTitleSubstring = (e) => {
  const filtered = taskList.filter((task) =>
    task.title
      .toLocaleLowerCase("pt-BR")
      .includes(e.target.value.trim().toLocaleLowerCase("pt-BR"))
  );
  renderTaskList(filtered);
};

const filterTasksByCompletionStatus = (completed = false) => {
  const filtered = taskList.filter((task) => task.completed === completed);
  renderTaskList(filtered);
};

const filterTasksByToday = () => {
  const formattedToday = getFormattedCurrentDate();
  const filtered = taskList.filter((task) => task.taskDate === formattedToday);
  renderTaskList(filtered);
};

/* find */
const findTaskById = (e) => {
  const foundTask = taskList.find((task) =>
    task.id.toString().includes(e.target.value.trim())
  );

  foundTask !== -1 ? renderTaskList([foundTask]) : renderTaskList([]);
};

/* auxiliary function */
const getFormattedCurrentDate = () => {
  const formattedToday = new Date();
  const year = formattedToday.getFullYear();
  const month = String(formattedToday.getMonth() + 1).padStart(2, "0");
  const day = String(formattedToday.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

/** Order (sort) */
const renderTasksOrderedByCompletion = () => {
  renderTaskList([...taskList].sort((a, b) => a.completed - b.completed));
};

// Event to show initial data when DOM content loaded
document.addEventListener("DOMContentLoaded", renderTaskList);
