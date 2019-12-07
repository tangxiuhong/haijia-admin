import axios from 'axios'
import { ajaxRequest } from '@/utils/request.js'
// 模块管理——获取数据列表
const moduleAxios = {
    moduleList: (val) => {
        return axios.post('frame/module/list', val)
    },
    moduleDelete: (val) => {
        return axios.post('frame/module/delete', val)
    },
    //-----------
    moduleDetail: (val) => {
        return axios.post('frame/module/detail', val)
    },
    moduleSave: (val) => {
        return axios.post('frame/module/save', val)
    },
    //------------
    // 服务配置
    serviceList: (val) => {
        return axios.post('frame/service/list', val)
    },
    serviceSave: (val) => {
        return axios.post('frame/service/save', val)
    },
    serviceDetail: (val) => {
        return axios.post('frame/service/detail', val)
    },
    serviceDelete: (val) => {
        return axios.post('frame/service/delete', val)
    },
    serviceHostList: (val) => {
        return axios.post('frame/serviceHost/list', val)
    },
//    ----------------------------------
//     用户
    userList: (val) => {
        return axios.post('frame/user/list', val)
    },
    userDelete: (val) => {
        return axios.post('frame/user/delete', val)
    },
    userSave: (val) => {
        return axios.post('frame/user/save', val)
    },
    userDetail: (val) => {
        return axios.post('frame/user/detail', val)
    },
    userSaveModule: (val) => {
        return axios.post('frame/user/saveModule', val)
    },
    userRoleModuleList: (val) => {
        return axios.post('frame/user/roleModuleList', val)
    },
    userModuleList: (val) => {
        return axios.post('frame/user/moduleList', val)
    },
    // 角色
    roleList: (val) => {
        return axios.post('frame/role/list', val)
    },
    roleSave: (val) => {
        return axios.post('frame/role/save', val)
    },
    roleDetail: (val) => {
        return axios.post('frame/role/detail', val)
    },
    roleDelete: (val) => {
        return axios.post('frame/role/delete', val)
    },
    roleSaveModule: (val) => {
        return axios.post('frame/role/saveModule', val)
    },
    roleModuleList: (val) => {
        return axios.post('frame/role/moduleList', val)
    }
}
//模块管理
function moduleList(val) {
    return ajaxRequest('frame.module.list', val)
}

function moduleDelete(val) {
    return ajaxRequest('frame.module.delete', val)
}
function moduleDetail(val) {
    return ajaxRequest('frame.module.detail', val)
}
function moduleSave (val){
    return ajaxRequest('frame.module.save', val)
}
// 服务配置
function serviceList(val) {
    return ajaxRequest('service.list', val)
}

function serviceSave(val) {
    return ajaxRequest('service.save', val)
}

function serviceDetail(val) {
    return ajaxRequest('service.detail', val)
}

function serviceDelete(val) {
    return ajaxRequest('service.delete', val)
}

function serviceHostList(val) {
    return ajaxRequest('serviceHost.list', val)
}
//     用户
function userList (val) {
    return ajaxRequest('frame.user.list', val)
}
function  userDelete(val) {
    return ajaxRequest('frame.user.delete', val)
}
function  userSave (val)  {
    return ajaxRequest('frame.user.save', val)
}
function userDetail(val) {
    return ajaxRequest('frame.user.detail', val)
}
function  userSaveModule(val){
    return ajaxRequest('frame.user.saveModule', val)
}
function  userRoleModuleList(val) {
    return ajaxRequest('frame.user.roleModuleList', val)
}
function  userModuleList(val) {
    return ajaxRequest('frame.user.moduleList', val)
}
// 角色
function roleList(val) {
    return ajaxRequest('frame.role.list', val)
}
function  roleSave(val) {
    return ajaxRequest('frame.role.save', val)
}
function   roleDetail (val) {
    return ajaxRequest('frame.role.detail', val)
}
function  roleDelete (val)  {
    return ajaxRequest('frame.role.delete', val)
}
function roleSaveModule (val) {
    return ajaxRequest('frame.role.saveModule', val)
}
function   roleModuleList(val)  {
    return ajaxRequest('frame.role.moduleList', val)
}
//参数
function paraList(val) {
    return ajaxRequest('frame.para.list', val)
}
function  paraSave(val) {
    return ajaxRequest('frame.para.save', val)
}
function   paraDetail (val) {
    return ajaxRequest('frame.para.detail', val)
}
function  paraDelete (val)  {
    return ajaxRequest('frame.para.delete', val)
}
// ------------------------------------

export { moduleAxios, moduleList, moduleDelete,moduleDetail,moduleSave, serviceList, serviceSave, serviceDetail, serviceDelete, serviceHostList,
    userList,userDelete,userSave,userDetail,userSaveModule,userRoleModuleList,userModuleList,roleList,roleSave,roleDetail,roleDelete,roleSaveModule,
    roleModuleList,paraList,paraSave,paraDetail,paraDelete}
