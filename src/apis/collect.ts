import type { CollectListResponse, CollectStatusResponse } from "@/model/collect";
import type { OperationResponse } from "@/model/resp";
import { Delete, Get, Post } from "@/utils/request/request";

// 获取自己的收藏列表
function getCollectList(): Promise<[any, CollectListResponse | undefined]> {
    return Get("/collect/list");
}

// 检查是否收藏
function checkCollect(video_uuid: string): Promise<[any, CollectStatusResponse | undefined]> {
    return Get("/collect/check", { video_uuid });
}

// 添加收藏
function addCollect(video_uuid: string): Promise<[any, OperationResponse | undefined]> {
    const form = new FormData();
    form.append("video_uuid", video_uuid);
    return Post("/collect/add", form);
}

// 删除收藏
function deleteCollect(video_uuid: string): Promise<[any, OperationResponse | undefined]> {
    return Delete("/collect/delete", { video_uuid });
}

export const collectApis = {
    getCollectList,
    checkCollect,
    addCollect,
    deleteCollect
};