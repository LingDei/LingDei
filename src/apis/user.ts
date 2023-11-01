import type { OperationResponse } from '@/model/resp'
import type { TokenResponse } from '@/model/user'
import { Auth_Get, Auth_Post } from '@/utils/request/request'

// 注册
function register(username: string, password: string): Promise<[any, OperationResponse | undefined]> {
    const form = new FormData() 
    form.append("username", username)
    form.append("password", password)
    return Auth_Post('/user/register', form)
}

// 获取Token
function getToken(username: string, password: string): Promise<[any, TokenResponse | undefined]> {
    const form = new FormData() 
    form.append("username", username)
    form.append("password", password)
    return Auth_Post('/token/get', form)
}

// 检查用户名是否存在
function checkUsernameExist(username: string): Promise<[any, OperationResponse | undefined]> {
    return Auth_Get('/user/exist', { username })
}

// 修改密码
function changePassword(username: string, password: string): Promise<[any, OperationResponse | undefined]> {
    const form = new FormData() 
    form.append("username", username)
    form.append("password", password)
    return Auth_Post('/user/changepwd', form)
}

export const userApis = {
    register,
    getToken,
    checkUsernameExist,
    changePassword
}
