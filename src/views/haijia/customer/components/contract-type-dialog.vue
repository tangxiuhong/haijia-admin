<template>
  <div>
    <el-dialog
      :title="dialogTitle"
      :visible="ContractTypeLog"
      :close-on-click-modal="false"
      :before-close="onClose"
      width="30%">
      <el-form :model="ContractTypeForm" :show-message="true" :rules="rules" ref="ContractTypeForm" label-width="100px">
        <el-form-item label="分类名称" prop="name">
          <el-input v-model="ContractTypeForm.name" placeholder="请输入名称"></el-input>
        </el-form-item>
        <el-form-item label="描述" prop="remarks">
          <el-input v-model="ContractTypeForm.remarks" type="textarea" :rows="2" placeholder="请输入内容"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer">
          <el-button @click="onClose('ContractTypeForm')">取消</el-button>
          <el-button @click="resetForm('ContractTypeForm')">重置</el-button>
          <el-button type="primary" @click="onDefinite('ContractTypeForm')" :disable="disable">提交</el-button>
        </span>
    </el-dialog>
  </div>
</template>

<script>
    export default {
        name: 'contract-type-dialog',
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
            const validateName = (rule, value, callback) => {
                value ? callback() : callback(new Error())
            }
            return {
                ContractTypeLog: false,
                disable: false,
                ContractTypeForm: {
                    name: '',
                    remarks: ''
                },
                rules: {
                    name: [
                        {required: true, validator: validateName, trigger: 'change'}
                    ]
                }
            }
        },
        created() {
        },
        watch: {
            showDlog(newVal) {
                this.ContractTypeLog = newVal
            }
        },
        methods: {
            //提交
            onDefinite() {
                this.$refs.ContractTypeForm.validate((valid) => {
                    if (valid) {
                        alert('已提交')
                        this.resetForm()
                        this.$emit('onContractTypeLog', false)
                        this.ContractTypeLog = false
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
                this.$refs.ContractTypeForm.resetFields()
            },
            //取消
            onClose() {
                this.resetForm()
                this.$emit('onContractTypeLog', false)
                this.ContractTypeLog = false
            }
        }
    }
</script>

<style scoped>

</style>

