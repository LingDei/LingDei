import type { CommentListResponse, CommentResponse } from "@/model/comment";
import type { OperationResponse } from "@/model/resp";
import { Delete, Get, Post } from "@/utils/request/request";

// 获取评论列表
function getCommentList(video_uuid: string): Promise<[any, CommentListResponse | undefined]> {
    return Get("/comment/list", { video_uuid });
}

// 获取单个评论
function getComment(uuid: string): Promise<[any, CommentResponse | undefined]> {
    return Get("/comment/get", { uuid });
}

// 添加评论
function addComment(video_uuid: string, content: string): Promise<[any, OperationResponse | undefined]> {
    const form = new FormData();
    form.append("video_uuid", video_uuid);
    form.append("content", content);
    return Post("/comment/add", form);
}

// 删除评论
function deleteComment(uuid: string): Promise<[any, OperationResponse | undefined]> {
    return Delete("/comment/delete", { uuid });
}

export const commentApis = {
    getCommentList,
    getComment,
    addComment,
    deleteComment
};
