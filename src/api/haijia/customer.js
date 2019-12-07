import axios from 'axios';
import {ajaxRequest} from '@/utils/request.js'

let moduleAxios = {
    //客户档案
    customerList: (val) => {
        return axios.post('/customer/list', val)
    },
    customerSave: (val) => {
        return axios.post('/customer/saveWrap', val)
    },
    customerDetail: (val) => {
        return axios.post('/customer/detail', val)
    },
    customerDelete: (val) => {
        return axios.post('/customer/delete', val)
    },
    customerDeleteBatch: (val) => {
        return axios.post('/customer/deleteBatch', val)
    },
    //客户分类【字典】
    customerType: (val) => {
        return axios.post('frame/dict/list', {category: "customer_type"})
    },
    customerArea: (val) => {
        return axios.post('frame/area/list', val)
    },

}

//客户档案
function customerList(val) {
    return ajaxRequest('customer.list', val)
}

function customerSave(val) {
    return ajaxRequest('customer.saveWrap', val)
}

function customerDetail(val) {
    return ajaxRequest('customer.detail', val)
}

function customerDelete(val) {
    return ajaxRequest('customer.delete', val)
}

function customerDeleteBatch(val) {
    return ajaxRequest('customer.deleteBatch', val)
}
//客户分类【字典】
function customerType(val) {
    return ajaxRequest('dict.list', {category: "customer_type"})
}

function customerArea(val) {
    return ajaxRequest('area.list', val)
}
//销售合同
function salesContractList(val) {
  return ajaxRequest('salesContract.list', val)
}
function salesContractSave(val) {
  return ajaxRequest('salesContract.save', val)
}
function salesContractDetail(val) {
  return ajaxRequest('salesContract.detail', val)
}
function salesContractDelete(val) {
  return ajaxRequest('salesContract.delete', val)
}
function salesContractDeleteBatch(val) {
  return ajaxRequest('salesContract.deleteBatch', val)
}

export {customerList,customerSave,customerDetail,customerDelete,customerDeleteBatch,customerType,customerArea,salesContractList,
  salesContractSave,salesContractDetail,salesContractDelete,salesContractDeleteBatch}
