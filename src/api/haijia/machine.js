import axios from 'axios'
import {ajaxRequest} from '@/utils/request.js'

let moduleAxios = {
    //设备机型
    machineModelList: (val) => {
        return axios.post('/machineModel/list', val)
    },
    machineModelSave: (val) => {
        return axios.post('/machineModel/save', val)
    },
    machineModelDetail: (val) => {
        return axios.post('/machineModel/detail', val)
    },
    machineModelDelete: (val) => {
        return axios.post('/machineModel/delete', val)
    },
  //设备机型
  machineList: (val) => {
    return axios.post('/machine/list', val)
  },
  machineSave: (val) => {
    return axios.post('/machine/save', val)
  },
  machineDetail: (val) => {
    return axios.post('/machine/detail', val)
  },
  machineDelete: (val) => {
    return axios.post('/machine/delete', val)
  },
    //配件档案
    partsList: (val) => {
        return axios.post('/parts/list', val)
    },
    partsSave: (val) => {
        return axios.post('/parts/save', val)
    },
    partsDetail: (val) => {
        return axios.post('/parts/detail', val)
    },
    partsDelete: (val) => {
        return axios.post('/parts/delete', val)
    },
    //图片保存
    partsSaveWrap: (val) => {
        return axios.post('/parts/saveWrap', val)
    },
    //图片编辑
    partsDetailWrap: (val) => {
        return axios.post('/parts/detailWrap', val)
    },
    //故障类别
    faultList: (val) => {
        return axios.post('/fault/list', val)
    },
    faultSave: (val) => {
        return axios.post('/fault/save', val)
    },
    faultDetail: (val) => {
        return axios.post('/fault/detail', val)
    },
    faultDelete: (val) => {
        return axios.post('/fault/delete', val)
    },
    //配件分类
    partsCategoryList: (val) => {
        return axios.post('/partsCategory/list', val)
    },
    partsCategorySave: (val) => {
        return axios.post('/partsCategory/save', val)
    },
    partsCategoryDetail: (val) => {
        return axios.post('/partsCategory/detail', val)
    },
    partsCategoryDelete: (val) => {
        return axios.post('/partsCategory/delete', val)
    },

}

//设备机型
function machineModelList(val) {
    return ajaxRequest('machineModel.list', val)
}

function machineModelSave(val) {
    return ajaxRequest('machineModel.save', val)
}

function machineModelDetail(val) {
    return ajaxRequest('machineModel.detail', val)
}

function machineModelDelete(val) {
    return ajaxRequest('machineModel.delete', val)
}

//配件档案
function partsList(val) {
    return ajaxRequest('parts.list', val)
}
//图片保存
function partsSaveWrap(val) {
    return ajaxRequest('parts.saveWrap', val)
}
//图片编辑
function partsDetailWrap(val)  {
    return ajaxRequest('parts.detailWrap', val)
}
// function partsSave (val) {
//     return ajaxRequest('parts.save', val)
// }
//
// function partsDetail (val) {
//     return ajaxRequest('parts.detail', val)
// }

function partsDelete(val) {
    return ajaxRequest('parts.delete', val)
}

//故障类别
function faultList (val) {
    return ajaxRequest('fault.list', val)
}

function faultSave (val) {
    return ajaxRequest('fault.save', val)
}

function faultDetail (val) {
    return ajaxRequest('fault.detail', val)
}

function faultDelete (val) {
    return ajaxRequest('fault.delete', val)
}

//配件分类
function partsCategoryList (val) {
    return ajaxRequest('partsCategory.list', val)
}

function partsCategorySave (val) {
    return ajaxRequest('partsCategory.save', val)
}

function partsCategoryDetail (val) {
    return ajaxRequest('partsCategory.detail', val)
}

function partsCategoryDelete (val) {
    return ajaxRequest('partsCategory.delete', val)
}

//设备档案
function machineList(val) {
  return ajaxRequest('machine.list', val)
}
function machineSave(val) {
  return ajaxRequest('machine.save', val)
}
function machineDetail(val) {
  return ajaxRequest('machine.detail', val)
}
function machineDelete(val)  {
  return ajaxRequest('machine.delete', val)
}

export {machineModelList,machineModelSave,machineModelDetail,machineModelDelete,partsList,partsDelete,
  faultList,faultSave,faultDetail,faultDelete,partsCategoryList,partsCategorySave,partsCategoryDetail,partsCategoryDelete,partsSaveWrap,
  partsDetailWrap,machineList,machineSave,machineDetail,machineDelete}
