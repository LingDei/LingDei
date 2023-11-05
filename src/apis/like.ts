import type { LikeListResponse, LikeCountResponse, LikeStatusResponse } from "@/model/like";
import type { OperationResponse } from "@/model/resp";
import { Delete, Get, Post } from "@/utils/request/request";

// 获取自己的点赞列表
function getLikeList(): Promise<[any, LikeListResponse | undefined]> {
    return Get("/like/list");
}

// 获取某个视频的点赞数量
function getLikeCount(video_uuid: string): Promise<[any, LikeCountResponse | undefined]> {
    return Get("/like/count", { video_uuid });
}

// 检查是否点赞
function checkLike(video_uuid: string): Promise<[any, LikeStatusResponse | undefined]> {
    return Get("/like/check", { video_uuid });
}

// 添加点赞
function addLike(video_uuid: string): Promise<[any, OperationResponse | undefined]> {
    const form = new FormData();
    form.append("video_uuid", video_uuid);
    return Post("/like/add", form);
}

// 删除点赞
function deleteLike(video_uuid: string): Promise<[any, OperationResponse | undefined]> {
    return Delete("/like/delete", { video_uuid });
}

export const likeApis = {
    getLikeList,
    getLikeCount,
    checkLike,
    addLike,
    deleteLike
};