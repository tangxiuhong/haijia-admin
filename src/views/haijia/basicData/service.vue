<template>
  <div>
    <el-row>
      <el-col :span="12">
        <el-button type="primary" @click="onAddData">{{title.addTxt}}</el-button>
      </el-col>
      <el-col :span="12" align="right">
        <el-form :inline="true" :model="formInline" @submit.native.prevent>
          <el-form-item>
            <el-input v-model="formInline.urlName" placeholder="请输入查询条件" clearable
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
      <el-table-column prop="url" label="url地址"/>
      <el-table-column prop="category" label="类别"/>
      <el-table-column prop="serviceHost" label="host"/>
      <el-table-column prop="remark" label="备注"/>
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
    <service-log :show-dlog="showDlog" :dialog-title="dialogTitle" :log-id="logId"
                 @onServiceLog="getData"/>
  </div>
</template>

<script>
    import serviceLog from './components/service-dialog'
    import {moduleAxios} from '@/api/system/module.js'
    import ElPager from 'element-ui/packages/pagination/src/pager'
    import addAndDel from '@/views/mixin/addAndDel.js'

    export default {
        name: 'post',
        components: {
            ElPager,
            serviceLog
        },
        mixins: [addAndDel],
        data() {
            return {
                tableData: [],
                formInline: {
                    urlName: ''
                },
            }
        },
        methods: {
            //获取数据
            getTableData() {
                moduleAxios.serviceList({
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
                moduleAxios.serviceList({
                    pageSize: this.pageSize,
                    pageIndex: this.pageIndex,
                    urlName: this.formInline.urlName
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
                    moduleAxios.serviceDelete({id: id}).then(res => {
                        if (res.data.status === 200) {
                            this.$message({
                                type: 'success',
                                message: '删除成功!'
                            })
                            this.getTableData();
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
