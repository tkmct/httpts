import { parse } from '../src/request'

test('parse header', () => {
  const req =
    'GET / HTTP/1.1\r\nHost: localhost:8080\r\nUser-Agent: curl/7.54.0\r\nAccept: */*\r\n\r\n'

  const request = parse(req)

  expect(request.header.Method).toBe('GET')
  expect(request.header.Host).toBe('localhost:8080')
  expect(request.header['User-Agent']).toBe('curl/7.54.0')
  expect(request.header.Accept).toBe('*/*')
})
