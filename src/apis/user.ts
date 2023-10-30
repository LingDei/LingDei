import type { OperationResponse } from '@/model/resp'
import type { TokenResponse } from '@/model/user'
import { Get, Post } from '@/utils/request/auth_request'
import type { IAnyObj } from '@/model/type'

// 注册
function register(username: string, password: string): Promise<[any, OperationResponse | undefined]> {
    const form = new FormData() 
    form.append("username", username)
    form.append("password", password)
    return Post('/user/register', form as IAnyObj)
}

// 获取Token
function getToken(username: string, password: string): Promise<[any, TokenResponse | undefined]> {
    const form = new FormData() 
    form.append("username", username)
    form.append("password", password)
    return Post('/token/get', form as IAnyObj)
}

// 检查用户名是否存在
function checkUsernameExist(username: string): Promise<[any, OperationResponse | undefined]> {
    return Get('/user/exist', { username })
}

// 修改密码
function changePassword(username: string, password: string): Promise<[any, OperationResponse | undefined]> {
    const form = new FormData() 
    form.append("username", username)
    form.append("password", password)
    return Post('/user/changepwd', form as IAnyObj)
}

export const userApis = {
    register,
    getToken,
    checkUsernameExist,
    changePassword
}
