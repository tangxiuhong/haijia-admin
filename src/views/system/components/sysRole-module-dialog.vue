<template>
  <el-dialog :title="dialogTitle" :visible.sync="showModal" :before-close="onClose">
    <div class="dialog-content-height">
      <el-tree
        ref="tree"
        v-loading="loading"
        :data="tableData"
        show-checkbox
        node-key="id"
        :props="defaultProps"
        default-expand-all
        :default-checked-keys="treeSeledID"
        @check-change="onCheckChange"
      />
    </div>

    <div slot="footer" class="dialog-footer">
      <el-button @click="onClose">取 消</el-button>
      <el-button type="primary" :disabled="disabled" @click="onDefinite()">提 交</el-button>
    </div>
  </el-dialog>
</template>

<script>
    import { moduleAxios } from '@/api/system/module.js'
    import { moduleList, roleModuleList, roleSaveModule } from '../../../api/system/module'

    export default {
        name: 'RoleModuleDialog',
        props: {
            dialogTitle: {
                type: String
            },
            logId: {
                type: Number,
                default: null
            },
            sysRoleModuleLog: {
                type: Boolean,
                default: false
            }
        },
        data() {
            return {
                disabled: false,
                loading: false,
                showModal: false,
                tableData: [
                    {
                        id: '',
                        name: '',
                        children: []
                    }
                ],
                defaultProps: {
                    children: 'children',
                    label: 'name'
                },
                treeSeledID: [],
                resData: [],
                selRowID: []
            }
        },
        watch: {
            sysRoleModuleLog(newVal) {
                this.showModal = newVal
                if (newVal) {
                    this.treeSeledID = []
                    this.loading = true
                    this.updateSelID = this.logId
                    this.getChecked()
                }
            }
        },
        methods: {
            onCheckChange() {
                this.selRowID = this.$refs.tree.getCheckedKeys(this.treeSeledID)
            },
            onDefinite() {
                this.disabled = true
                this.loading = true
                roleSaveModule({
                    roleId: this.updateSelID,
                    moduleIds: this.selRowID
                }).then(res => {
                    if (res.data.status == 200) {
                        this.disabled = false
                        this.showModal = false
                        this.loading = false
                        this.$message({
                            type: 'success',
                            message: res.data.message
                        })
                        // 第二个值为父组件v-bind绑定的子组件显示隐藏属性，第三个值为控制父组件是否调用getTableData方法更新数据
                        this.$emit('onSysRoleModuleLog', 'sysRoleModuleLog', true)
                    } else {
                        this.loading = false
                        this.disabled = false
                    }
                })
            },
            onClose() {
                // 第二个值为父组件v-bind绑定的子组件显示隐藏属性，第三个值为控制父组件是否调用getTableData方法更新数据
                this.$emit('onSysRoleModuleLog', 'sysRoleModuleLog', false)
            },
            getModule() {
                return moduleList().then(res => {
                    if (res.data.status === 200) {
                        const getData = res.data.res
                        this.resData = getData
                        const treeList = []
                        generateTreeList(0, treeList)

                        // eslint-disable-next-line no-inner-declarations
                        function generateTreeList(node, target) {
                            const children = getData.filter((item) => item.parentId == node)
                            if (children.length > 0) {
                                children.forEach((item, index) => {
                                    item.children = []
                                    target.push(item)
                                    generateTreeList(item.id, item.children)
                                })
                            }
                        }

                        this.tableData = treeList
                    }
                })
            },
            getCheckModule() {
                return roleModuleList({ id: this.logId }).then(data => {
                    // eslint-disable-next-line eqeqeq
                    if (data.data.status == 200) {
                        this.$nextTick(() => {
                            this.treeSeledID = data.data.res
                        })
                    }
                })
            },
            async getChecked() {
                await this.getModule()
                await this.getCheckModule()
                this.loading = false
            }
        }
    }
</script>

<style scoped>

</style>
