<template>
 <div>
   <el-row>
     <el-col :span="12">
       <el-button type="primary" @click="onAddData">新增</el-button>
     </el-col>
     <el-col :span="12" align="right">
       <el-form :inline="true" :model="formInline" @submit.native.prevent>
         <el-form-item>
           <el-input v-model="formInline.name" placeholder="请输入大类名称" clearable @keyup.enter.native="onQuery"></el-input>
         </el-form-item>
         <el-form-item>
           <el-button type="primary" @click="onQuery">查询</el-button>
         </el-form-item>
       </el-form>
     </el-col>
   </el-row>
   <el-table :data="tableData" border  size="small" >
     <el-table-column label="大类名称" prop="typeName"></el-table-column>
     <el-table-column label="描述" prop="remark"></el-table-column>
     <el-table-column label="操作" align="center" width="100" fixed="right">
       <template slot-scope="scope">
         <el-button type="text" size="small" @click="onEditData(scope.row)">编辑</el-button>
         <el-button type="text" size="small" @click="onDeleteData()">删除</el-button>
       </template>
     </el-table-column>
   </el-table>
   <failt-log :show-dlog="showDlog" :dialog-title="dialogTitle" @onFailLog="getData"></failt-log>
 </div>
</template>

<script>
  import failtLog from './components/fault-dialog';
  export default {
    name: 'fault',
    components: {
      failtLog
    },
    data() {
      return {
        tableData: [{typeName: '通讯故障',remark: '由通讯产生的故障' }],
        showDlog: false,
        dialogTitle: '',
        formInline:{
          name: ''
        }
      }
    },
    methods: {
      //查询
      onQuery(){},
      getData(...val){
        let[log] = [...val]
        this.showDlog = log
      },
      onAddData: function() {
        this.dialogTitle = '新增'
        this.showDlog = true
      },
      onEditData(){
        this.dialogTitle = '编辑'
        this.showDlog = true
      },
      onDeleteData() {
        this.$confirm('确定删除？','提示',{
        confirmButtonText: '确定',
        cancelButtonText: '取消'
        }).then(() => {
          this.$message({
            message: '删除成功',
            type: 'success'
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
