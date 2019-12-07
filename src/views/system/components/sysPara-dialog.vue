<template>
  <el-dialog
    :visible.sync="showModal"
    :title="dialogTitle"
    width="30%"
    :close-on-click-modal="false"
    :before-close="onClose">
    <el-form
      :model="ruleForm"
      :rules="rules"
      :show-message="true"
      ref="ruleForm"
      label-width="80px"
      v-loading="loading">
      <el-form-item label="参数key" prop="paraKey">
        <el-input v-model="ruleForm.paraKey" placeholder="请输入参数key"></el-input>
      </el-form-item>
      <el-form-item label="参数值" prop="paraValue">
        <el-input v-model="ruleForm.paraValue" placeholder="请输入参数值"></el-input>
      </el-form-item>
      <el-form-item label="排序" prop="sortNum">
        <el-input-number v-model="ruleForm.sortNum" :min="0" controls-position="right"></el-input-number>
      </el-form-item>
      <el-form-item label="备注" prop="remark">
        <el-input v-model="ruleForm.remark" placeholder="请输入内容" type="textarea" :rows="2"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="onClose">取消</el-button>
      <el-button type="primary" @click="onDefinite" :disabled="disabled">提交</el-button>
    </div>
  </el-dialog>
</template>

<script>
    import { paraDetail, paraSave } from '../../../api/system/module'

    export default {
        name: 'SysParaDialog',
        props: {
            dialogTitle: {
                type: String
            },
            logId: {
                type: Number,
                default: null
            },
            showDlog: {
                type: Boolean,
                default: false
            }
        },
        data() {
            const validateParaName = (rule, value, callback) => {
                value ? callback() : callback(new Error())
            }
            const validateParaValue = (rule, value, callback) => {
                value ? callback() : callback(new Error())
            }
            return {
                loading: false,
                showModal: false,
                disabled: false,
                ruleForm: {
                    id: '',
                    paraKey: '',
                    paraValue: '',
                    sortNum: 0,
                    remark: ''
                },
                rules: {
                    paraKey: [
                        {required: true, validator: validateParaName, trigger: 'change'}
                    ],
                    paraValue: [
                        {required: true, validator: validateParaValue, trigger: 'change'}
                    ]
                }
            }
        },
        methods: {
            onDefinite() {
                this.$refs.ruleForm.validate((valid) => {
                    if (valid) {
                        paraSave({
                            paraKey: this.ruleForm.paraKey,
                            paraValue: this.ruleForm.paraValue,
                            sortNum: this.ruleForm.sortNum,
                            remark: this.ruleForm.remark,
                            id: this.ruleForm.id
                        }).then(res => {
                            if (res.data.status === 200) {
                                this.loading = false
                                this.$refs.ruleForm.resetFields()
                                this.$emit('onSysParaLog', 'showDlog', true)
                                this.$message({
                                    message: res.data.message,
                                    type: 'success'
                                })
                                this.disabled = true
                            } else {
                                this.disabled = false
                                this.loading = false
                            }
                        })
                    } else {
                        this.$message({
                            message: '请填写完整信息！',
                            type: 'warning'
                        })
                        this.disabled = false
                        return false
                    }
                })
            },
            onClose() {
                this.$emit('onSysParaLog', 'showDlog', false)
                this.$refs.ruleForm.resetFields()
            }
        },
        watch: {
            showDlog(newVal) {
                this.showModal = newVal
                if (newVal) {
                    this.disabled = false
                    if (this.dialogTitle == '编辑') {
                        this.loading = true
                        this.ruleForm.id = this.logId
                        paraDetail({id: this.logId}).then(res => {
                            if (res.data.status === 200) {
                                this.ruleForm = res.data.res
                                this.loading = false
                            }
                        })
                    } else if (this.dialogTitle == '新增') {
                        this.ruleForm.id = ''
                    }
                }
            }
        }
    }
</script>

<style scoped>
  .inputLength {
    width: 80%
  }
</style>
