const {User, Board, Task, sequelize} = require('./model')
const data = [
    {
        name: "Denise",
        image: "https://image.freepik.com/free-vector/portrait-african-american-woman-profile-avatar-young-black-girl_102172-418.jpg",
         boards: [
             {
                title: "Website Board",
                    tasks: [
                        {
                            title: "Wireframe must contain have desktop and responsive design"
                        },
                        {
                            title: "Website must have a server"
                        },
                        {
                            title: "Website must look nice"
                        }
                    ]
             },
             
             {
                 title: "Party Board",
                    tasks: [
                        {
                            title: "Party must have 150 invites sent"
                        },

                        {
                            title: "Party must have catering service"
                        }
                    ]
             }
         ]
    },
    {
        name: "Eric",
        image: "https://www.kindpng.com/picc/m/235-2356295_profile-picture-man-cartoon-hd-png-download.png",
        boards: [
            {
                title: "Game Project",
                    tasks: [
                        {
                            title: "Design character"
                        },

                        {
                            title: "Choose framework"
                        },
                        {
                            title:"Find sound effects"
                        }
                    ]
            },

            {
                title:"Positive Quotes",
                    tasks: [
                        {
                            title: "You always pass failure on the way to success."
                        },

                        {
                            title: "No one is perfect - that’s why pencils have erasers."
                        },
                        {
                            title: "Optimism is a happiness magnet. If you stay positive good things and good people will be drawn to you."
                        },
                    ]
            },

            {
                title:"Positive Quotes 2",
                    tasks: [
                        {
                            title:"If opportunity doesn’t knock, build a door."
                        }
                    ]
            }
        ]
    },

    {
        name:"Wisdom",
        image:"https://media.istockphoto.com/vectors/portrait-of-smiling-afro-man-bearded-businessman-in-suit-and-orange-vector-id1135342261?b=1&k=6&m=1135342261&s=612x612&w=0&h=fj-NK4jb2M4TAAUSlDV_20MhZI8U9ZHMLXXiPMz_yi8=",
        boards: []
    },

    {
        name:"Amy",
        image:"https://i.pinimg.com/736x/85/bb/63/85bb631ff0272c411f38d060825b4d3c.jpg",
        boards:[
            {
                title:"Placeholder 1"

            },
            {
                title:"Placeholder 2"
            }
        ]
    }

]


sequelize.sync().then(async () => {
    const taskQueue = data.map(async (_user) => {
        const user = await User.create({name: _user.name, image: _user.image})
        const boards = await Promise.all(_userr.boards.map(async(_menu) => {
            const tasks = await Promise.all(_board.tasks.map(({title}) => Task.create({title})))
            const board = await Board.create({title: _board.title})
            return board.setTasks(tasks)
        }))
        return await user.setBoards(boards)
    })
    await Promise.all(taskQueue).catch(console.error)
}) 