let tasks = [];
let boards = [];
let draggedItem = null;
let userDraggedItem = null;

input = document.querySelector('#projectName');
inputTwo = document.querySelector("#projectDescription")
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
 

function keyDown(event) {
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
  
};

input.addEventListener('keydown', keyDown)
inputTwo.addEventListener('keydown', keyDown)

function deleteButton(item) {
    tasks.splice(item, 1)
    document.getElementById(`task${item + 1}`).remove();
}

function deleteUserButton(el) {
    if (el.parentElement.className == "image-container") { el.remove() }
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
    <div class="assign__task">
        <ul>
          ${tasks.slice(tasks.length - 1, tasks.length).map(task => `<li>${task.text}</li>`).join("")}
        </ul>
         <img src="https://www.flaticon.com/svg/static/icons/svg/565/565491.svg" id="deleteButton" onclick="deleteButton(${tasks.length - 1})" height="20px" width="20px">
    </div>
    <div class="assign-user">
     <aside ondragover="event.preventDefault()" class="image-container"  style="border: 1px solid grey; width: 2rem; height: 2rem;"></aside>
    </div>
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
                if (!(draggedItem == null)) {
                    draggedItem.style.display = 'flex';
                    draggedItem = null;
                }
            }, 0);
        })
        for (let j = 0; j < lists.length; j++) {
            const list = lists[j];
            list.addEventListener('dragover', function(e) {
                e.preventDefault();
            });
            list.addEventListener('dragenter', function (e) {
                e.preventDefault();
                if (!(draggedItem == null)) {this.style.backgroundColor = 'rgba(0, 0, 0, 0.3)'}
            });
            list.addEventListener('dragleave', function (e) {
                this.style.backgroundColor = 'rgb(235,236,240)';
            })
            list.addEventListener('drop', function (e) {
                if (!(draggedItem == null)) {
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
                }
            });
        }
    }

    const userList_items = document.querySelectorAll(".displayList-item");
    const userLists = document.querySelectorAll('.image-container');
    let clone = null
   
    for (let i = 0; i < userList_items.length; i++) {
        const userItem = userList_items[i]
        userItem.addEventListener('dragstart', function () {
            userDraggedItem = userItem;
            clone = userDraggedItem.cloneNode(true)
            setTimeout(function () {
            }, 0)
        })
        userItem.addEventListener('dragend', function () {
            setTimeout(function () {
                userDraggedItem = null;
            }, 0);
        })
        for (let j = 0; j < userLists.length; j++) {
            const userList = userLists[j];
            userList.addEventListener('dragover', function(e) {
                e.preventDefault();
            });
            userList.addEventListener('dragenter', function (e) {
                e.preventDefault();
                if (!(userDraggedItem == null)) {this.style.backgroundColor = 'rgba(0, 0, 0, 0.3)'}
            });
            userList.addEventListener('dragleave', function (e) {
                this.style.backgroundColor = 'rgb(235,236,240)';
            })
            userList.addEventListener('drop', function (e) {
                if (!(userDraggedItem == null)) {
                    if (!(this.hasChildNodes())) {
                        this.append(clone)
                        console.log(clone)
                    }
                    this.style.backgroundColor = 'rgb(235,236,240)';
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
            des: document.getElementById('projectDescription').textContent,
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

const allUserData = (localStorage.getItem('usersData') ? JSON.parse(localStorage.getItem('usersData')) : [])
const allUserDisplay = document.getElementById('displayUser')
allUserDisplay.innerHTML =  allUserData.map(user => `<div> <p>${user.name}</p> <img height="40px" width ="40px" draggable="true" class="displayList-item" onclick="deleteUserButton(this)" src="${user.url}"></div>`).join("")