const {User, Board, Task, sequelize} = require('./model')


describe('User', () => {
    beforeAll( async () =>{
    await sequelize.sync()
    })


    test('can create user', async () => {
        const user = await User.create({name: 'Denise', image:'image.url'})
        expect(user.id).toBe(1)
    
    })
    
    
    test('can add a board to a user', async () => {
        const user = await User.create({name: 'Eric', image: 'image.url'})
        const board = await Board.create({title: "board2"})
        await user.addBoard(board)
        const users = await user.getBoards()
        expect (users.length).toBe(1)
    })


})



describe('Board', () => {
    beforeAll( async() => {
        await sequelize.sync()
    })

    test.skip('can create Board', async () => {
        const board = await Board.create({title: "Board1", image: "image.url"})
        expect(board.id).toBe(1)
    })
    
    test('can add task to Board', async() => {
        const board = await Board.create({title: "board2"})
        const task = await Task.create({title: 'task2'})
        await board.addTask(task)
        const boards = await board.getTasks()
        expect(boards.length).toBe(1)

    })
   
})    


describe('Task', () => {
    beforeAll( async() => {
        await sequelize.sync()
    })

    test.skip('can create Task', async () => {
        const task = await Task.create({title: "Task1"})
        expect(task.id).toBe(1)
    })


})    

