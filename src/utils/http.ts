interface HttpResponse<T> extends Response {
    parsedBody?: T
    status: number
}

/**
 * 
 * @param url
 * @param params
 */
async function http<T>(url: string, params: RequestInit): Promise<HttpResponse<T>> {
    const { method, headers, body } = params

    const response: HttpResponse<T> = await fetch(url, {
        method: method,
        headers: headers,
        body: body
    })

    try {
        response.parsedBody = await response.json()
    } catch (e) {
        console.error('http.ts', e)
    }

    return response
}

export {
    http
}