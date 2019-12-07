<template>

  <left-menu @on-menu="onMenu" :menu-title="menuTitle" :menu-index="menuIndex" :number="'num'">
    <div slot="right_menu">
      <el-row>
        <el-col :span="12" class="but_tab_space" solt-scope="scope">
          <el-button type="primary" @click="onAddData">{{title.addTxt}}</el-button>
          <el-button type="danger" :disabled="this.multipleSelection.length ===0" @click="onDeleteBatchData">删除
          </el-button>
        </el-col>
        <el-col :span="12" align="right">
          <el-form :inline="true" :model="formInline" @submit.native.prevent>
            <el-form-item>
              <el-input v-model="formInline.code" placeholder="请输入合同编号" clearable
                        @keyup.enter.native="onQuery"/>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="onQuery">查询</el-button>
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
      <el-table
        :data="tableData"
        border
        class="butTabSpace"
        @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="55"/>
        <el-table-column fixed="left" width="100" prop="code" label="合同编号">
          <!--              <template slot-scope="scope">-->
          <!--                <span class="name_span" @click="onEditData(scope.row.id)">{{scope.row.name}}</span>-->
          <!--              </template>-->
        </el-table-column>
        <el-table-column  min-width="130" prop="name" label="客户"/>
        <el-table-column min-width="130" prop="machineName" label="设备机型"/>
        <el-table-column min-width="130" prop="num" label="数量"/>
        <el-table-column min-width="130" prop="state" align="center" label="合同状态"/>
        <el-table-column min-width="130" prop="signTime" label="合同日期"/>
        <el-table-column min-width="130" prop="arrivalDate" label="到货日期"/>
        <el-table-column min-width="130" prop="installDate" label="安装日期"/>
        <el-table-column min-width="130" prop="createTime" label="创建时间"/>
        <el-table-column min-width="130" prop="createName" label="创建人"/>
        <el-table-column prop="name" align="center" label="操作" width="100" fixed="right">
          <template slot-scope="scope">
            <el-button type="text" @click="onEditData(scope.row.id)">编辑</el-button>
            <el-button type="text" @click="onDeleteData(scope.row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
        <el-pagination
                background=""
                :current-page=" pageIndex"
                :page-sizes="pagingNum"
                :page-size="pageSize"
                layout="total, sizes, prev, pager, next, jumper"
                :total="totalPage"
                @current-change="currentChangeHandle"
                @size-change="sizeChangeHandle"
        >
        </el-pagination>
      <sales-contract-log :show-dlog="showDlog" :dialog-title="dialogTitle"
                         :log-id="logId" @onSalesContractLog="getData"/>
    </div>
  </left-menu>

</template>

<script>
    import leftMenu from '../../../components/haijia/leftMenu/index'
    import salesContractLog from './components/sales-contract-dialog';
    import { salesContractDelete, salesContractDeleteBatch, salesContractList } from '../../../api/haijia/customer'
    import addAndDel from '@/views/mixin/addAndDel'
    // let dictionaryName = ''
    export default {
        name: 'sales-contract',
        components: {
            salesContractLog,
            leftMenu
        },
      mixins: [addAndDel],
        data() {
            return {
                // getName: '',
                tableData: [],
                multipleSelection: [],
                disabled: true,
                // showDlog: false,
                // deleteModalStatus: false,
                // deleteModalMsg: '',
                // deleteMsg: '',
              arrDelete: [],
                // title: {
                //     addTxt: '新增',
                //     editTxt: '编辑'
                // },
                formInline: {
                    code: ''
                },
                // dialogTitle: '',
                menuIndex: 0,
                menuTitle: [
                    {name: '待提交', num: 12},
                    {name: '待审核', num: 2},
                    {name: '已审核', num: 5},
                    {name: '已关闭', num: 0}
                ],
            }
        },
        methods: {
          //初始数据
          //  初始化数据
          getTableData() {
            salesContractList({
              code: this.queryCode,
              pageIndex: this.pageIndex,
              pageSize: this.pageSize
            }).then(res => {
              if (res.data.status == 200) {
                this.tableData = res.data.res
                this.totalPage = res.data.count
              }
            })
          },
          //搜索
          onQuery() {
            this.queryCode = this.formInline.code
            this.getTableData()
          },
            //
            // //子组件传参
            // getData(...val) {
            //     let [log] = [...val]
            //     this.showDlog = log
            // },

            // //新增
            // onAddData() {
            //     this.dialogTitle = this.title.addTxt
            //     this.showDlog = true
            // },
            // //编辑
            // onEditData(id) {
            //     this.dialogTitle = this.title.editTxt
            //     this.showDlog = true
            // },
            // 批量删除
            onDeleteBatchData() {
                this.$confirm('确定删除?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                  salesContractDeleteBatch(this.arrDelete).then(res => {
                    if (res.data.status === 200) {
                      this.getTableData()
                      this.$message({
                        type: 'success',
                        message: '刪除成功！'
                      })
                    }
                  })
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
            },
            //单个删除
            onDeleteData: function (id) {
                this.$confirm('确定删除？', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonClass: '取消',
                    type: 'warning'
                }).then(() => {
                  salesContractDelete( {id: id}).then(res => {
                    if (res.data.status == 200) {
                      this.getTableData()
                      this.$message({
                        type: 'success',
                        message: '删除成功！'
                      })
                    }
                  })
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    })
                })
            },
            //选择事件
            handleSelectionChange(val) {
                this.multipleSelection = val
                let arr = []
                for (let i = 0; i < val.length; i++) {
                    // console.log(val[i].id)
                    arr.push(val[i].id)
                }
                this.arr = arr
                // console.log(this.multipleSelection)
                this.disabled = true
            },
            onMenu(item, index) {
                this.menuIndex = index;
            }
        }
    }
</script>
<style scoped>
  .atTitle {
    line-height: 2.5em;
    font-weight: 600;
  }

  .but_tab_space {
    margin-bottom: 15px
  }

  .name_span {
    color: #2d8cf0

  }
</style>
