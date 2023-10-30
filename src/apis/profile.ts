import type { ProfileResponse } from "@/model/profile";
import type { OperationResponse } from "@/model/resp";
import { Get, Post } from "@/utils/request/auth_request";

// 获取用户信息
function getProfile(): Promise<[any, ProfileResponse | undefined]> {
    return Get("/profile/get");
}

// 修改用户信息
function updateProfile(
    nickname: string,
    email: string,
): Promise<[any, OperationResponse | undefined]> {
    const form = new FormData();
    form.append("nickname", nickname);
    form.append("email", email);
    return Post("/profile/update", form);
}


// 上传头像
function uploadAvatar(file: File): Promise<[any, OperationResponse | undefined]> {
    const form = new FormData();
    form.append("file", file);
    return Post("/profile/avatar", form);
}


export const profileApis = {
    getProfile,
    updateProfile,
    uploadAvatar
};