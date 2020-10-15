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


class List extends Model {}
    List.init({
        title: DataTypes.STRING
    }, {sequelize, modelName: 'list'})       


class Task extends Model {}
   Task.init({
        title: DataTypes.STRING,
    }, {sequelize, modelName: 'task'})   




User.hasMany(Board, {as: "boards"})
Board.belongsTo(User)
Board.hasMany(List, {as: "lists"})
List.belongsTo(Board)
List.hasMany(Task, {as: "tasks"})
Task.belongsTo(List)
    
    
 module.exports = {User, Board, List, Task, sequelize}   