const routerReference = {
  //环境区域设置
  // 'enviroment': () => import('@/views/system/sysModule.vue'),
  //字典管理-------
  'dictionary': () => import('@/views/haijia/basicData/dictionary.vue'),
  //计量单位
  'unit': () => import('@/views/haijia/basicData/unit.vue'),
  //岗位信息
  'post': () => import('@/views/haijia/basicData/post.vue'),
  //服务等级
  // 'service-level': () => import('@/views/haijia/basicData/service-level.vue'),
  //服务周期
  // 'service-cycle': () => import('@/views/haijia/basicData/service-cycle.vue'),
  //服务配置
  'service': () => import('@/views/haijia/basicData/service.vue'),
  //工序管理
  // 'process': () => import('@/views/system/sysUser.vue'),
  //能耗预警设置
  // 'process-warning': () => import('@/views/system/sysModule.vue'),
  //工序组合
  // 'processCombinate': () => import('@/views/system/sysRole.vue'),
  //色号管理
  // 'color': () => import('@/views/system/sysUser.vue'),
  //计量单位
  // 'meas': () => import('@/views/system/sysModule.vue'),
  //通知公告
  // 'notification': () => import('@/views/system/sysUser.vue'),
  //公司管理
  // 'company': () => import('@/views/system/sysModule.vue'),
  //角色管理---------
  'role': () => import('@/views/system/sysRole.vue'),
  //权限管理
  // 'assembly': () => import('@/views/system/sysModule.vue'),
  //编码规则
  // 'rule': () => import('@/views/system/sysRole.vue'),
  //模块管理-------
  'module': () => import('@/views/system/sysModule.vue'),
  //数据备份
  // 'b-shuju': () => import('@/views/system/sysUser.vue'),
  //系统配置
  // 'para': () => import('@/views/system/sysUser.vue'),
  //服务配置
  // 'service': () => import('@/views/system/sysUser.vue'),
  //用户管理----------
  'user': () => import('@/views/system/sysUser.vue'),
  //参数配置
  'parameter': () => import('@/views/system/sysPara.vue'),
  //设备机型
  'machine-model': () => import('@/views/haijia/machine/machine-model'),
  //设备档案
  'machine': () => import('@/views/haijia/machine/machine'),
  //配件分类
  'parts-sort': () => import('@/views/haijia/machine/parts-sort'),
  //配件档案
  'parts-file': () => import('@/views/haijia/machine/parts-file'),
  //故障大类
  // 'fault': () => import('@/views/haijia/machine/fault'),
  //故障类别
  'fault-type': () => import('@/views/haijia/machine/fault-type'),
  //部门
  'depart': () => import('@/views/haijia/depart/depart'),
  //员工
  'emp': () => import('@/views/haijia/depart/emp'),
  //客户档案
  'customer': () => import('@/views/haijia/customer/customer'),
  //合同类型
  // 'contract-type': () => import('@/views/haijia/customer/contract-type'),
  //销售合同
  'sales-contract': () => import('@/views/haijia/customer/sales-contract'),
  //服务合同
  'service-contract': () => import('@/views/haijia/customer/service-contract'),
  //客户反馈
  'customer-feedback': () => import('@/views/haijia/customer/customer-feedback'),
  //安装工单
  'install-order': () => import('@/views/haijia/workOrder/installOrder'),
  //维修工单
  'repair-order': () => import('@/views/haijia/workOrder/repairOrder'),
  //客户反馈
  'feedback': () => import('@/views/haijia/customer/customer-feedback')
}
export default routerReference


