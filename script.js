const state = {
    tasks: []
}

let value = "";

const view = (state) => `
    <div class="grid-container lists">
        <div class="header">
            <h2>To Do List</h2>
        </div>
    
        <div class="controls">
            <h2>Tasks</h2>
            <section>
                <form onsubmit="app.run('add', this);return false;">
                    <input name="task" placeholder="Add a task" />
                    <button>Add</button>
                </form>
            </section>
        </div>

        <div class="left list">
            <h2>To Do</h2>
            <section id="todo-section">
                ${value}
            </section>
        </div>

        <div class="middle list">
            <h2>Doing</h2>
        </div>  

        <div class="right list">
            <h2>Completed</h2>
        </div>
    </div>
`

/* DELETE TASK FUNCTION */
function deleteButton(item) {
    state.tasks.splice(item, 1)
    document.getElementById(`task${item + 1}`).remove();
}

const update = {
    add: (state, form) => {
        const task = {
            id: state.tasks.length,
            text: new FormData(form).get('task'),
            status: 0
        }
        state.tasks.push(task)

        value = document.getElementById("todo-section").innerHTML += `
            <div draggable="true" class="list-item" id="task${state.tasks.length}">
                <ul>
                    ${state.tasks.slice(state.tasks.length - 1, state.tasks.length).map(task => `<li>${task.text}</li>`).join("")}
                </ul>
                <button id="deleteButton" onclick="deleteButton(${state.tasks.length - 1})">❌</button>
            </div>
        `
        const list_items = 

        return state
    }   
}

app.start('todoApp', state, view, update)