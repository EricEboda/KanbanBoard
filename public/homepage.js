boards = JSON.parse(localStorage.getItem("boards") || "[]");
document.getElementById("userList").innerHTML = `${users.map(user => `<option value="${user.id}">${user.name}</option>`).join("")}`

for (let i = 0; i < boards.length; i++) {
    let boardLink = document.createElement('a')
    boardLink.innerHTML = boards[i].title
    document.querySelector(".boardList").appendChild(boardLink)
    boardLink.setAttribute("class", "boardDisplay")
    boardLink.setAttribute("href", `/board.html?id=${boards[i].id}`);
}



function openForm(){
    document.getElementById("myForm").style.display = "block";
    document.getElementById("form-popup").style.display = "block";
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