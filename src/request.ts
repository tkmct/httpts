interface HttpHeader {
  [s: string]: string
}

interface Request {
  header: HttpHeader
  body: string | null
}

function maybeString(str: string): string | null {
  if (str.length === 0) {
    return null
  }

  return str
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
  const header: { [s: string]: string } = {}
  const headers = rawHeader.split(LINE_SEPARATOR)
  headers.forEach((h, idx) => {
    // First line must be a method and protocol version
    if (idx === 0) {
      header.Method = h.split('/')[0].trim()
      return
    }

    // check if valid header
    const [k, v] = h.split(HEADER_SEPARATOR)
    header[k] = v
  })

  return header
}

export { parse }
