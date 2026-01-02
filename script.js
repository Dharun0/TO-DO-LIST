function addTask() {
  const taskInput = document.getElementById("taskInput");
  const taskText = taskInput.value.trim();

  if (taskText === "") {
    alert("Please enter a task");
    return;
  }

  const li = document.createElement("li");
  li.innerHTML = `
    ${taskText}
    <button onclick="removeTask(this)">Done</button>
  `;

  document.getElementById("taskList").appendChild(li);
  taskInput.value = "";
}

function removeTask(button) {
  button.parentElement.remove();
}
