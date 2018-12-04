import * as net from 'net'
import { parse } from './request'

function main() {
  const server = net.createServer(socket => {
    socket.on('data', buffer => {
      const r = buffer.toString()
      const request = parse(r)
      console.log(request)

      socket.write('Request sent')
      socket.end()
    })
  })

  server.listen(8080, 'localhost')
}

main()
