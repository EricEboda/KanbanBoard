const {Sequelize, Model, DataTypes} = require('sequelize')
const path = require('path')
const sequelize = process.env.NODE_ENV === 'test'
    ? new Sequelize('sqlite::memory:', null, null, {dialect: 'sqlite'})
    : new Sequelize({dialect: 'sqlite', storage: path.join(__dirname, 'data.db')})


class User extends Model {}
    User.init({
        name: DataTypes.STRING,
        image: DataTypes.STRING
    }, {sequelize, modelName: 'user'})


class Board extends Model {}
    Board.init({
        title: DataTypes.STRING,
        image: DataTypes.STRING
    }, {sequelize, modelName: 'board'})    


class Task extends Model {}
   Task.init({
        title: DataTypes.STRING,
    }, {sequelize, modelName: 'task'})   


User.hasMany(Board, {as: "boards"})
Board.belongsTo(User)
Board.hasMany(Task, {as: "tasks"})
Task.belongsTo(Board)
    
 module.exports = {User, Board, Task, sequelize}   