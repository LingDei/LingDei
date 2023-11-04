interface Comment {
    uuid: string;
    video_uuid: string;
    user_uuid: string;
    content: string;
    timestamp: number;
}

interface CommentResponse {
    code: number;
    comment: Comment;
}

interface CommentListResponse {
    code: number;
    comment_list: Comment[];
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
