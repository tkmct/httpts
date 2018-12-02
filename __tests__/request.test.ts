import { parse } from '../src/request'

test('request parser', () => {
  const req =
    'GET / HTTP/1.1\r\nHost: localhost:8080\r\nUser-Agent: curl/7.54.0\r\nAccept: */*\r\n\r\n'

  const request = parse(req)

  expect(request.header.Host).toBe('localhost:8080')
})
