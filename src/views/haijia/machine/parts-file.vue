<template>
  <div>
    <el-row>
      <el-col :span="12">
        <el-button type="primary" @click="onAddData">{{title.addTxt}}</el-button>
      </el-col>
      <el-col :span="12" align="right">
        <el-form :inline="true" :model="formInline" @submit.native.prevent>
          <el-form-item>
            <el-input v-model="formInline.name" placeholder="请输入配件名称" clearable
                      @keyup.enter.native="onQuery"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onQuery">查询</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
    <el-table :data="tableData" border size="small">
      <el-table-column label="名称" prop="name"></el-table-column>
      <el-table-column label="编码" prop="code"></el-table-column>
      <el-table-column label="配件分类" prop="categoryName"></el-table-column>
      <el-table-column label="计量单位" prop="unitName"></el-table-column>
      <el-table-column label="规格" prop="spec"></el-table-column>
      <el-table-column label="条码" prop="barCode"></el-table-column>
      <el-table-column label="单价" prop="price"></el-table-column>
      <el-table-column label="图片" prop="picture"></el-table-column>
      <el-table-column label="操作" align="center" width="100" fixed="right">
        <template slot-scope="scope">
          <el-button type="text" @click="onEditData(scope.row.id)" size="small">编辑</el-button>
          <el-button type="text" @click="onDeleteData(scope.row)" size="small">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div align="right">
      <el-pagination
        @current-change="currentChangeHandle"
        @size-change="sizeChangeHandle"
        :page-sizes="pagingNum"
        :page-size="pageSize"
        :current-page="pageIndex"
        layout="total, sizes, prev, pager, next, jumper"
        :total="totalPage"/>
    </div>
    <parts-file-log :show-dlog="showDlog" :dialog-title="dialogTitle" :log-id="logId"
                    @onPartsFileLog="getData"></parts-file-log>
  </div>
</template>

<script>
    import partsFileLog from './components/parts-file-dialog'
    import addAndDel from '@/views/mixin/addAndDel.js'
    import { partsDelete, partsList } from '../../../api/haijia/machine'

    export default {
        name: 'company',
        components: {
            partsFileLog
        },
        mixins: [addAndDel],
        data() {
            return {
                tableData: [],
                formInline: {
                    name: ''
                },
            }
        },
        methods: {
            //获取数据
            getTableData() {
                partsList({
                    pageIndex: this.pageIndex,
                    pageSize: this.pageSize,
                }).then(res => {
                    if (res.data.status === 200) {
                        this.tableData = res.data.res
                        this.totalPage = res.data.count
                    }
                })
            },
            //查询
            onQuery() {
              partsList({
                    pageIndex: this.pageIndex,
                    pageSize: this.pageSize,
                    name: this.formInline.name,
                }).then(res => {
                    if (res.data.status === 200) {
                        this.tableData = res.data.res
                        this.totalPage = res.data.count
                    }
                })
            },
            //删除
            onDeleteData(row) {
                this.$confirm('确定删除?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    partsDelete({id: row.id}).then(res => {
                        if (res.data.status === 200) {
                            this.$message({
                                type: 'success',
                                message: '删除成功!'
                            })
                            this.getTableData()
                            this.totalPage = res.data.count
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
