<
<template>
  <div>
    <el-dialog
      :title="dialogTitle"
      :visible="showModal"
      :close-on-click-modal="false"
      :before-close="onClose"
      width="700px"
    >
      <el-form ref="dataForm" :model="dataForm" :show-message="true" :rules="rules"
               label-width="80px">
        <el-row>
            <el-col :span="12">
                <el-form-item label="合同编码" prop="code">
                    <el-input v-model="dataForm.code" placeholder="请输入编码"/>
                </el-form-item>
            </el-col>
          <el-col :span="12">
            <el-form-item label="客户名称" prop="name">
              <el-select v-model="dataForm.name" placeholder="请选择客户名称" style="width:100%">
                <el-option label="钱浅" value="1"/>
                <el-option label="吴丹" value="2"/>
                <el-option label="刘敏" value="3"/>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="设备机型" prop="machineName">
              <el-select v-model="dataForm.machineName" placeholder="请选择设备机型" style="width:100%">
                <el-option label="1#清花机" value="1"/>
                <el-option label="2#清花机" value="2"/>
                <el-option label="3#清花机" value="3"/>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="数量" prop="num">
              <el-input v-model=" dataForm.num" placeholder="请输入数量" :min=0
                        oninput="value=value.replace(/[^\d.]/g,'')"/>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="合同状态" prop="state">
              <el-select v-model="dataForm.state" placeholder="请选择合同状态" style="width:100%">
                <el-option label="未到货" value="1"/>
                <el-option label="已到货" value="2"/>
                <el-option label="已安装" value="3"/>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="合同期日" prop="signTime">
              <el-date-picker
                v-model="dataForm.signTime"
                type="date"
                class="input-style"
                style="width:100%"
                placeholder="请选择合同期日">
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="到货期日" prop="arrivalDate">
              <el-date-picker
                v-model="dataForm.arrivalDate"
                type="date"
                class="input-style"
                style="width:100%"
                placeholder="请选择到货日期">
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="安装日期" prop="installDate">
              <el-date-picker
                v-model="dataForm.installDate"
                type="date"
                class="input-style"
                style="width:100%"
                placeholder="请选择安装日期">
              </el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <span slot="footer">
        <el-button @click="onClose">取消</el-button>
        <el-button type="primary" @click="onDefinite">提交</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
    import {validateNull} from '../../../../utils/validator'
    import { salesContractDetail, salesContractSave } from '../../../../api/haijia/customer'

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
            },
          logId:{
            type: Number,
            default:null
          },
        },
        data() {
            return {
                showModal: false,
              dataForm: {
                    id: '',
                    name: '',
                    code: '',
                    machineName: '',
                    num: '',
                    state: '未到货',
                    signTime: '',
                    arrivalDate: '',
                    installDate: ''
                },
                rules: {
                    name: [
                        {required: true, validator: validateNull, trigger: 'change'}
                    ],
                  code: [
                    {required: true, validator: validateNull, trigger: 'change'}
                    ],
                    machineName: [
                        {required: true, validator: validateNull, trigger: 'change'}
                    ],
                    num: [
                        {required: true, validator: validateNull, trigger: 'change'}
                    ],
                    state: [
                        {required: true, validator: validateNull, trigger: 'change'}
                    ],
                    signTime: [
                        {required: true, validator: validateNull, trigger: 'change'}
                    ]
                }
            }
        },
        methods: {
            //提交
            onDefinite() {
              this.$refs.ruleForm.validate((valid) => {
                if (valid) {
                  salesContractSave({
                    id: this.logId,
                    name: this.dataForm.name,
                    code: this.dataForm.code,
                    num: this.dataForm.num,
                    state: this.dataForm.state,
                    signTime: this.dataForm.signTime,
                    arrivalDate: this.dataForm.arrivalDate,
                    installDate: this.dataForm.installDate
                  }).then(res => {
                    if (res.data.status == 200) {
                      this.$message({
                        type: 'success',
                        message: res.data.message
                      })
                      this.resetForm(true);
                    }
                  })

                } else {
                  this.$message({
                    message: '请填写完整信息！',
                    type: 'warning'
                  })
                  return false;
                }
              })
            },
            //重置
            resetForm() {
                this.$refs.dataForm.resetFields()
            },
            //取消
            onClose() {
                this.resetForm()
                this.$emit('onSalesContractLog', false)
                this.showModal = false
            }
        },
        watch: {
        showDlog(newVal) {
          this.showModal = newVal
          if (newVal) {
            if (this.dialogTitle == '编辑') {
              this.dataForm.id =this.logId
              salesContractDetail({id: this.logId}).then(res => {
                if(res.data.status === 200)
                {
                  this.dataForm = res.data.res
                }
              })
            } else if (this.dialogTitle == '新增') {
              this.dataForm.id = ''
            }
          }
        }
      },
    }
</script>

<style scoped>

</style>

