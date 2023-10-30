import type { CollectResponse, CollectListResponse } from "@/model/collect";
import type { OperationResponse } from "@/model/resp";
import { Delete, Get, Post } from "@/utils/request/request";

// 获取自己的收藏列表
function getCollectList(): Promise<[any, CollectListResponse | undefined]> {
    return Get("/collect/list");
}

// 获取收藏
function getCollect(uuid: string): Promise<[any, CollectResponse | undefined]> {
    return Get("/collect/get", { uuid });
}

// 添加收藏
function addCollect(video_uuid: string): Promise<[any, OperationResponse | undefined]> {
    const form = new FormData();
    form.append("video_uuid", video_uuid);
    return Post("/collect/add", form);
}

// 删除收藏
function deleteCollect(uuid: string): Promise<[any, OperationResponse | undefined]> {
    return Delete("/collect/delete", { uuid });
}

export const collectApis = {
    getCollectList,
    getCollect,
    addCollect,
    deleteCollect
};