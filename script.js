let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

function saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function renderTasks() {
    const taskList = document.getElementById('taskList');
    taskList.innerHTML = '';
    tasks.forEach((task, index) => {
        const li = document.createElement('li');
        li.className = task.completed ? 'completed' : '';
        li.innerHTML = `
            <button class="complete-btn" onclick="toggleTask(${index})">
                ${task.completed ? 'Скасувати' : 'Виконати'}
            </button>
            <span>${task.text}</span>
            <button class="delete-btn" onclick="deleteTask(${index})">Видалити</button>
        `;
        taskList.appendChild(li);
    });

    // Оновлення лічильників
    const completedCount = tasks.filter(task => task.completed).length;
    const pendingCount = tasks.length - completedCount;
    document.getElementById('completedCount').textContent = completedCount;
    document.getElementById('pendingCount').textContent = pendingCount;
}

function addTask() {
    const taskInput = document.getElementById('taskInput');
    const text = taskInput.value.trim();
    if (text) {
        tasks.push({ text, completed: false });
        taskInput.value = '';
        saveTasks();
        renderTasks();
    }
}

function toggleTask(index) {
    tasks[index].completed = !tasks[index].completed;
    saveTasks();
    renderTasks();
}

function deleteTask(index) {
    tasks.splice(index, 1);
    saveTasks();
    renderTasks();
}

document.getElementById('taskInput').addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        addTask();
    }
});

renderTasks();