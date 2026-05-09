const apiUrl = "/tasks";

async function loadTasks() {
    const response = await fetch(apiUrl);
    const tasks = await response.json();

    const taskList = document.getElementById("taskList");
    taskList.innerHTML = "";

    tasks.forEach(task => {
        const li = document.createElement("li");

        li.innerHTML = `
            ${task.task}
            <button onclick="deleteTask('${task._id}')">Delete</button>
        `;

        taskList.appendChild(li);
    });
}

async function addTask() {
    const taskInput = document.getElementById("taskInput");

    if(taskInput.value === "") {
        alert("Enter a task");
        return;
    }

    await fetch(apiUrl, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            task: taskInput.value
        })
    });

    taskInput.value = "";
    loadTasks();
}

async function deleteTask(id) {
    await fetch(`${apiUrl}/${id}`, {
        method: "DELETE"
    });

    loadTasks();
}

loadTasks();