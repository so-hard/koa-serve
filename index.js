import app from './app.js'
import http from 'http'
import { main } from './db/mysql.js'

const port = 9900
// 可以监听多个app
const server = http.createServer(app.callback())
main()

server.listen(port, 'localhost')

server.on('error', onError)
server.on('listen', () => {
  console.log('Listening on 9900')
})

function onError(error) {
  if (error.syscall !== 'listen') {
    throw error
  }

  var bind = typeof port === 'string'
  // eslint-disable-next-line no-undef
    ? 'Pipe ' + port
    // eslint-disable-next-line no-undef
    : 'Port ' + port

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges')
      process.exit(1)
      break
    case 'EADDRINUSE':
      console.error(bind + ' is already in use')
      process.exit(1)
      break
    default:
      throw error
  }
}
