// Task manager: add, edit, delete, move tasks between lists.

const taskInput = document.getElementById('new-task');
const addButton = document.querySelector('button'); // first button on the page
const incompleteTaskHolder = document.getElementById('incomplete-tasks');
const completedTasksHolder = document.getElementById('completed-tasks');

/**
 * Creates a new <li> element for the given task text.
 * @param {string} taskString
 * @returns {HTMLLIElement}
 */
function createNewTaskElement(taskString) {
  const listItem = document.createElement('li');

  const checkBox = document.createElement('input');
  checkBox.type = 'checkbox';

  const label = document.createElement('label');
  label.className = 'task';
  label.innerText = taskString;

  const editInput = document.createElement('input');
  editInput.type = 'text';
  editInput.className = 'task';

  const editButton = document.createElement('button');
  editButton.className = 'edit';
  editButton.innerText = 'Edit'; // innerText encodes special characters

  const deleteButton = document.createElement('button');
  deleteButton.className = 'delete';

  const deleteButtonImg = document.createElement('img');
  deleteButtonImg.src = './remove.svg';
  deleteButton.appendChild(deleteButtonImg);

  listItem.appendChild(checkBox);
  listItem.appendChild(label);
  listItem.appendChild(editInput);
  listItem.appendChild(editButton);
  listItem.appendChild(deleteButton);

  return listItem;
}

function addTask() {
  console.log('Add Task...');

  if (!taskInput.value) return;

  const listItem = createNewTaskElement(taskInput.value);
  incompleteTaskHolder.appendChild(listItem);
  bindTaskEvents(listItem, taskCompleted);

  taskInput.value = '';
}

function editTask() {
  console.log('Edit Task...');

  const listItem = this.parentNode;
  const editInput = listItem.querySelector('input[type="text"]');
  const label = listItem.querySelector('label');
  const editBtn = listItem.querySelector('.edit');
  const containsClass = listItem.classList.contains('editMode');

  if (containsClass) {
    // Switching from edit mode to view mode
    label.innerText = editInput.value;
    editBtn.innerText = 'Edit';
  } else {
    editInput.value = label.innerText;
    editBtn.innerText = 'Save';
  }

  listItem.classList.toggle('editMode');
}

function deleteTask() {
  console.log('Delete Task...');

  const listItem = this.parentNode;
  const ul = listItem.parentNode;
  ul.removeChild(listItem);
}

function taskCompleted() {
  console.log('Complete Task...');

  const listItem = this.parentNode;
  completedTasksHolder.appendChild(listItem);
  bindTaskEvents(listItem, taskIncomplete);
}

function taskIncomplete() {
  console.log('Incomplete Task...');

  const listItem = this.parentNode;
  incompleteTaskHolder.appendChild(listItem);
  bindTaskEvents(listItem, taskCompleted);
}

function ajaxRequest() {
  console.log('AJAX Request');
}

/**
 * Binds edit/delete/checkbox events to a task list item.
 * @param {HTMLLIElement} taskListItem
 * @param {Function} checkBoxEventHandler
 */
function bindTaskEvents(taskListItem, checkBoxEventHandler) {
  console.log('bind list item events');

  const checkBox = taskListItem.querySelector('input[type="checkbox"]');
  const editButton = taskListItem.querySelector('button.edit');
  const deleteButton = taskListItem.querySelector('button.delete');

  editButton.onclick = editTask;
  deleteButton.onclick = deleteTask;
  checkBox.onchange = checkBoxEventHandler;
}

// Wire up the "Add" button
addButton.onclick = addTask;
addButton.addEventListener('click', addTask);
addButton.addEventListener('click', ajaxRequest);

// Bind events for tasks already in the DOM
for (let i = 0; i < incompleteTaskHolder.children.length; i++) {
  bindTaskEvents(incompleteTaskHolder.children[i], taskCompleted);
}

for (let i = 0; i < completedTasksHolder.children.length; i++) {
  bindTaskEvents(completedTasksHolder.children[i], taskIncomplete);
}
