import { ElMessage as message } from 'element-plus'

export const handleChangeRequestHeader = (config: any, key: string, value: string) => {
  config[key] = value
  return config
}

export const handleConfigureAuth = (config: any) => {
  config.headers['token'] = localStorage.getItem('token') || ''
  return config
}

export const handleNetworkError = (errStatus?: number): void => {
  const networkErrMap: any = {
    '400': '错误的请求', // token 失效
    '401': '未授权，请重新登录',
    '403': '拒绝访问',
    '404': '请求错误，未找到该资源',
    '405': '请求方法未允许',
    '408': '请求超时',
    '500': '服务器端出错',
    '501': '网络未实现',
    '502': '网络错误',
    '503': '服务不可用',
    '504': '网络超时',
    '505': 'http版本不支持该请求'
  }
  if (errStatus) {
    message({
      showClose: true,
      message: networkErrMap[errStatus] ?? `其他连接错误 --${errStatus}` + '11111111111',
      type: 'error'
    })
    return
  }
  message({
    showClose: true,
    message: '无法连接到服务器！',
    type: 'error'
  })
}
