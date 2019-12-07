import {ajaxRequest} from '@/utils/request.js'
import axios from 'axios'
let publicAxios = {
    //计量单位
    unitList: (val) => {
        return axios.post('/unit/list', val)
    },
    //岗位分类 （字典)
    postTypeList: (val) => {
        return axios.post('/frame/dict/list', val)
    },
    //故障大类（字典）
    faultTypeList: (val) => {
        return axios.post('/frame/dict/list', val)
    },
    //维修等级（字典）
    degreeTypeList: (val) => {
        return axios.post('/frame/dict/list', val)
    },
    //配件父类
    degreeFatherList: (val) => {
        return axios.post('/frame/dict/list', val)
    },
    //配件分类
    partsCategoryList: (val) => {
        return axios.post('/partsCategory/list', val)
    },
    //图片上传
    frameImageUpload: (val) => {
        return axios.post('/frame/image/upload', val)
    },
    //设备机型
    machineModelList: (val) => {
      return axios.post('/machineModel/list',val)
    }

}

//计量单位
function unitList(val) {
    return ajaxRequest('unit.list')
}

//岗位分类 （字典)
function postTypeList(val) {
    return ajaxRequest('dict.list')
}

//故障大类（字典）
function faultTypeList(val) {
    return ajaxRequest('dict.list')
}

//维修等级（字典）
function degreeTypeList(val) {
    return ajaxRequest('dict.list')
}

//配件父类
function degreeFatherList(val) {
    return ajaxRequest('dict.list')
}

//配件分类
function partsCategoryList(val) {
    return ajaxRequest('partsCategory.list')
}

// export {, unitList, postTypeList, faultTypeList, degreeTypeList, degreeFatherList, partsCategoryList}
