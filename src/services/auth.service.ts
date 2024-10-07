import { httpClient } from '@/lib/axios'

export interface PostAccountPayload {
  username: string
  password: string
}
export const postAccount = async ({
  username,
  password,
}: PostAccountPayload) => {
  return httpClient
    .post('/users', { username, password })
    .then((res) => res.data)
}
