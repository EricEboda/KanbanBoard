boards = JSON.parse(localStorage.getItem("boards") || "[]");


for (let i = 0; i < boards.length; i++) {
    let boardLink = document.createElement('a')
    boardLink.innerHTML = boards[i].title
    document.querySelector(".boardList").appendChild(boardLink)
    boardLink.setAttribute("class", "boardDisplay")
    boardLink.setAttribute("href", `/board.html?id=${boards[i].id}`);
}
