import type { BarrageListResponse, BarrageResponse } from "@/model/barrage";
import type { OperationResponse } from "@/model/resp";
import { Delete, Get, Post } from "@/utils/request/request";

// 获取弹幕列表
function getBarrageList(video_uuid: string): Promise<[any, BarrageListResponse | undefined]> {
    return Get("/barrage/list", { video_uuid });
}

// 获取单个弹幕
function getBarrage(uuid: string): Promise<[any, BarrageResponse | undefined]> {
    return Get("/barrage/get", { uuid });
}

// 添加弹幕
function addBarrage(video_uuid: string, content: string, second: number): Promise<[any, OperationResponse | undefined]> {
    const form = new FormData();
    form.append("video_uuid", video_uuid);
    form.append("content", content);
    form.append("second", second.toString());
    return Post("/barrage/add", form);
}

// 删除弹幕
function deleteBarrage(uuid: string): Promise<[any, OperationResponse | undefined]> {
    return Delete("/barrage/delete", { uuid });
}

export const barrageApis = {
    getBarrageList,
    getBarrage,
    addBarrage,
    deleteBarrage
};
