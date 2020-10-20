const {User, Board, Task, sequelize} = require('./model')
const data = [
    {
        "title": "Grocery",
        "tasks": [
            {
                "id": 0,
                "text": "Go grocery shopping",
                "status": 1
            },
            {
                "id": 1,
                "text": "Buy 5 lemons",
                "status": 2
            },
            {
                "id": 2,
                "text": "Buy fruits",
                "status": 2
            },
            {
                "id": 3,
                "text": "Buy ingredients for cake",
                "status": 0
            }
        ]    
    },
    {
        "title": "Group Project",
        "tasks": [
            {
                "id": 0,
                "text": "Work on website styling",
                "status": 1
            },
            {
                "id": 1,
                "text": "Write the HTML content",
                "status": 2
            },
            {
                "id": 2,
                "text": "Install frameworks",
                "status": 2
            },
            {
                "id": 3,
                "text": "Create JavaScript functions",
                "status": 0
            }
        ]
    }
]

sequelize.sync().then(async () => {
    const taskQueue = data.map(async (_user) => {
        const user = await User.create({name: _user.name, image: _user.image})
        const boards = await Promise.all(_user.boards.map(async(_menu) => {
            const tasks = await Promise.all(_board.tasks.map(({title}) => Task.create({title})))
            const board = await Board.create({title: _board.title})
            return board.setTasks(tasks)
        }))
        return await user.setBoards(boards)
    })
    await Promise.all(taskQueue).catch(console.error)
})