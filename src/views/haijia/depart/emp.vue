<template>
  <div>
    <div class="margin-bottom-18">
      <el-row>
        <el-col :span="12">
          <el-button v-model="dialogTitle" type="primary" @click="onAddData">{{ title.addTxt }}</el-button>
          <!--<el-button v-model="dialogTitle" type="primary" @click="onDeleteData">{{ title.deleteTxt }}</el-button>-->
        </el-col>
        <el-col :span="12" align="right">
          <el-form :inline="true" :model="formInline" class="demo-form-inline" @submit.native.prevent>
            <el-form-item>
              <el-input
                v-model="formInline.name"
                placeholder="请输入员工姓名"
                clearable
                @keyup.enter.native="onQuery"
              />
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="onQuery">查询</el-button>
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
    </div>
    <el-table
      v-loading="loading"
      :data="tableData"
      border
      style="width: 100%"
    >
      <el-table-column
        prop="name"
        label="名称"
        min-width="150"
      />
      <el-table-column
        prop="code"
        label="编码"
        min-width="120"
      />
      <el-table-column
        prop="mobile"
        label="电话"
        min-width="120"
      />
      <el-table-column
        prop="gender"
        label="性别"
        min-width="120"
      />
      <el-table-column
        prop="birthday"
        label="出生日期"
        min-width="120"
      />
      <el-table-column
        prop="leaderName"
        label="直接上级"
        min-width="120"
      />
      <el-table-column
        prop="deptName"
        label="所属部门"
        min-width="120"
      />
      <el-table-column
        prop="postName"
        label="岗位"
        min-width="120"
      />
      <el-table-column
        align="center"
        label="操作"
        fixed="right"
        width="100"
      >
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="onEditData(scope.row.id)">编辑</el-button>
          <el-button type="text" size="small" @click="onDeleteData(scope.row.id)">{{ title.deleteTxt }}
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      align="end"
      :page-size="pageSize"
      :page-sizes="pagingNum"
      :current-page="pageIndex"
      layout="total, sizes, prev, pager, next, jumper"
      :total="totalPage"
      @size-change="sizeChangeHandle"
      @current-change="currentChangeHandle"
    />
    <!--新增编辑弹框-->
    <emp-log
      :show-dlog="showDlog"
      :dialog-title="dialogTitle"
      :log-id="logId"
      :table-data="tableData"
      @onEmpLog="getData"
    />
  </div>
</template>

<script>
    import empLog from './components/emp-dialog'
    import addAndDel from '../../mixin/addAndDel'
    import { empList, empDelete } from '@/api/haijia/depart'

    export default {
        name: 'Emp',
        components: {
            empLog
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
            // 获取数据
            getTableData() {
                empList({
                    pageSize: this.pageSize,
                    pageIndex: this.pageIndex,
                    name: this.formInline.name
                }).then(res => {
                    if (res.data.status === 200) {
                        this.tableData = res.data.res
                        this.totalPage = res.data.count
                        this.tableData.forEach(item => {
                            if (item.gender === 0) {
                                item.gender = '女'
                            } else if (item.gender === 1) {
                                item.gender = '男'
                            }
                        })
                    }
                })
            },
            // 搜索
            onQuery() {
                this.getTableData()
            },
            // 删除
            onDeleteData(id) {
                this.$confirm('确定删除?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    empDelete({ id: id }).then(res => {
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
