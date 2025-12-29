const taskInput = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");
const errorMsg = document.getElementById("errorMsg");
function getStoredTasks() {
  return JSON.parse(localStorage.getItem("tasks")) || [];
}
function saveTasksToStorage(tasks) {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}
function validateInput(taskText) {
  if (taskText === "") {
    errorMsg.innerText = "Task cannot be empty";
    return false;
  }

  const tasks = getStoredTasks();

  if (tasks.includes(taskText)) {
    errorMsg.innerText = "Task already exists";
    return false;
  }

  errorMsg.innerText = "";
  return true;
}
function createTaskElement(taskText) {
  const li = document.createElement("li");
  li.className = "task";
  li.innerHTML = `
        <span>${taskText}</span>

        <div>
            <button class="completeBtn">Done</button>
            <button class="deleteBtn">Delete</button>
        </div>
    `;
  li.querySelector(".completeBtn").onclick = () => toggleComplete(li);
  li.querySelector(".deleteBtn").onclick = () => deleteTask(li, taskText);
  taskList.appendChild(li);
}
function addTask() {
  const taskText = taskInput.value.trim();

  if (!validateInput(taskText)) return;

  const tasks = getStoredTasks();
  tasks.push(taskText);
  saveTasksToStorage(tasks);

  createTaskElement(taskText);

  taskInput.value = "";
}
addBtn.addEventListener("click", addTask);
taskInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") addTask();
});
function toggleComplete(taskElement) {
  taskElement.classList.toggle("completed");
}
function deleteTask(taskElement, taskText) {
  taskElement.remove();

  let tasks = getStoredTasks();
  tasks = tasks.filter((t) => t !== taskText);

  saveTasksToStorage(tasks);
}
function loadTasks() {
  const tasks = getStoredTasks();

  tasks.forEach((task) => {
    createTaskElement(task);
  });
}
document.addEventListener("DOMContentLoaded", loadTasks);
