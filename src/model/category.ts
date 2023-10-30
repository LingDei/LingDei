interface Category {
    uuid: string
    name: string
}

interface CategoryResponse {
    code: number
    category: Category
}

interface CategoryListResponse {
    code: number
    categories: Category[]
}

export type {
    Category,
    CategoryResponse,
    CategoryListResponse
}