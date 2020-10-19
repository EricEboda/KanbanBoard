let tasks = [];

/* DELETE TASK FUNCTION */
function deleteButton(item) {
    tasks.splice(item, 1)
    document.getElementById(`task${item + 1}`).remove();
}

let draggedItem = null;

function addButton(taskInput) {
    console.log(taskInput.value)

    const task = {
        id: tasks.length,
        text: taskInput.value,
        status: 0
    }

    tasks.push(task)

    let taskDiv = document.createElement('div')
    document.getElementById("todo-section").appendChild(taskDiv)
    taskDiv.setAttribute("id", `task${tasks.length}`);
    taskDiv.setAttribute("class", "list-item");
    taskDiv.setAttribute("draggable", "true");
           
    document.getElementById(`task${tasks.length}`).innerHTML += `
    <ul>
        ${tasks.slice(tasks.length - 1, tasks.length).map(task => `<li>${task.text}</li>`).join("")}
    </ul>
    <img src="https://www.flaticon.com/svg/static/icons/svg/1168/1168643.svg" id="deleteButton" onclick="deleteButton(${tasks.length - 1})" height="20px" width="20px">
    `

    const list_items = document.querySelectorAll(".list-item");
    const lists = document.querySelectorAll('.list');
   
    for (let i = 0; i < list_items.length; i++) {
        const item = list_items[i]
        item.addEventListener('dragstart', function () {
            draggedItem = item;
            setTimeout(function () {
                item.style.display = 'none';
            }, 0)
        })
        item.addEventListener('dragend', function () {
            setTimeout(function () {
                draggedItem.style.display = 'flex';
                draggedItem = null;
            }, 0);
        })
        for (let j = 0; j < lists.length; j++) {
            const list = lists[j];
            list.addEventListener('dragover', function(e) {
                e.preventDefault();
            });
            list.addEventListener('dragenter', function (e) {
                e.preventDefault();
                this.style.backgroundColor = 'rgba(0, 0, 0, 0.2)';
            });
            list.addEventListener('dragleave', function (e) {
                this.style.backgroundColor = 'rgb(235,236,240)';
            })
            list.addEventListener('drop', function (e) {
                console.log(draggedItem)
                this.append(draggedItem)
                this.style.backgroundColor = 'rgb(235,236,240)';

                let draggedId = draggedItem.id.charAt(4) - 1  
                let draggedObject = tasks.find(x => x.id == draggedId);
                let itemParent = draggedItem.parentElement.className;

                if (itemParent == "left list") {
                    draggedObject.status = 0
                    console.log(draggedObject.status)
                } else if (itemParent == "middle list") {
                    draggedObject.status = 1
                    console.log(draggedObject.status)
                } else {
                    draggedObject.status = 2
                    console.log(draggedObject.status)
                }
                
            });
        }
    }
    return false;
}