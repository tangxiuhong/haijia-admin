<template>
    <el-dialog :title="dialogTitle" :visible.sync="showModal" :before-close="onClose" :close-on-click-modal="false">
        <el-tree
            :data="tableData"
            show-checkbox
            node-key="id"
            ref="tree"
            :props="defaultProps"
            @check-change="onCheckChange"
            default-expand-all
            v-loading="loading"
            :default-checked-keys="treeSeledID">
        </el-tree>
        <div slot="footer" class="dialog-footer">
            <el-button @click="onClose">取 消</el-button>
            <el-button type="primary" @click="onDefinite()" :disabled="disabled">提 交</el-button>
        </div>
    </el-dialog>
</template>

<script>
    // ajax
    import {moduleAxios} from '@/api/system/module.js'
    import { moduleList, userModuleList, userRoleModuleList, userSaveModule } from '../../../api/system/module'
    export default {
        name: 'Dialog',
        props: {
            dialogTitle: {
                type: String
            },
            selDisable: {
                type: Boolean
            },
            sysUserModuleLog: {
                type: Boolean,
                default: false
            },
            logId: {
                type: Number,
                default: null
            }
        },
        data () {
            return {
                disabled: false,
                loading: false,
                showModal: false,
                tableData: [
                    {
                        id: '',
                        name: '',
                        children: [],
                    }
                ],
                defaultProps: {
                    children: 'children',
                    label: 'name',
                },
                treeSeledID: [],
                selID: [],
                userRoleID: [],
                resData: [],
                selRowID: [],
                userSelID: []
            }
        },
        methods: {
            onCheckChange () {
                this.selRowID = this.$refs.tree.getCheckedKeys()
            },
            onDefinite () {
                this.loading = true
                let userID=[];
                this.resData.forEach(allList => {
                    if (allList.disabled == false) {
                        this.selRowID.forEach(item => {
                            if(allList.parentId!==0){
                                if (item == allList.id) {
                                    userID.push(item)
                                }
                            }
                        })
                    }
                })
                userSaveModule({
                    userId: this.updateSelID,
                    moduleIds: userID
                }).then(res => {
                    if (res.data.status == 200) {
                        this.disabled = false
                        this.showModal = false
                        this.loading = false
                        this.$message({
                            type: "success",
                            message: res.data.message
                        })
                        //第二个值为父组件v-bind绑定的子组件显示隐藏属性，第三个值为控制父组件是否调用getTableData方法更新数据
                        this.$emit('onSysUserModuleLog', 'sysUserModuleLog', true)
                    }
                })
            },
            onClose () {
                this.treeSeledID = []
                //第二个值为父组件v-bind绑定的子组件显示隐藏属性，第三个值为控制父组件是否调用getTableData方法更新数据
                this.$emit('onSysUserModuleLog', 'sysUserModuleLog', false)
            },
            getCheckId () {
                let _this = this;
                //getList拿到模块所有list并排序
                let getList = new Promise((resolve, reject) => {
                    moduleList().then(res => {
                        if (res.data.status === 200) {
                            this.resData = res.data.res;
                            resolve(this.resData)
                        } else {
                            reject(data.data.message)
                        }
                    })
                })
                //getUserSel拿到之前角色已选择的ID
                let getUserSel = new Promise((resolve, reject) => {
                    userRoleModuleList({userId: this.logId}).then(data => {
                        if (data.data.status == 200) {
                            this.userRoleID = data.data.res
                            resolve(this.userRoleID)
                        } else {
                            reject(data.data.message)
                        }
                    })
                })
                //拿到用户自己选择的id
                let getSelected = new Promise((resolve, reject) => {
                   userModuleList({userId: this.logId}).then(data => {
                        if (data.data.status == 200) {
                            this.selID = data.data.res
                            resolve(this.selID)
                        } else {
                            reject(data.data.message)
                        }
                    })
                })
                Promise.all([getList, getSelected, getUserSel]).then(() => {
                    this.loading = false;
                    //角色选中模块禁用选择事件
                    this.resData.forEach((allList) => {
                        allList.disabled = false
                        this.userRoleID.forEach((roleID) => {
                            if (allList.id == roleID) {
                                allList.disabled = true;
                            }
                        })
                    })
                    //角色选中模块与用户选中模块集合
                    this.treeSeledID = this.userRoleID.concat(this.selID)
                    //树状图数据
                    let treeList = [];
                    generateTreeList(0, treeList);

                    function generateTreeList (node, target) {
                        let children = _this.resData.filter((item) => item.parentId == node)
                        if (children.length > 0) {
                            children.forEach((item, index) => {
                                item.children = [];
                                target.push(item);
                                generateTreeList(item.id, item.children);
                            });
                        }
                    }
                    this.tableData = treeList;
                })
            }
        },
        watch: {
            sysUserModuleLog (newVal) {
                this.showModal = newVal;
                if (newVal) {
                    this.updateSelID = this.logId
                    this.showModal = true;
                    this.loading = true;
                    this.getCheckId();
                }
            }
        }
    }
</script>

<style scoped>

</style>
