import type { Profile } from "./profile";

interface Comment {
    uuid: string;
    video_uuid: string;
    user_uuid: string;
    content: string;
    timestamp: number;
    profile: Profile
}

interface CommentResponse {
    code: number;
    comment: Comment;
}

interface CommentListResponse {
    code: number;
    comment_list: Comment[];
    total: number
}

interface CommentCountResponse {
    code: number;
    count: number;
}

export type {
    Comment,
    CommentResponse,
    CommentListResponse,
    CommentCountResponse
}
