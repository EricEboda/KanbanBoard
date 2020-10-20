let boards = localStorage.getItem("boards") || [];
console.log(boards)

for (let i = 0; i < boards.length; i++) {
    console.log(boards.length)
    boards = JSON.parse(localStorage.getItem("boards") || "[]");
    console.log(boards.length)
    let boardLink = document.createElement('a')
    boardLink.innerHTML = `Board: ${boards[i].title}`
    document.querySelector(".boardList").appendChild(boardLink)
    boardLink.setAttribute("class", "boardDisplay")
    boardLink.setAttribute("href", `/board.html?id=${boards[i].id}`);
}
