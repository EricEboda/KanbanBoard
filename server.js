const express = require('express')
const {User, Board, Task, sequelize} = require('./model')
const app = express()
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
const path = require('path');



app.use(express.static(path.join(__dirname, 'public')))






app.listen(3000, () => console.log("app running on localhost 3000"))