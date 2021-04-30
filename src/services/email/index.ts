import Api from '../api'

export async function test(email: string): Promise<any> {
  const { data } = await Api.post(`/email?email=${email}`)

  return data
}