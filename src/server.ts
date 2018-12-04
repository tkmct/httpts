import * as net from 'net'
import { parse, Request } from './request'
import { Response } from './response'

class Server {
  private handler?: (req: Request, res: Response) => void
  private instance?: net.Server

  public listen(port: number) {
    this.instance = net
      .createServer(socket => {
        socket.on('data', buffer => {
          console.info(buffer.toString())
          const request = parse(buffer.toString())
          const response = {
            write: (body: string) => {
              socket.write(body)
            },
            end: () => {
              socket.end()
            }
          }
          if (this.handler) {
            this.handler(request, response)
          }
        })
      })
      .listen(port)
  }

  public get(handler: (req: Request, res: Response) => void) {
    this.handler = handler
  }

  public close() {
    if (!this.instance) {
      throw new Error('No server is created.')
    }
    this.instance.close()
    this.instance = undefined
  }
}

export default Server
