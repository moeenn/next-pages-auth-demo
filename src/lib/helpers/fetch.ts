export async function fetchJSON(
  url: string | URL | Request,
  options: RequestInit & { timeout?: number },
): Promise<Response | any> {
  /** automatically add default headers, if required */
  const headers = new Headers(options.headers)
  if (!headers.has("Content-Type") && !(options.body instanceof FormData)) {
    headers.set("Content-Type", "application/json")
  }

  let res: Response
  try {
    res = await fetch(url, {
      ...options,
      headers,
      signal: AbortSignal.timeout(options.timeout || 10_000),
    })
  } catch (err) {
    /** handle timeout error */
    if (err instanceof DOMException) {
      throw new Error("The request to the server timed-out")
    }
    throw err
  }

  let parseError: unknown | null = null
  let parsedResponse: any
  try {
    parsedResponse = await res.json()
  } catch (err) {
    parseError = err
  }

  /** handle >=400 status code related errors */
  if (!res.ok) {
    if (parseError !== null) {
      throw new Error("Unexpected response sent from the server")
    }

    if ("message" in parsedResponse) {
      throw new Error(parsedResponse.message)
    }

    if ("error" in parsedResponse) {
      throw new Error(parsedResponse.error)
    }

    throw new Error(`${res.status} ${res.statusText}`)
  }

  return parsedResponse
}
