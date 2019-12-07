<template>
  <el-dialog :title="dialogTitle" :visible.sync="showModal" :before-close="onClose">
    <div class="selBox">
      <el-checkbox v-model="checkAll" :indeterminate="isIndeterminate" @change="onCheckAllChange">全选</el-checkbox>
    </div>
    <el-row>
      <el-checkbox-group v-for="role in tableData" v-model="checkedName" @change="onCheckedNameChange">
        <el-col :span="8">
          <el-checkbox :key="role.id" :label="role.id">{{ role.name }}</el-checkbox>
        </el-col>
      </el-checkbox-group>
    </el-row>
    <div slot="footer" class="dialog-footer">
      <el-button @click="onClose">取 消</el-button>
      <el-button type="primary" :disabled="disabled" @click="onDefinite()">提 交</el-button>
    </div>
  </el-dialog>
</template>

<script>
    export default {
        name: 'Dialog',
        props: {
            dialogTitle: {
                type: String,
                default: ''
            },
            sysUserRoleLog: {
                type: Boolean,
                default: false
            },
            logId: {
                type: Number,
                default: null
            }
        },
        data() {
            return {
                disabled: false,
                loading: false,
                showModal: false,
                tableData: [],
                checkAll: false,
                checkedName: [],
                isIndeterminate: true,
                selID: [],
                selRowID: [],
                updateSelID: []
            }
        },
        watch: {
            sysUserRoleLog(newVal) {
                this.showModal = newVal
                if (newVal) {
                    this.loading = true
                    this.updateSelID = this.logId
                    this.getChecked()
                }
            }
        },
        created() {

        },
        methods: {
            onCheckAllChange(val) {
                const selID = []
                this.tableData.forEach(item => {
                    selID.push(item.id)
                })
                this.checkedName = val ? selID : []
                this.isIndeterminate = false
            },
            onCheckedNameChange(value) {
                const checkedCount = value.length
                this.checkAll = checkedCount === this.tableData.length
                this.isIndeterminate = checkedCount > 0 && checkedCount < this.tableData.length
            },
            // 提交
            onDefinite() {
                this.loading = true
                this.disabled = true
                this.$axios.post('frame.user.saveRole', {
                    userId: this.updateSelID,
                    roleIds: this.checkedName
                }).then(res => {
                    if (res.data.status == 200) {
                        this.disabled = false
                        this.$message({
                            type: 'success',
                            message: res.data.message
                        })
                        this.showModal = false
                        this.loading = false
                        // 第二个值为父组件v-bind绑定的子组件显示隐藏属性，第三个值为控制父组件是否调用getTableData方法更新数据
                        this.$emit('onSysUserRoleLog', 'sysUserRoleLog', true)
                    }
                })
            },
            onClose() {
                this.checkedName = []
                // 第二个值为父组件v-bind绑定的子组件显示隐藏属性，第三个值为控制父组件是否调用getTableData方法更新数据
                this.$emit('onSysUserRoleLog', 'sysUserRoleLog', false)
            },
            getCheckAllRole() {
                return this.$axios.post('frame.role.list').then(res => {
                    if (res.data.status == 200) {
                        this.tableData = res.data.res
                    }
                })
            },
            getSelectedRole() {
                return this.$axios.post('frame.user.roleList', {userId: this.logId}).then(res => {
                    if (res.data.status == 200) {
                        this.checkedName = res.data.res
                    }
                })
            },
            async getChecked() {
                try {
                    await this.getCheckAllRole()
                    await this.getSelectedRole()
                } catch (e) {
                    this.$message({
                        type: 'error',
                        message: '数据请求异常'
                    })
                }
            }

        }
    }
</script>

<style scoped>
  .selBox {
    padding-bottom: 15px;
  }

  .selBox >>> .el-checkbox__label {
    font-weight: 600 !important;
  }
</style>
