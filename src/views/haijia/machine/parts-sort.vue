<template>
<div>
  <el-row>
    <el-col :span="12">
      <el-button type="primary" @click="onAddData">新增</el-button>
    </el-col>
    <el-col :span="12" align="right">
      <el-form :inline="true" :model="formInline" @submit.native.prevent >
        <el-form-item>
          <el-input v-model="formInline.name" placeholder="请输入分类名称" clearable @keyup.enter.native="onQuery"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onQuery">查询</el-button>
        </el-form-item>
      </el-form>
    </el-col>
  </el-row>
  <el-table :data="tableData" border size="small">
    <el-table-column prop="name" label="名称"></el-table-column>
    <el-table-column prop="code" label="编码"></el-table-column>
    <el-table-column prop="typeName" label="上级分类"></el-table-column>
    <el-table-column prop="remark" label="描述" width="200"></el-table-column>
    <el-table-column prop="roleOperation" label="操作" align="center"   width="100" fixed="right">
      <template slot-scope="scope">
        <el-button  type="text" size="small" @click="onEditData(scope.row.id)">编辑</el-button>
        <el-button type="text" size="small" @click="onDeleteData(scope.row.id)">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
  <parts-sort-log :show-dlog="showDlog" :dialog-title="dialogTitle"  :log-id="logId"@onPartsSortLog="getData"></parts-sort-log>
</div>
</template>

<script>
import partsSortLog from './components/parts-sort-dialog'
import addAndDel from '@/views/mixin/addAndDel'
import { partsCategoryDelete, partsCategoryList } from '../../../api/haijia/machine'
export default {
  name: 'parts-sort',
  components: {
    partsSortLog
  },
  mixins:[addAndDel],
  data() {
    return {
      tableData: [],
      formInline:{
        name: ''
      }
    }
  },
  methods: {
   //获取数据
    getTableData() {
      partsCategoryList({}).then(res => {
        if (res.data.status === 200) {
          this.tableData = res.data.res
        }
      })
    },
    //查询
    onQuery() {
      partsCategoryList({
        name:this.formInline.name
      }).then(res => {
        if (res.data.status === 200) {
          this.tableData = res.data.res
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
        partsCategoryDelete({ id: id }).then(res => {
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
    }
  }
}
</script>

<style scoped>

</style>
