import * as qiniu from 'qiniu-js'
import type { Extra } from 'qiniu-js/esm/upload';

// 七牛云文件上传 
async function uploadFile(token: string, video_uuid: string, file: File, onProgress: (percent: number) => void) {
    console.log("uploadFile")


    const key = "videos/" + video_uuid + ".mp4"
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