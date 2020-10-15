const {User, Board, List, Task, sequelize} = require('./model')


describe('User', () => {
    beforeAll( async () =>{
    await sequelize.sync()
    })


    test('can create user', async () => {
        const user = await User.create({name: 'Denise', image:'image.url'})
        expect(user.id).toBe(1)
    
    })


})



describe('Board', () => {
    beforeAll( async() => {
        await sequelize.sync()
    })

    test('can create Board', async () => {
        const board = await Board.create({title: "Board1", image: "image.url"})
        expect(board.id).toBe(1)
    })
    
   
   
})    


describe('List', () => {
    beforeAll( async() => {
        await sequelize.sync()
    })

    test('can create List', async () => {
        const list = await List.create({title: "List1"})
        expect(list.id).toBe(1)
    })

    
})    

describe('Task', () => {
    beforeAll( async() => {
        await sequelize.sync()
    })

    test('can create Task', async () => {
        const task = await Task.create({title: "Task1"})
        expect(task.id).toBe(1)
    })

})    

