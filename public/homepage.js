boards = JSON.parse(localStorage.getItem("boards") || "[]");
document.getElementById("userList").innerHTML = `${users.map(user => `<option value="${user.id}">${user.name}</option>`).join("")}`

for (let i = 0; i < boards.length; i++) {
    let boardDiv = document.createElement('span')
    let boardLink = document.createElement('a')
    let boardDes = document.createElement('p')
    boardLink.innerHTML = boards[i].title
    boardDes.innerHTML = boards[i].des
    boardDiv.appendChild(boardLink)
    boardDiv.appendChild(boardDes)
    document.querySelector(".boardList").appendChild(boardDiv)
    boardLink.setAttribute("class", "board-a")
    boardDiv.setAttribute("class", "board-div")
    boardDes.setAttribute("class", "board-p")
    boardLink.setAttribute("href", `/board.html?id=${boards[i].id}`);
    if(boardDes.innerHTML.includes("Describe your project")){
        boardDes.style.display = "none"
    }
}



function openForm(){
    document.getElementById("myForm").style.display = "flex";
    document.getElementById("form-popup").style.display = "flex";
    console.log("open")
}


const openDisplay = document.getElementById("open-btn")
openDisplay.addEventListener('click', openForm)



function closeForm (){
    document.getElementById("myForm").style.display = "none";
    document.getElementById("form-popup").style.display = "none";
}


const form = document.getElementById('myForm')
form.addEventListener('submit', createUser)