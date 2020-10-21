
class User{
    constructor(form){
    this.id = window.crypto.getRandomValues(new Uint8Array(2)).join("")
    this.name = form.get('name');
    this.url = form.get('url');
    }
}

const users = []

const createUser = () => {
    const data = new FormData(form)
    const user = new User(data)
    //console.log(data)
    users.push(user)
    console.log(users)
    document.getElementById('userList').innerHTML += `${users.map(user => `<option value="${user.id}">${user.name}</option>`).join("")}`
    //document.getElementById('profilePic').innerHTML += `${users.map(user => ` <img height="40px" width ="40px" src="${user.url}" selected>`).join("")}`
}


const form = document.getElementById('myForm')
form.addEventListener('submit', createUser)


const chooseUser = () => {
    const id = document.getElementById('userList').value
    const userData = users.findIndex(user => (id === user.id))
    console.log(id)
    console.log(users[userData])
    if (id === users[userData].id){
        document.getElementById('profileName').innerHTML += `<p>${users[userData].name}</p>`
        document.getElementById('profilePic').innerHTML += `<img height="40px" width ="40px" src="${users[userData].url}">`
    }
}

function openForm(){
    document.getElementById("myForm").style.display = "block";
    document.getElementById("form-popup").style.display = "block";
    console.log("open")
}

const openDisplay = document.getElementById("open")
openDisplay.addEventListener('click', openForm)


const closeForm = () => {
    document.getElementById("myForm").style.display = "none";
    document.getElementById("form-popup").style.display = "none";
}