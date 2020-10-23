class User{
    constructor(form){
    this.id = window.crypto.getRandomValues(new Uint8Array(2)).join("")
    this.name = form.get('name');
    this.url = form.get('url');
    }
}

const users = (localStorage.getItem('usersData') ? JSON.parse(localStorage.getItem('usersData')) : [])

const createUser = () => {
    const data = new FormData(form)
    const user = new User(data)
    console.log(user)
    users.push(user)
    console.log(users)
    document.getElementById('userList').innerHTML = `${users.map(user => `<option value="${user.id}">${user.name}</option>`).join("")}`
    localStorage.setItem("usersData", JSON.stringify(users)); 
    usersData = JSON.parse(localStorage.getItem("usersData") || "[]")
    closeForm()
   
}

const chooseUser = () => {
    const id = document.getElementById('userList').value
    const userData = users.findIndex(user => (id === user.id))
    
    if (id === users[userData].id ){
        document.getElementById('avatar-placeholder').src = users[userData].url
        document.getElementById('name-placeholder').innerHTML = users[userData].name
    }
}

localStorage.setItem("usersData", JSON.stringify(users)); 
let usersData = JSON.parse(localStorage.getItem("usersData") || "[]")
console.log("# of users:" + usersData.length);