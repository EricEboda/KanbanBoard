let tasks = [];
let boards = [];
let draggedItem = null;

input = document.querySelector('#projectName');
settings = {
    maxLen: 35,
}
keys = {
    'backspace': 8,
    'shift': 16,
    'ctrl': 17,
    'alt': 18,
    'delete': 46,
    // 'cmd':
    'leftArrow': 37,
    'upArrow': 38,
    'rightArrow': 39,
    'downArrow': 40,
}
utils = {
    special: {},
    navigational: {},
    isSpecial(e) {
        return typeof this.special[e.keyCode] !== 'undefined';
    },
    isNavigational(e) {
        return typeof this.navigational[e.keyCode] !== 'undefined';
    }
}
utils.special[keys['backspace']] = true;
utils.special[keys['shift']] = true;
utils.special[keys['ctrl']] = true;
utils.special[keys['alt']] = true;
utils.special[keys['delete']] = true;
utils.navigational[keys['upArrow']] = true;
utils.navigational[keys['downArrow']] = true;
utils.navigational[keys['leftArrow']] = true;
utils.navigational[keys['rightArrow']] = true;
input.addEventListener('keydown', function(event) {
  let len = event.target.innerText.trim().length;
  hasSelection = false;
  selection = window.getSelection();
  isSpecial = utils.isSpecial(event);
  isNavigational = utils.isNavigational(event);
  
  if (selection) {
    hasSelection = !!selection.toString();
  }
  
  if (isSpecial || isNavigational) {
    return true;
  }
  
  if (len >= settings.maxLen && !hasSelection) {
    event.preventDefault();
    return false;
  }
  
});

function deleteButton(item) {
    tasks.splice(item, 1)
    document.getElementById(`task${item + 1}`).remove();
}

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
                this.style.backgroundColor = 'rgba(0, 0, 0, 0.3)';
            });
            list.addEventListener('dragleave', function (e) {
                this.style.backgroundColor = 'rgb(235,236,240)';
            })
            list.addEventListener('drop', function (e) {
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

boards = JSON.parse(localStorage.getItem("boards") || "[]");

function saveBoard() {
    let projectTitle = document.getElementById("projectName").textContent
    if (projectTitle) {
        const board = {
            id: window.crypto.getRandomValues(new Int8Array(3)).join(""),
            title: document.getElementById("projectName").textContent,
            tasks: tasks
        }
        boards.push(board)
        alert("Your board has been saved.");
        window.location.replace("/homepage.html");
        localStorage.setItem("boards", JSON.stringify(boards));
    } else {
        alert("Your board must have a name.");
    }
}