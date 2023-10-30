interface Profile {
    id: string
    nickname: string
    email: string
    avatar_url: string
}

interface ProfileResponse {
    code: number
    profile: Profile
}

export type {
    Profile,
    ProfileResponse
}