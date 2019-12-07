<template>
  <el-dialog
    :title="dialogTitle+'角色'"
    :visible.sync="showModal"
    :close-on-click-modal="false"
    :before-close="onClose"
    width="30%">
    <el-form
      :model="roleForm"
      :rules="rules"
      :show-message="true"
      ref="roleForm"
      label-width="80px"
      v-loading="loading">
      <el-form-item label="角色名称" prop="name" class="inputLength">
        <el-input v-model="roleForm.name" placeholder="请输入角色名称"></el-input>
      </el-form-item>
      <el-form-item label="角色编码" prop="code" class="inputLength">
        <el-input v-model="roleForm.code" placeholder="请输入角色编码"></el-input>
      </el-form-item>
      <el-form-item label="排序" prop="sortNum" size="small">
        <el-input-number v-model="roleForm.sortNum" controls-position="right" :min="0"></el-input-number>
      </el-form-item>
      <el-form-item label="备注" prop="remark" class="inputLength">
        <el-input
          type="textarea"
          :rows="2"
          placeholder="请输入内容"
          v-model="roleForm.remark">
        </el-input>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="onClose">取消</el-button>
      <el-button type="primary" @click="onDefinite" :disabled="disabled">提交</el-button>
    </span>
  </el-dialog>
</template>

<script>
    import {moduleAxios} from '@/api/system/module.js'
    import { roleDetail, roleSave } from '../../../api/system/module'

    export default {
        name: 'Dialog',
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
            const validateRoleCode = (rule, value, callback) => {
                value ? callback() : callback(new Error())
            }
            const validateRoleName = (rule, value, callback) => {
                value ? callback() : callback(new Error())
            }
            return {
                disabled: false,
                sysRoleLog: false,
                roleData: [],
                loading: false,
                roleForm: {
                    id: '',
                    name: '',
                    code: '',
                    sortNum: 0,
                    remark: ''
                },
                rules: {
                    code: [
                        {required: true, validator: validateRoleCode, trigger: 'change'}
                    ],
                    name: [
                        {required: true, validator: validateRoleName, trigger: 'change'}
                    ]
                },
                showModal: false
            }
        },
        methods: {
            onDefinite() {
                this.$refs.roleForm.validate((valid) => {
                    this.loading = true
                    if (valid) {
                        roleSave({
                            name: this.roleForm.name,
                            code: this.roleForm.code,
                            sortNum: this.roleForm.sortNum,
                            remark: this.roleForm.remark,
                            id: this.roleForm.id
                        }).then(res => {
                            if (res.data.status == 200) {
                                this.loading = false
                                this.disabled = true
                                this.$refs.roleForm.resetFields()
                                this.$emit('onSysRoleLog', 'showDlog', true)
                                this.sysRoleLog = false
                                this.$message({
                                    message: res.data.message,
                                    type: 'success'
                                })
                            } else {
                                this.loading = false
                                this.disabled = false
                            }
                        })
                    } else {
                        this.$message({
                            message: '请填写完整信息！',
                            type: 'warning'
                        })
                        this.loading = false
                        return false
                    }
                })
            },
            onClose() {
                this.$refs.roleForm.resetFields()
                // 第二个值为父组件v-bind绑定的子组件显示隐藏属性，第三个值为控制父组件是否调用getTableData方法更新数据
                this.$emit('onSysRoleLog', 'showDlog', false)
            }
        },
        watch: {
            showDlog: function(newVal) {
                this.showModal = newVal
                if (newVal) {
                    this.disabled = false
                    if (this.dialogTitle == '编辑') {
                        this.loading = true
                        this.roleForm.id = this.logId
                        this.sysRoleLog = true
                        roleDetail({ id: this.logId }).then(res => {
                            if (res.data.status == 200) {
                                this.loading = false
                                this.roleForm.name = res.data.res.name
                                this.roleForm.code = res.data.res.code
                                this.roleForm.sortNum = res.data.res.sortNum
                                this.roleForm.remark = res.data.res.remark
                            }
                        })
                    } else if (this.dialogTitle == '新增') {
                        this.roleForm.id = ''
                        this.sysRoleLog = true
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
