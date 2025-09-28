let todos = [];

async function loadTodos() {
    try {
        const response = await fetch('/api/todos');
        todos = await response.json();
        renderTodos();
        updateStats();
    } catch (error) {
        console.error('加载待办事项失败:', error);
    }
}

async function addTodo() {
    const input = document.getElementById('todoInput');
    const text = input.value.trim();

    if (!text) return;

    try {
        const response = await fetch('/api/todos', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ text })
        });

        const newTodo = await response.json();
        todos.push(newTodo);
        input.value = '';
        renderTodos();
        updateStats();
    } catch (error) {
        console.error('添加待办事项失败:', error);
    }
}

async function toggleTodo(id) {
    const todo = todos.find(t => t.id === id);
    if (!todo) return;

    try {
        const response = await fetch(`/api/todos/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ completed: !todo.completed })
        });

        const updatedTodo = await response.json();
        const index = todos.findIndex(t => t.id === id);
        todos[index] = updatedTodo;
        renderTodos();
        updateStats();
    } catch (error) {
        console.error('更新待办事项失败:', error);
    }
}

async function deleteTodo(id) {
    try {
        await fetch(`/api/todos/${id}`, { method: 'DELETE' });
        todos = todos.filter(t => t.id !== id);
        renderTodos();
        updateStats();
    } catch (error) {
        console.error('删除待办事项失败:', error);
    }
}

function renderTodos() {
    const todoList = document.getElementById('todoList');
    todoList.innerHTML = '';

    todos.forEach(todo => {
        const todoItem = document.createElement('div');
        todoItem.className = `todo-item ${todo.completed ? 'completed' : ''}`;
        todoItem.innerHTML = `
            <input type="checkbox" ${todo.completed ? 'checked' : ''}
                   onchange="toggleTodo(${todo.id})">
            <span class="todo-text">${todo.text}</span>
            <button class="delete-btn" onclick="deleteTodo(${todo.id})">删除</button>
        `;
        todoList.appendChild(todoItem);
    });
}

function updateStats() {
    const total = todos.length;
    const completed = todos.filter(t => t.completed).length;
    const pending = total - completed;

    document.getElementById('stats').innerHTML =
        `📊 总计: ${total} | ✅ 完成: ${completed} | ⏳ 待完成: ${pending}`;
}

document.getElementById('todoInput').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        addTodo();
    }
});

loadTodos();