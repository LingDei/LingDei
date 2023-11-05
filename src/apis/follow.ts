import type { OperationResponse } from "@/model/resp";
import { Delete, Get, Post } from "@/utils/request/request";
import type { FanListResponse, FollowCountResponse, FollowListResponse, FollowStatusResponse } from "@/model/follow";

// 关注用户
function followUser(follow_uuid: string): Promise<[any, OperationResponse | undefined]> {
    const form = new FormData();
    form.append("follow_uuid", follow_uuid);
    return Post("/follow/add", form);
}

// 取消关注用户
function unfollowUser(follow_uuid: string): Promise<[any, OperationResponse | undefined]> {
    return Delete("/follow/delete", { follow_uuid });
}

// 获取自己的关注列表
function getFollowList(page: number = 1, page_size: number = 9): Promise<[any, FollowListResponse | undefined]> {
    return Get("/follow/list", { page, page_size });
}

// 获取关注状态
function checkFollow(follow_uuid: string): Promise<[any, FollowStatusResponse | undefined]> {
    return Get("/follow/check", { follow_uuid });
}

// 获取已关注的用户数量
function getFollowCount(): Promise<[any, FollowCountResponse | undefined]> {
    return Get("/follow/count");
}

// 获取自己的粉丝列表
function getFanList(page: number = 1, page_size: number = 9): Promise<[any, FanListResponse | undefined]> {
    return Get("/fan/list", { page, page_size });
}

// 获取粉丝数量
function getFanCount(): Promise<[any, FollowCountResponse | undefined]> {
    return Get("/fan/count");
}

export const followApis = {
    followUser,
    unfollowUser,
    getFollowList,
    checkFollow,
    getFollowCount,
    getFanList,
    getFanCount
};
