import axios from 'axios'
import {ajaxRequest} from '@/utils/request.js'

let moduleAxios = {
    //计量单位
    unitList: (val) => {
        return axios.post('/unit/list', val)
    },
    unitSave: (val) => {
        return axios.post('/unit/save', val)
    },
    unitDetail: (val) => {
        return axios.post('/unit/detail', val)
    },
    unitDelete: (val) => {
        return axios.post('/unit/delete', val)
    },
    //岗位信息
    postList: (val) => {
        return axios.post('/post/list', val)
    },
    postSave: (val) => {
        return axios.post('/post/save', val)
    },
    postDetail: (val) => {
        return axios.post('/post/detail', val)
    },
    postDelete: (val) => {
        return axios.post('/post/delete', val)
    },
//    字典管理
    dictCategories: (val) => {
        return axios.post('frame/dict/categories', val)
    },
    dictList: (val) => {
        return axios.post('frame/dict/list', val)
    },
    dictDeleteBatch: (val) => {
        return axios.post('frame/dict/deleteBatch', val)
    },
    dictDelete: (val) => {
        return axios.post('frame/dict/delete', val)
    },
    dictSave: (val) => {
        return axios.post('frame/dict/save', val)
    },
    dictDetail: (val) => {
        return axios.post('frame/dict/detail', val)
    },

}

//计量单位
function unitList(val) {
    return ajaxRequest('unit.list', val)
}

function unitSave(val) {
    return ajaxRequest('unit.save', val)
}

function unitDetail(val) {
    return ajaxRequest('unit.detail', val)
}

function unitDelete(val) {
    return ajaxRequest('unit.delete', val)
}

//岗位信息
function postList(val) {
    return ajaxRequest('post.list', val)
}

function postSave(val) {
    return ajaxRequest('post.save', val)
}

function postDetail(val) {
    return ajaxRequest('post.detail', val)
}

function postDelete(val) {
    return ajaxRequest('', val)
}
//字典管理
function dictCategories(val) {
  return ajaxRequest('frame.dict.categories', val)
}
function dictList(val) {
    return ajaxRequest('frame.dict.list', val)
}
function dictDeleteBatch(val) {
  return ajaxRequest('frame.dict.deleteBatch', val)
}
function dictDelete(val) {
  return ajaxRequest('frame.dict.delete', val)
}
function dictSave(val) {
  return ajaxRequest('frame.dict.save', val)
}
function dictDetail(val) {
  return ajaxRequest('frame.dict.detail', val)
}

export { unitList, unitSave, unitDetail, unitDelete, postList, postSave, postDetail, postDelete,dictCategories,dictList,
  dictDeleteBatch,dictDelete,dictSave,dictDetail}
