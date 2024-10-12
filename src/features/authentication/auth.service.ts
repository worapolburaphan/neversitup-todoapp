import { apiClient } from '@/lib/axios'
import { PostUserPayload } from '@/features/authentication/auth.model'

export const postAccount = async ({ username, password }: PostUserPayload) => {
  // Reverse-proxy to /api/v1/users because the assignment API was blocked by CORS
  return apiClient
    .post('/api/v1/users', { username, password })
    .then((res) => res.data)
}
