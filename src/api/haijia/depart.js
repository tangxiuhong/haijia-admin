import {ajaxRequest} from '@/utils/request.js'
import axios from 'axios'
// 部门
function deptList (val) {
    return ajaxRequest('dept.list',val)
}
function deptSave (val) {
    return ajaxRequest('dept.save',val)
}
function deptDetail (val) {
    return ajaxRequest('dept.detail',val)
}
function deptDelete (val) {
    return ajaxRequest('dept.delete',val)
}
//员工
function empList (val) {
    return ajaxRequest('emp.list',val)
}
function empSaveWrap (val) {
    return ajaxRequest('emp.saveWrap',val)
}
// function empSave (val) {
//     return ajaxRequest('emp.save',val)
// }
function empDetailWrap (val) {
    return ajaxRequest('emp.detailWrap',val)
}
// function empDetail (val) {
//     return ajaxRequest('emp.detail',val)
// }
function empDelete (val) {
    return ajaxRequest('emp.delete',val)
}
function empPostList (val) {
    return axios.post('/post/list',val)
}
export {deptList,deptSave,deptDetail,deptDelete,empList,empSaveWrap,empDetailWrap,empDelete,empPostList}
