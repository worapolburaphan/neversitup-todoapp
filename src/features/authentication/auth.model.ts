export interface PostUserPayload {
  username: string
  password: string
}

export interface PostUserResp {
  isSuccess: boolean
  data: Partial<{
    id: string
    username: string
    password: string
    created_at: string
    updated_at: string
  }>
}
