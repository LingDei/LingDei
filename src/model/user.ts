interface User {
    id: string
    username: string
    role: string
}

interface TokenResponse {
    code: number
    token: string
    role: number
}

export type {
    User,
    TokenResponse
}