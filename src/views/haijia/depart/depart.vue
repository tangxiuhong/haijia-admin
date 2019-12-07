<template>
    <div>
        <div class="margin-bottom-18">
            <el-row>
                <el-col :span="12">
                    <el-button v-model="dialogTitle" type="primary" @click="onAddData(0)">{{ title.addTxt }}</el-button>
                    <!--<el-button v-model="dialogTitle" type="primary" @click="onDeleteData">{{ title.deleteTxt }}</el-button>-->
                </el-col>
                <!--        <el-col :span="12" align="right">-->
                <!--          <el-form :inline="true" :model="formInline" class="demo-form-inline">-->
                <!--            <el-form-item>-->
                <!--              <el-input v-model="formInline.name" placeholder="请输入用户姓名" v-on:keyup.enter.native="onQuery"/>-->
                <!--            </el-form-item>-->
                <!--            <el-form-item>-->
                <!--              <el-button type="primary" @click="onQuery">查询</el-button>-->
                <!--            </el-form-item>-->
                <!--          </el-form>-->
                <!--        </el-col>-->
            </el-row>
        </div>
        <el-table
            :data="tableData"
            style="width: 100%;margin-bottom: 20px;"
            row-key="id"
            border
            :default-expand-all="false"
            :tree-props="{children: 'children', hasChildren: 'hasChildren'}">
            <el-table-column
                prop="name"
                label="名称"
                min-width="150">
                <template slot-scope="scope">
                    <span class="el-table__placeholder" v-if="scope.row.tableIndent"></span>
                    <span>{{scope.row.name}}</span>
                    <i class="el-icon-circle-plus" @click="onAddData(scope.row.id)"></i>
                    <span v-show="false">{{ title.addTxt }}</span>
                </template>
            </el-table-column>
            <el-table-column
                prop="code"
                label="编码"
                min-width="120">
            </el-table-column>
            <el-table-column
                prop="shortName"
                label="简称"
                min-width="120">
            </el-table-column>
            <el-table-column
                prop="state"
                label="状态"
                min-width="120">
                <template slot-scope="scope">
                    <span class="stateTrue" v-if="scope.row.state==1" type="primary" size="mini">启用</span>
                    <span class="stateFalse" v-if="scope.row.state==0" type="info" size="mini">停用</span>
                </template>
            </el-table-column>
            <el-table-column
                prop="sortNum"
                label="排序"
                min-width="120">
            </el-table-column>
            <!--<el-table-column-->
            <!--prop="create_name"-->
            <!--label="创建人"-->
            <!--min-width="120">-->
            <!--</el-table-column>-->
            <!--<el-table-column-->
            <!--prop="create_time"-->
            <!--label="创建时间"-->
            <!--min-width="120">-->
            <!--</el-table-column>-->
            <!--<el-table-column-->
            <!--prop="update_name"-->
            <!--label="更新人"-->
            <!--min-width="120">-->
            <!--</el-table-column>-->
            <!--<el-table-column-->
            <!--prop="update_time"-->
            <!--label="更新时间"-->
            <!--min-width="120">-->
            <!--</el-table-column>-->
            <el-table-column
                align="center"
                label="操作"
                width="100"
                fixed="right">
                <template slot-scope="scope">
                    <el-button @click="onEditData(scope.row.id)" type="text" size="small">编辑</el-button>
                    <el-button @click="onDeleteData(scope.row.id)" type="text" size="small">{{ title.deleteTxt }}
                    </el-button>
                </template>
            </el-table-column>
        </el-table>
        <!--新增编辑弹框-->
        <depart-dlog :show-dlog="showDlog" :log-id="logId" :dialog-title="dialogTitle" :childPName="childPName"
                     @onMachineDlog="getData"></depart-dlog>
    </div>
</template>

<script>
    import departDlog from './components/depart-dlog';
    import {deptList,deptDelete} from '../../../api/haijia/depart'

    import addAndDel from '../../mixin/addAndDel'

    export default {
        name: "depart",
        components: {
            departDlog
        },
        mixins: [addAndDel],
        data () {
            return {
                tableData: [],
                formInline: {
                    name: ''
                },
                tableIndent: false,
                resData: [],
                parentID: null,
                childPName: '',
                parentName:''
            }
        },
        created () {
            this.getTableData()
        },
        mounted () {
        },
        methods: {
            //获取数据
            getTableData () {
                deptList().then(res => {
                    if (res.data.status === 200) {
                        let list = res.data.res;
                        this.resData = list
                        let treeList = [];
                        generateTreeList(list, 0, treeList);
                        this.tableData = treeList;
                        this.tableData.forEach((item, index) => {
                            if (item.children.length < 1) {
                                item.tableIndent = true
                            } else {
                                item.tableIndent = false
                            }
                        })
                    }
                })

                function generateTreeList (src, node, target) {
                    let childern = src.filter((item) => {
                        return item.parentId === node
                    })
                    if (childern.length > 0) {
                        childern.forEach((item) => {
                            item.children = []
                            target.push(item)
                            generateTreeList(src, item.id, item.children);
                        })
                    }
                }
            },
            //新增编辑id与name传值
            getChildData (id) {
                this.showDlog = true;
                if (id) {
                    console.log("有id")
                    this.logId = id;
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
            onAddData (id) {
                this.getChildData(id)
                this.dialogTitle = this.title.addTxt
            },
            // 编辑
            onEditData (id) {
                this.getChildData(id)
                this.dialogTitle = this.title.editTxt
            },
            onDeleteData (id) {
                this.$confirm('确定删除?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    deptDelete({id: id}).then(res => {
                        if (res.data.status === 200) {
                            this.$message({
                                type: 'success',
                                message: '删除成功!'
                            })
                            this.getTableData()
                        }
                    })
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    })
                })
            },
        }
    }
</script>

<style scoped>

</style>
