<template>
  <div>
    <el-dialog
      :title="dialogTitle"
      :visible="showModal"
      :close-on-click-modal="false"
      :before-close="onClose"
      width="50%"
    >
      <el-form ref="serviceContractForm" :model="serviceContractForm" :show-message="true" :rules="rules"
               label-width="100px">
        <el-row>
          <el-col :span="12">
            <el-form-item label="合同编码" prop="code">
              <el-input v-model="serviceContractForm.code" placeholder="请输入编码"/>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="客户名称" prop="name">
              <el-select v-model="serviceContractForm.name" placeholder="请选择客户名称" style="width:100%">
                <el-option label="钱浅" value="1"></el-option>
                <el-option label="吴丹" value="2"></el-option>
                <el-option label="刘敏" value="3"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="销售合同号" prop="state">
              <el-select v-model="serviceContractForm.state" placeholder="请选择销售合同" style="width:100%">
                <el-option label="XSHT00001" value="1"></el-option>
                <el-option label="XSHT00002" value="2"></el-option>
                <el-option label="XSHT00003" value="3"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="合同金额" prop="price">
              <el-input v-model=" serviceContractForm.price" placeholder="请输入合同金额" min=0
                        oninput="value=value.replace(/[^\d.]/g,'')"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="合同期日" prop="signTime">
              <el-date-picker
                v-model="serviceContractForm.signTime"
                type="date"
                class="input-style"
                style="width:100%"
                placeholder="请选择合同期日">
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="设备机型" prop="machineName">
              <el-input v-model="serviceContractForm.machineName" disabled placeholder="系统自动带出" style="width:100%">
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="数量" prop="num">
              <el-input v-model=" serviceContractForm.num" disabled placeholder="系统自动带出" min=0 controls-position="right"
                        :step="1"/>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="销售日期" prop="xsrq">
              <el-input v-model="serviceContractForm.xsrq" disabled placeholder="系统自动带出" style="width:100%">
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="到货期日" prop="arrivalDate">
              <el-input
                v-model="serviceContractForm.arrivalDate"
                disabled
                placeholder="系统自动带出">
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="安装日期" prop="installDate">
              <el-input
                v-model="serviceContractForm.installDate"
                disabled
                placeholder="系统自动带出">
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="等级服务" prop="createTime">
              <el-select v-model="serviceContractForm.createTime" placeholder="请选择等级服务" style="width:100%">
                <el-option label="一等" value="1"/>
                <el-option label="二等" value="2"/>
                <el-option label="三等" value="3"/>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="服务周期" prop="createName">
              <el-select v-model="serviceContractForm.createName" placeholder="请选择服务周期" style="width:100%">
                <el-option label="1月" value="1"/>
                <el-option label="2月" value="2"/>
                <el-option label="1年" value="3"/>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="维修金额" prop="createTime1">
              <el-input v-model=" serviceContractForm.createTime1" placeholder="请输入维修金额" min=0
                        oninput="value=value.replace(/[^\d.]/g,'')"/>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="保修开始日" prop="createName1">
              <el-date-picker
                v-model="serviceContractForm.createName1"
                type="date"
                class="input-style"
                style="width:100%"
                placeholder="请选择保修开始日">
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="保修到期日" prop="createName2">
              <el-date-picker
                v-model="serviceContractForm.createName2"
                type="date"
                class="input-style"
                style="width:100%;"
                placeholder="请选择保修到期日">
              </el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <span slot="footer">
        <el-button @click="onClose('serviceContractForm')">取消</el-button>
        <el-button @click="resetForm('serviceContractForm')">重置</el-button>
        <el-button type="primary" @click="onDefinite('serviceContractForm')">提交</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
    import {validateNull} from '@/utils/validator'

    export default {
        name: 'sales-contract-dialog',
        props: {
            showDlog: {
                type: Boolean,
                default: false
            },
            dialogTitle: {
                type: String,
                default: ''
            }
        },
        data() {
            return {
                showModal: false,
                serviceContractForm: {
                    code: '',
                    name: '',
                    machineName: '',
                    num: '',
                    state: '',
                    price: '',
                    xsrq: '',
                    signTime: '',
                    arrivalDate: '',
                    installDate: '',
                    createTime: '',
                    createName: '',
                    createTime1: '',
                    createName1: '',
                    createName2: ''
                },
                rules: {
                    code: [
                        {required: true, validator: validateNull, trigger: 'change'}
                    ],
                    name: [
                        {required: true, validator: validateNull, trigger: 'change'}
                    ],
                    price: [
                        {required: true, validator: validateNull, trigger: 'change'}
                    ],
                    state: [
                        {required: true, validator: validateNull, trigger: 'change'}
                    ],
                    signTime: [
                        {required: true, validator: validateNull, trigger: 'change'}
                    ],
                    createTime: [
                        {required: true, validator: validateNull, trigger: 'change'}
                    ],
                    createName: [
                        {required: true, validator: validateNull, trigger: 'change'}
                    ],
                    createTime1: [
                        {required: true, validator: validateNull, trigger: 'change'}
                    ],
                    createName1: [
                        {required: true, validator: validateNull, trigger: 'change'}
                    ],
                    createName2: [
                        {required: true, validator: validateNull, trigger: 'change'}
                    ],
                }
            }
        },
        watch: {
            showDlog(newVal) {
                this.showModal = newVal
            }
        },
        methods: {
            //提交
            onDefinite() {
                this.$refs.serviceContractForm.validate((valid) => {
                    if (valid) {
                        alert('已提交')
                        this.resetForm()
                        this.$emit('onServiceContractLog', false)
                        this.showModal = false
                    } else {
                        this.$message({
                            message: '请填写完整信息！',
                            type: 'warning'
                        })
                        return false
                    }
                })
            },
            //重置
            resetForm() {
                this.$refs.serviceContractForm.resetFields()
            },
            //取消
            onClose() {
                this.resetForm()
                this.$emit('onServiceContractLog', false)
                this.showModal = false
            }
        }
    }
</script>

<style scoped>

</style>
