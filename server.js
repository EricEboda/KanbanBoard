const express = require('express')
const {User, Board, Task, sequelize} = require('./model')
const app = express()
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
const path = require('path');

app.use(express.static(path.join(__dirname, 'public')))

app.get('/user', async(req, res) => {
    const users = await User.findAll()
    res.send(users)
})


app.listen(3000, () => console.log("app running on localhost 3000"))