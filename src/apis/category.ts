import type { CategoryListResponse, CategoryResponse } from "@/model/category";
import type { OperationResponse } from "@/model/resp";
import { Delete, Get, Post } from "@/utils/request/request";

// 获取分类列表
function getCategoryList(): Promise<[any, CategoryListResponse | undefined]> {
    return Get("/category/list");
}

// 获取分类
function getCategory(uuid: string): Promise<[any, CategoryResponse | undefined]> {
    return Get("/category/get", { uuid });
}

// 添加分类
function addCategory(name: string): Promise<[any, OperationResponse | undefined]> {
    const form = new FormData();
    form.append("name", name);
    return Post("/category/add", form);
}

// 删除分类
function deleteCategory(uuid: string): Promise<[any, OperationResponse | undefined]> {
    return Delete("/category/delete", { uuid });
}

export const categoryApis = {
    getCategoryList,
    getCategory,
    addCategory,
    deleteCategory
};