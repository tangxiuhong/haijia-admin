<template>
  <div>
    <el-row>
      <el-col :span="12">
        <el-button type="primary" @click="onAddData">新增</el-button>
      </el-col>
      <el-col :span="12" align="right">
        <el-form :inline="true" :model="formInline" @submit.native.prevent>
          <el-form-item>
            <el-input v-model="formInline.name" placeholder="请输入岗位名称" clearable
                      @keyup.enter.native="onQuery"/>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onQuery">查询</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
    <el-table :data="tableData" border size="small">
      <el-table-column prop="name" label="名称"/>
      <el-table-column prop="code" label="编码"/>
      <el-table-column prop="typeName" label="岗位分类"/>
      <el-table-column prop="remark" label="描述"/>
      <el-table-column prop="roleOperation" label="操作" align="center" width="100" fixed="right">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="onEditData(scope.row.id)">编辑</el-button>
          <el-button type="text" size="small" @click="onDeleteData(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination align="right"
                   @size-change="sizeChangeHandle"
                   @current-change="currentChangeHandle"
                   :current-page=" pageIndex"
                   :page-sizes="pagingNum"
                   :page-size="pageSize"
                   layout="total, sizes, prev, pager, next, jumper"
                   :total="totalPage"
    >
    </el-pagination>
    <post-log :show-dlog="showDlog" :dialog-title="dialogTitle" :log-id="logId" @onPostLog="getData"/>
  </div>
</template>

<script>
    import postLog from './components/post-dialog'
    // import {moduleAxios} from '@/api/haijia/basicData'
    import addAndDel from '@/views/mixin/addAndDel'
    import { postDelete, postList } from '../../../api/haijia/basicData'

    export default {
        name: 'post',
        components: {
            postLog
        },
        mixins: [addAndDel],
        data() {
            return {
                tableData: [],
                formInline: {
                    name: ''
                }
            }
        },
        methods: {
            //获取数据
            getTableData() {
                postList({
                    pageSize: this.pageSize,
                    pageIndex: this.pageIndex,
                }).then(res => {
                    if (res.data.status === 200) {
                        this.tableData = res.data.res
                        this.totalPage = res.data.count
                    }
                })
            },
            //查询
            onQuery() {
                postList({
                    pageSize: this.pageSize,
                    pageIndex: this.pageIndex,
                    name: this.formInline.name
                }).then(res => {
                    if (res.data.status === 200) {
                        this.tableData = res.data.res
                        this.totalPage = res.data.count
                    }
                })
            },
            //删除
            onDeleteData(id) {
                this.$confirm('确定删除?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    postDelete({id: id}).then(res => {
                        if (res.data.status === 200) {
                            this.$message({
                                type: 'success',
                                message: res.data.message
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
            }
        }
    }
</script>

<style scoped>

</style>
