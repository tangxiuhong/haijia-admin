import axios from 'axios'
import { Message, MessageBox } from 'element-ui'
import { getToken } from '@/utils/auth'
import store from '@/store'

let baseURL = ''
if (process.env.NODE_ENV === 'development') { // 开发环境
    baseURL = axios.defaults.baseURL = 'http://47.99.212.180:8085'
} else if (process.env.NODE_ENV === 'production') { // 生产环境
    baseURL = axios.defaults.baseURL = 'http://47.99.212.180:8085'
} else {
    alert('没有设置该类环境')
}
// 请求拦截
axios.interceptors.request.use(
    config => {
        config.headers = {
            'Content-Type': 'application/json',
            'auth-token': getToken()
        }
        return config
    },
    error => {
        return Promise.reject(error)
    }
)
// 响应拦截
axios.interceptors.response.use((config) => {
    // store.state.app.errorModal = true;

    if (config.data.status === 415) {
        Message({
            type: 'error',
            message: config.data.message
        })
    } else if (config.data.status === 4001) {
        store.state.app.errorDialog = {
            showDialog: true,
            message: config.data.message,
            status: config.data.status
        }
    } else if (config.data.status === 500) {
        Message({
            type: 'error',
            message: config.data.message
        })
    }
    return config
}, (error) => {
    Message({
        type: 'error',
        message: '网络错误，刷新重试！'
    })
    // Do something with response error
    return Promise.reject(error)
})

function post(apiName, params) {
    return axios.post(apiName, params)
}

// 获取完整的url
function getCompleteServerUrl(apiName, params, cacheServerList) {
    return axios.post('frame/service/url', {
        name: apiName
    }).then(res => {
        if (res.data.status === 200) {
            if (res.data.res) {
                cacheServerList.push({
                    serverName: apiName,
                    url: res.data.res
                })
                // 添加到缓存
                localStorage.setItem('serverList', JSON.stringify(cacheServerList))
                return post(res.data.res, params)
            } else {
                throw new Error(`找不到服务名：${apiName}`)
            }
        } else {
            throw new Error(`服务端报错：找不到接口${apiName}`)
        }
    })
}

// 封装ajax请求
const ajaxRequest = function(apiName, params) {
    // 获取本地缓存
    let cacheServerList = JSON.parse(localStorage.getItem('serverList'))
    cacheServerList && cacheServerList.length !== 0 ? cacheServerList = JSON.parse(localStorage.getItem('serverList')) : cacheServerList = []
    // 本地缓存不为空
    if (cacheServerList && cacheServerList.length !== 0) {
        const apiItem = cacheServerList.find(item => item.serverName === apiName)
        // 本地缓存找到对应的url
        if (apiItem && Object.keys(apiItem).length !== 0) {
            return post(apiItem.url, params)
        } else {
            return getCompleteServerUrl(apiName, params, cacheServerList)
        }
    } else {
        return getCompleteServerUrl(apiName, params, cacheServerList)
    }
}
export { ajaxRequest }
