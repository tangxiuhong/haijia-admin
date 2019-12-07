<template>
 <div>
   <el-row>
     <el-col :span="12">
       <el-button type="primary" @click="onAddData">新增</el-button>
     </el-col>
     <el-col :span="12" align="right">
      <el-form :inline="true" :model="formInline" @submit.native.prevent>
        <el-form-item>
          <el-input v-model="formInline.name" placeholder="请输入故障名称"  clearable @keyup.enter.native="onQuery"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onQuery">查询</el-button>
        </el-form-item>
      </el-form>
     </el-col>
   </el-row>
   <el-table :data="tableData" border size="small">
     <el-table-column label="故障名称" prop="name"></el-table-column>
     <el-table-column label="故障大类" prop="typeName"></el-table-column>
     <el-table-column label="维修难度" prop="degreeName"></el-table-column>
     <el-table-column label="预估工时/小时" prop="estimateTime"></el-table-column>
     <el-table-column label="描述" prop="remark"></el-table-column>
     <el-table-column label="操作" align="center"  width="100" fixed="right">
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
     <fault-type-dlog  :show-dlog="showDlog" :dialog-title="dialogTitle" :log-id="logId" @onFaultTypeLog="getData"></fault-type-dlog>
 </div>
</template>

<script>
  import faultTypeDlog from './components/fault-type-dialog'
  import addAndDel from '@/views/mixin/addAndDel.js'
  import { moduleAxios } from '@/api/haijia/machine'
  import { faultDelete, faultList } from '../../../api/haijia/machine'
  export default {
    name: 'fault-type',
    components: {
     faultTypeDlog
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
        faultList({
          pageSize:this.pageSize,
          pageIndex:this.pageIndex,
        }).then(res =>{
          if(res.data.status === 200)
          {
            this.tableData = res.data.res
            this.totalPage = res.data.count
          }
        })
      },
      //查询
      onQuery() {
        faultList({
          pageSize:this.pageSize,
          pageIndex:this.pageIndex,
          name: this.formInline.name}).then(res => {
          if (res.data.status === 200) {
            this.tableData = res.data.res
            this.totalPage = res.data.count
          }
        })
      },
      ///刪除
      onDeleteData: function(id) {
        this.$confirm('确定删除？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          faultDelete({ id: id }).then(res => {
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
            message: '已取消删除',
            type: 'info'
          })
        })
      }
    }
  }
</script>

<style scoped>

</style>
