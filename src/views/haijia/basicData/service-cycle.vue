<template>
  <div>
    <el-row>
      <el-col :span="12">
        <el-button type="primary" @click="onAddData">新增</el-button>
      </el-col>
      <el-col :span="12" align="right">
        <el-form :inline="true" :model="formInline" @submit.native.prevent>
          <el-form-item>
            <el-input v-model="formInline.name" placeholder="请输入名称" clearable @keyup.enter.native="onQuery"/>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onQuery">查询</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
    <el-table :data="tableData" border size="small">
      <el-table-column prop="name" label="名称"/>
      <el-table-column prop="months" label="月数"/>
      <el-table-column prop="remarks" label="描述"/>
      <el-table-column prop="roleOperation" label="操作" align="center" width="100" fixed="right">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="onEditData(scope.row)">编辑</el-button>
          <el-button type="text" size="small" @click="onDeleteData()">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <service-cycle-log :show-dlog="showDlog" :dialog-title="dialogTitle"
                       @onServiceCycleLog="getData"/>
  </div>
</template>

<script>
    import serviceCycleLog from './components/service-cycle-dialog'

    export default {
        name: 'contacts',
        components: {
            serviceCycleLog
        },
        data() {
            return {
                tableData: [{name: '销售合同', remarks: '销售合同备注说明'}],
                dialogTitle: '',
                showDlog: false,
                formInline: {
                    name: ''
                }
            }
        },
        methods: {
            getData(...val) {
                let [log] = [...val];
                this.showDlog = log
            },
            //查询
            onQuery() {
            },
            //新增
            onAddData() {
                this.dialogTitle = '新增'
                this.showDlog = true
            },
            //编辑
            onEditData(row) {
                this.dialogTitle = '编辑'
                this.showDlog = true
            },
            //删除
            onDeleteData(row) {
                this.$confirm('确定删除?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    // this.loading = false
                    // this.getTreeData()
                    this.$message({
                        type: 'success',
                        message: '删除成功!'
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
