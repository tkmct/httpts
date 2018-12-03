enum METHOD {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  PATCH = 'PATCH',
  DELETE = 'DELETE'
}

export interface HttpHeader {
  Method: METHOD
  Host: string
  Accept: string
  'User-Agent'?: string
}

export function validate(header: any): header is HttpHeader {
  const headerKeys = Object.keys(header)
  const requiredKeys = ['Method', 'Host', 'Accept']

  // check if all required keys are contained
  if (!requiredKeys.every(k => headerKeys.includes(k))) {
    return false
  }

  return true
}
