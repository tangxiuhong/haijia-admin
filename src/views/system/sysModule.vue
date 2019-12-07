<template>
    <div>
        <!--操作-->
        <div class="margin-bottom-18">
            <el-button v-model="dialogTitle" type="primary" @click="onAddData(0)">{{ title.addTxt }}</el-button>
        </div>
        <el-table
            :data="tableData"
            row-key="id"
            border
            :default-expand-all="false"
            :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
        >
            <el-table-column
                min-width="200"
                label="模块名称">
                <template slot-scope="scope">
                    <span class="el-table__placeholder" v-if="scope.row.tableIndent"></span>
                    <span>{{scope.row.name}}</span>
                    <i class="el-icon-circle-plus" @click="onAddData(scope.row.id)"></i>
                    <span v-show="false">{{ title.addTxt }}</span>
                </template>
            </el-table-column>
            <!----------------->
            <el-table-column
                prop="code"
                label="编码"
            >
            </el-table-column>
            <el-table-column
                prop="state"
                align="center"
                label="状态">
                <template slot-scope="scope">
                    <span class="stateTrue" v-if="scope.row.state==1">启用</span>
                    <span class="stateFalse" v-if="scope.row.state==0">停用</span>
                </template>
            </el-table-column>
            <el-table-column
                prop="iconUrl"
                label="图标样式">
                <template slot-scope="scope">
                    <span :class="'sh-iconfont' + ' ' + scope.row.iconUrl"
                          v-if="scope.row.iconUrl.indexOf('sh-icon')!==-1"></span>
                    <i :class="scope.row.iconUrl" v-if="scope.row.iconUrl.indexOf('el-icon')!==-1"></i>
                </template>
            </el-table-column>
            <!----------------->
            <el-table-column
                prop="sortNum"
                sortable
                align="center"
                label="排序">
            </el-table-column>
            <el-table-column
                align="center"
                fixed="right"
                width="150"
                label="操作">
                <template slot-scope="scope">
                    <el-button v-model="dialogTitle" type="text" size="small" @click="onEditData(scope.row.id)">{{
                        title.editTxt}}
                    </el-button>
                    <!--<el-button v-model="dialogTitle" type="text" size="small" @click="onAddData(scope.row.id)">{{ title.addTxt }}</el-button>-->
                    <el-button type="text" size="small" @click="onDeleteData(scope.row.id)">删除</el-button>
                </template>
            </el-table-column>

        </el-table>
        <sys-module-log :show-dlog="showDlog" ref="sysModuleLog" :childPName="childPName" :logId="logId" :dialog-title="dialogTitle" @onSysModuleLog="getData"/>
    </div>
</template>

<script>
    // 新增，删除，编辑
    import sysModuleLog from './components/sysModule-dialog'
    //ajax
    import {moduleAxios} from '@/api/system/module.js'
    //引入混入对象
    import addAndDel from '@/views/mixin/addAndDel.js'
    import { moduleDelete, moduleList } from '../../api/system/module'
    export default {
        name: 'module',
        components: {
            sysModuleLog
        },
        mixins:[addAndDel],
        data() {
            return {
                tableData: [],
                dataForm: [],
                formInline: {
                    name: ''
                },
                tableIndent: false,
                resData: [],
                childPName: '',
                parentID: null,
                parentName:''
            }
        },
        methods: {
            // 获取数据
            getTableData() {
                this.loading = true
                moduleList().then(res => {
                    if (res.data.status === 200) {
                        this.loading = false
                        let list = res.data.res;
                        this.resData = list
                        let treeList = [];
                        generateTreeList(list,0, treeList);
                        this.tableData = treeList;
                        this.tableData.forEach((item, index) => {
                            if (item.children.length < 1) {
                                item.tableIndent = true;
                            } else {
                                item.tableIndent = false;
                            }
                        })
                    }
                })
                function generateTreeList(src, node, target) {
                    let children = src.filter((item) => {
                        return item.parentId === node
                    })
                    if (children.length > 0) {
                        children.forEach((item, index) => {
                            item.children = [];
                            target.push(item);
                            generateTreeList(src,item.id, item.children);
                        });
                    }
                }
            },
            //新增编辑id与name传值
            getChildData(id) {
                this.showDlog = true;
                if (id) {
                    this.logId=id;
                    this.resData.forEach((item, index) => {
                        if (item.id == this.logId) {
                            this.childPName = item.name
                        }
                    })
                } else {
                    this.logId = null;
                }
            },
            // 新增
            onAddData(id) {
                this.getChildData(id)
                this.dialogTitle = this.title.addTxt
            },
            // 编辑
            onEditData(id) {
                this.getChildData(id)
                this.dialogTitle = this.title.editTxt
            },
            //  删除
            onDeleteData(id) {
                this.$confirm('确定删除?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    moduleDelete({id:id}).then(res => {
                        if (res.data.status === 200) {
                            this.loading = false
                            this.getTableData()
                            this.$message({
                                type: 'success',
                                message: '删除成功!'
                            })
                            this.$router.go(0)
                        }
                    })
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    })
                })
            }
        }
    }
</script>

<style scoped lang="scss">

</style>
