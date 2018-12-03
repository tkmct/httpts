import { parse, parseHeader } from '../src/request'

describe('Parse Request', () => {
  test('parse', () => {
    const req =
      'GET / HTTP/1.1\r\nHost: localhost:8080\r\nUser-Agent: curl/7.54.0\r\nAccept: */*\r\n\r\n'

    const request = parse(req)
    expect(request.body).toBeNull()
  })

  test('parseHeader valid', () => {
    const rawHeader =
      'GET / HTTP/1.1\r\nHost: localhost:8080\r\nUser-Agent: curl/7.54.0\r\nAccept: */*\r\n'

    const headers = parseHeader(rawHeader)
    expect(headers.Method).toBe('GET')
    expect(headers.Host).toBe('localhost:8080')
    expect(headers['User-Agent']).toBe('curl/7.54.0')
    expect(headers.Accept).toBe('*/*')
  })

  test('parseHeader invalid', () => {
    const rawHeader = 'GET / HTTP/1.1\r\nUser-Agent: curl/7.54.0\r\n'
    expect(() => parseHeader(rawHeader)).toThrowError(
      'Required headers are missing'
    )
  })
})
