import * as net from 'net'

function main() {
  const server = net.createServer(socket => {
    socket.on('data', buffer => {
      console.info(JSON.stringify(buffer.toString()))

      socket.write('Request sent')
      socket.end()
    })
  })

  server.listen(8080, 'localhost')
}

main()
