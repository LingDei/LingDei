import type { ProfileResponse } from "@/model/profile";
import type { OperationResponse } from "@/model/resp";
import { Auth_Get, Auth_Post } from "@/utils/request/request";

// 获取用户信息
function getProfile(user_uuid?: string): Promise<[any, ProfileResponse | undefined]> {
    return Auth_Get("/profile/get", { user_uuid });
}

// 获取用户信息
function getMyProfile(): Promise<[any, ProfileResponse | undefined]> {
    return Auth_Get("/profile/my");
}

// 修改用户信息
function updateProfile(
    nickname: string,
    email: string,
): Promise<[any, OperationResponse | undefined]> {
    const form = new FormData();
    form.append("nickname", nickname);
    form.append("email", email);
    return Auth_Post("/profile/update", form);
}


// 上传头像
function uploadAvatar(file: File): Promise<[any, OperationResponse | undefined]> {
    const form = new FormData();
    form.append("file", file);
    return Auth_Post("/profile/avatar", form);
}


export const profileApis = {
    getMyProfile,
    getProfile,
    updateProfile,
    uploadAvatar
};