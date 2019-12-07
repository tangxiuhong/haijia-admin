<template>
    <div>
        <el-row>
            <el-col :span="12">
                <el-button type="primary" @click="onAddData">{{title.addTxt}}</el-button>
            </el-col>
            <el-col :span="12" align="end">
                <el-form :inline="true"  :model="formInline"   @submit.native.prevent>
                    <el-form-item>
                        <el-input v-model="formInline.name"  placeholder="请输入参数key名称"  @keyup.enter.native="onSearch"  clearable></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="onSearch">查询</el-button>
                    </el-form-item>
                </el-form>
            </el-col>
        </el-row>
        <el-table :data="tableDate" border size="small" style="width:100%" v-loading="loading">
            <el-table-column label="参数key" prop="paraKey"></el-table-column>
            <el-table-column label="参数值" prop="paraValue"></el-table-column>
            <el-table-column label="排序" prop="sortNum"></el-table-column>
            <el-table-column label="备注" prop="remark"></el-table-column>
            <el-table-column label="操作" prop="paraOperation" align="center" width="100" fixed="right">
                <template slot-scope="scope">
                    <el-button type="text" @click="onEditData(scope.row.id)">编辑</el-button>
                    <el-button type="text" @click="onDeleteData(scope.row.id)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination align="end"
                       @size-change="sizeChangeHandle"
                       @current-change="currentChangeHandle"
                       :page-sizes="pagingNum"
                       :page-size="pageSize"
                       :current-page="pageIndex"
                       layout="total, sizes, prev, pager, next, jumper"
                       :total="totalPage"></el-pagination>
        <sys-para-log :dialog-title="dialogTitle" :showDlog="showDlog" :logId="logId"
                      @onSysParaLog="getData"></sys-para-log>
    </div>
</template>

<script>
    import sysParaLog from './components/sysPara-dialog'
    //引入混入对象
    import addAndDel from '@/views/mixin/addAndDel.js'
    import { paraList , paraDelete} from '../../api/system/module'
    export default {
        name: 'SysPara',
        components: {
            sysParaLog
        },
        mixins: [addAndDel],
        data () {
            return {
                tableDate: [],
              formInline: {
                name: '',
              }
            }
            },
        methods: {
            //获取数据
            getTableData () {
                this.loading = true
                paraList({
                    pageSize: this.pageSize,
                  pageIndex: this.pageIndex,
                }).then(res => {
                  if (res.data.status === 200) {
                    this.tableDate = res.data.res
                    this.totalPage = res.data.count
                    this.loading = false
                    }
                })
            },
          //查询
          onSearch() {
              paraList({
              pageSize: this.pageSize,
              pageIndex: this.pageIndex,
              name: this.formInline.name
          }).then(res => {
              if (res.data.status === 200) {
                this.tableDate = res.data.res
                this.totalPage = res.data.count
                this.loading = false
              }
          })
          },
            //删除
            onDeleteData(id) {
                this.$confirm('确定删除？', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    paraDelete('frame/para/delete', {id: id}).then(res => {
                        if (res.data.status === 200) {
                            this.getTableData()
                            this.$message({
                                message: '删除成功',
                                type: 'success'
                            });
                        }
                    })
                }).catch(() => {
                    this.$message({
                        message: '已取消删除',
                        type: 'info'
                    });
                });
            },
    }
    }
</script>

<style scoped>

</style>
