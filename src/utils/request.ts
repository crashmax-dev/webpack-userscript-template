/**
 * 
 * @param args
 * @returns
 */
export const request = async <T>(...args: Parameters<typeof fetch>): Promise<{ response: Response, data: T }> => {
  const response = await fetch(...args)
  const json = await response.json()

  return {
    response: response,
    data: json
  }
}