interface HttpResponse<T> extends Response {
    parsedBody?: T
    status: number
}

/**
 * 
 * @param method
 * @param url
 * @param body
 */
export async function http<T>(method: 'GET' | 'POST', url: string, body?: BodyInit): Promise<HttpResponse<T>> {
    const response: HttpResponse<T> = await fetch(url, {
        method: method,
        body: body
    })

    try {
        response.parsedBody = await response.json()
    } catch (e) {
        console.error('http.ts', e)
    }

    return response
}