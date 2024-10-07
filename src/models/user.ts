export class User {
  username: string = ''
}

export class UserResponse {
  private readonly isSuccess: boolean = false
  private readonly data: Partial<{
    id: string
    username: string
    password: string
    created_at: string
    updated_at: string
  }>

  constructor(isSuccess: boolean, data: typeof this.data) {
    this.isSuccess = isSuccess
    this.data = data
  }

  toJson() {
    return {
      isSuccess: this.isSuccess,
      data: {
        id: this.data.id,
        username: this.data.username,
        password: this.data.password,
        createdAt: this.data.created_at,
        updatedAt: this.data.updated_at,
      },
    }
  }
}
