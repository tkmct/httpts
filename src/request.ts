import { HttpHeader, validate } from './header'
import { maybeString } from './utils'

export interface Request {
  header: HttpHeader
  body: string | null
}

// SEPARATORS
const LINE_SEPARATOR = '\r\n'
const HEADER_SEPARATOR = ': '

function parse(rawRequest: string): Request {
  const [rawHeader, rawBody] = rawRequest.split(LINE_SEPARATOR + LINE_SEPARATOR)

  const headers = parseHeader(rawHeader)
  const body = maybeString(rawBody)

  return {
    header: headers,
    body
  }
}

function parseHeader(rawHeader: string): HttpHeader {
  const header: any = {}
  const headers = rawHeader.split(LINE_SEPARATOR)
  headers.forEach((h, idx) => {
    // First line must be a method and protocol version
    if (idx === 0) {
      header.Method = h.split('/')[0].trim()
      return
    }

    // check if valid header
    const [k, v] = h.split(HEADER_SEPARATOR)
    if (k === 'Host') {
      header.Host = v
    } else if (k === 'User-Agent') {
      header['User-Agent'] = v
    } else if (k === 'Accept') {
      header.Accept = v
    }
  })

  if (validate(header)) {
    return header
  }

  throw new Error('Required headers are missing')
}

export { parse, parseHeader }
