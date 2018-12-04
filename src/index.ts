import Server from './server'

function main() {
  const server = new Server()
  server.get((req, res) => {
    res.write('ECHO: ' + req.body)
    res.end()
  })
  server.listen(8080)
}

main()
