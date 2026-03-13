// ==================== Shared functions ====================
function createTodoTable(todoList, todoListSelector, nameInputSelector, dateInputSelector, addButtonSelector, storageKey, defaultTasks) {
  // Set defaults if empty
  if (todoList.length === 0) {
    todoList = defaultTasks;
  }

  function renderTodoList() {
    let todoListHTML = '';

    todoList.forEach((todoObject, index) => {
      const { name, dueDate } = todoObject;
      const html = `
        <div class="ciao">${name}</div>
        <div class="ciao2">${dueDate}</div>
        <button class="delete-todo-button"> Delete </button>
      `;
      todoListHTML += html;
    });

    document.querySelector(todoListSelector).innerHTML = todoListHTML;

    document.querySelectorAll(`${todoListSelector} .delete-todo-button`).forEach((deleteButton, index) => {
      deleteButton.addEventListener('click', () => {
        todoList.splice(index, 1);
        renderTodoList();
        saveToStorage();
      });
    });
  }

  function addTodo() {
    const name = document.querySelector(nameInputSelector).value;
    const dueDate = document.querySelector(dateInputSelector).value;

    todoList.push({ name, dueDate });

    document.querySelector(nameInputSelector).value = '';
    document.querySelector(dateInputSelector).value = '';

    renderTodoList();
    saveToStorage();
  }

  function saveToStorage() {
    localStorage.setItem(storageKey, JSON.stringify(todoList));
  }

  document.querySelector(addButtonSelector).addEventListener('click', addTodo);

  renderTodoList();
  return todoList; // return updated array reference if needed
}

// ==================== Table 1 ====================
let todoList = JSON.parse(localStorage.getItem('todoList')) || [];

todoList = createTodoTable(
  todoList,
  '.js-todo-list',
  '.js-name-input',
  '.js-due-date-input',
  '.js-add-todo-button',
  'todoList',
  [
    { name: 'make dinner', dueDate: '2022-12-22' },
    { name: 'wash dishes', dueDate: '2022-12-22' }
  ]
);

// ==================== Table 2 ====================
let todoList2 = JSON.parse(localStorage.getItem('todoList2')) || [];

todoList2 = createTodoTable(
  todoList2,
  '.js-todo-list-2',
  '.js-name-input-2',
  '.js-due-date-input-2',
  '.js-add-todo-button-2',
  'todoList2',
  [
    { name: 'current project', dueDate: '2025-09-02' },
    { name: 'next project', dueDate: '2025-09-16' }
  ]
);