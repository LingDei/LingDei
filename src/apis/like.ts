import type { LikeResponse, LikeListResponse, LikeCountResponse } from "@/model/like";
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

// 获取点赞
function getLike(uuid: string): Promise<[any, LikeResponse | undefined]> {
    return Get("/like/get", { uuid });
}

// 添加点赞
function addLike(video_uuid: string): Promise<[any, OperationResponse | undefined]> {
    const form = new FormData();
    form.append("video_uuid", video_uuid);
    return Post("/like/add", form);
}

// 删除点赞
function deleteLike(uuid: string): Promise<[any, OperationResponse | undefined]> {
    return Delete("/like/delete", { uuid });
}

export const likeApis = {
    getLikeList,
    getLikeCount,
    getLike,
    addLike,
    deleteLike
};