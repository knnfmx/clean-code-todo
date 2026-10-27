const taskInput = document.getElementById('new-task');
const addButton = document.querySelector('button');
const incompleteTaskHolder = document.getElementById('incomplete-tasks');
const completedTasksHolder = document.getElementById('completed-tasks');

function createNewTaskElement(taskString) {
  const listItem = document.createElement('li');
  listItem.className = 'task-item';

  const checkBox = document.createElement('input');
  checkBox.type = 'checkbox';
  checkBox.className = 'task-checkbox';

  const label = document.createElement('label');
  label.className = 'task-label';
  label.innerText = taskString;

  const editInput = document.createElement('input');
  editInput.type = 'text';
  editInput.className = 'task-edit-input';

  const editButton = document.createElement('button');
  editButton.className = 'edit-btn';
  editButton.innerText = 'Edit';

  const deleteButton = document.createElement('button');
  deleteButton.className = 'delete-btn';

  const deleteButtonImg = document.createElement('img');
  deleteButtonImg.className = 'delete-icon';
  deleteButtonImg.src = './remove.svg';
  deleteButtonImg.alt = 'Delete';
  deleteButton.appendChild(deleteButtonImg);

  listItem.appendChild(checkBox);
  listItem.appendChild(label);
  listItem.appendChild(editInput);
  listItem.appendChild(editButton);
  listItem.appendChild(deleteButton);

  return listItem;
}

function addTask() {
  if (!taskInput.value) return;
  const listItem = createNewTaskElement(taskInput.value);
  incompleteTaskHolder.appendChild(listItem);
  bindTaskEvents(listItem, taskCompleted);
  taskInput.value = '';
}

function editTask() {
  const listItem = this.parentNode;
  const editInput = listItem.querySelector('.task-edit-input');
  const label = listItem.querySelector('.task-label');
  const editBtn = listItem.querySelector('.edit-btn');
  const containsClass = listItem.classList.contains('editMode');

  if (containsClass) {
    label.innerText = editInput.value;
    editBtn.innerText = 'Edit';
  } else {
    editInput.value = label.innerText;
    editBtn.innerText = 'Save';
  }

  listItem.classList.toggle('editMode');
}

function deleteTask() {
  const listItem = this.parentNode;
  const ul = listItem.parentNode;
  ul.removeChild(listItem);
}

function taskCompleted() {
  const listItem = this.parentNode;
  completedTasksHolder.appendChild(listItem);
  bindTaskEvents(listItem, taskIncomplete);
}

function taskIncomplete() {
  const listItem = this.parentNode;
  incompleteTaskHolder.appendChild(listItem);
  bindTaskEvents(listItem, taskCompleted);
}

function bindTaskEvents(taskListItem, checkBoxEventHandler) {
  const checkBox = taskListItem.querySelector('.task-checkbox');
  const editButton = taskListItem.querySelector('.edit-btn');
  const deleteButton = taskListItem.querySelector('.delete-btn');

  editButton.onclick = editTask;
  deleteButton.onclick = deleteTask;
  checkBox.onchange = checkBoxEventHandler;
}

addButton.onclick = addTask;
addButton.addEventListener('click', addTask);

for (let i = 0; i < incompleteTaskHolder.children.length; i++) {
  bindTaskEvents(incompleteTaskHolder.children[i], taskCompleted);
}

for (let i = 0; i < completedTasksHolder.children.length; i++) {
  bindTaskEvents(completedTasksHolder.children[i], taskIncomplete);
}
