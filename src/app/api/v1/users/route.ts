import { externalApi } from '@/lib/axios'

import {
  PostUserPayload,
  PostUserResp,
} from '@/features/authentication/auth.model'
import { AxiosError } from 'axios'

export async function POST(req: Request) {
  const body: PostUserPayload = await req.json()

  try {
    const res = await externalApi
      .post<
        PostUserPayload,
        PostUserResp
      >('/users', { username: body.username, password: body.username })
      .then((res) => res.data)

    return Response.json(res)
  } catch (err) {
    if (err instanceof AxiosError) {
      return Response.json(err?.response?.data, { status: err.status })
    }
  }
}
