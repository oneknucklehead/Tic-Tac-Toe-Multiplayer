const server = require('http').createServer()

const io = require('socket.io')(server, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
  },
})

io.on('connection', (socket) => {
  socket.on('played', (id) => {
    socket.broadcast.emit('played', id)
  })
  socket.on('reset', () => {
    // console.log('reset from server')
    socket.broadcast.emit('reset')
  })
})

server.listen(4000, console.log('Server running on port 4000'))
