<template>
  <el-dialog :title="dialogTitle" :visible="showModal" :close-on-click-modal="false" :before-close="onClose" width="1%">
    <el-form
      ref="dataForm"
      :model="dataForm"
      label-width="100px"
      :show-message="true"
      class="form-width-95"
      :rules="rules"
    >
      <el-form-item label="登录名" prop="loginName">
        <el-input v-model="dataForm.loginName" placeholder="请输入登录名" />
      </el-form-item>
      <el-form-item label="用户姓名" prop="name">
        <el-input v-model="dataForm.name" placeholder="请输入用户姓名" />
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="dataForm.password" type="password" placeholder="请输入密码" />
      </el-form-item>
      <el-form-item label="账号状态" :inline="false" prop="state">
        <el-select v-model="dataForm.state" placeholder="请选择账号状态">
          <el-option label="启用" value="1" />
          <el-option label="停用" value="0" />
        </el-select>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="onClose">取 消</el-button>
      <!--      <el-button @click="resetForm">重 置</el-button>-->
      <el-button type="primary" :disabled="disabled" @click="onDefinite">提 交</el-button>
    </div>
  </el-dialog>
</template>

<script>
    import { validateNull, validatePassword } from '@/utils/validator'
    import { moduleAxios } from '@/api/system/module.js'
    import { userDetail, userSave } from '../../../api/system/module'

    export default {
        name: 'Dialog',
        props: {
            dialogTitle: {
                type: String,
                default: ''
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
            return {
                disabled: false,
                showModal: false,
                dataForm: {
                    id: '',
                    loginName: '',
                    name: '',
                    password: '',
                    state: ''
                },
                rules: {
                    loginName: [{ required: true, validator: validateNull, trigger: 'blur' }],
                    name: [{ required: true, validator: validateNull, trigger: 'blur' }],
                    password: [{ required: true, validator: validatePassword, trigger: 'blur' }],
                    state: [{ required: true, validator: validateNull, trigger: 'change' }]
                }
            }
        },
        watch: {
            showDlog(newVal) {
                this.showModal = newVal
                if (newVal) {
                    this.disabled = false
                    this.dataForm.id = this.logId
                    if (this.dialogTitle == '编辑') {
                        userDetail({ id: this.logId }).then(res => {
                            if (res.data.status == 200) {
                                this.dataForm = res.data.res
                                this.dataForm.state = String(res.data.res.state)
                                this.showModal = true
                            }
                        })
                    } else if (this.dialogTitle == '新增') {
                        this.dataForm = {}
                        this.showModal = true
                    }
                }
            }
        },
        mounted() {

        },
        methods: {
            onDefinite() {
                this.disabled = false
                this.$refs.dataForm.validate(valid => {
                    console.log(valid)
                    if (valid) {
                        userSave({
                            id: this.dataForm.id,
                            loginName: this.dataForm.loginName,
                            name: this.dataForm.name,
                            state: this.dataForm.state,
                            password: this.dataForm.password
                        }).then(res => {
                            if (res.data.status == 200) {
                                this.resetForm()
                                this.disabled = true
                                this.$message({
                                    message: res.data.message,
                                    type: 'success'
                                })
                                this.$emit('onSysUserLog', 'showDlog', true)
                                this.showModal = false
                            } else {
                                this.loading = false
                                this.disabled = false
                            }
                        })
                    } else {
                        this.loading = false
                        return false
                    }
                })
            },
            resetForm() {
                this.$refs.dataForm.resetFields()
            },
            onClose() {
                this.resetForm()
                this.$emit('onSysUserLog', 'showDlog', false)
            }
        }
    }
</script>

<style scoped>

</style>
