import * as qiniu from 'qiniu-js'
import { apis } from '@/apis';
import { handleNetworkError } from './RequestTools';
import type { Extra } from 'qiniu-js/esm/upload';

// 七牛云文件上传 
async function uploadFile(file: File, onProgress: (percent: number) => void) {
    console.log("uploadFile")
    const [err, data] = await apis.getUploadToken();
    if (err) handleNetworkError(err)
    if (!data || !data?.upload_token) return
    const token = data.upload_token

    const key = file.name
    const putExtra: Partial<Extra> = {
        fname: key,
    }
    const config = {
        useCdnDomain: true,
        region: qiniu.region.z0
    }

    const observable = qiniu.upload(file, key, token, putExtra, config)

    observable.subscribe({
        next: (res) => {
            onProgress(res.total.percent)
        },
        error: (err) => {
            console.log(err)
        },
        complete: (res) => {
            console.log("上传完成")
            console.log(res)
        }
    })
}

export {
    uploadFile
}