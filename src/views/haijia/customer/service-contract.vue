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
        <el-table-column fixed="left" min-width="130" prop="code" label="合同编号">
          <!--              <template slot-scope="scope">-->
          <!--                <span class="name_span" @click="onEditData(scope.row.id)">{{scope.row.name}}</span>-->
          <!--              </template>-->
        </el-table-column>
        <el-table-column min-width="130" prop="name" label="客户"/>
        <el-table-column min-width="130" prop="machineName" label="设备机型"/>
        <el-table-column min-width="130" prop="num" label="数量"/>
        <el-table-column min-width="130" prop="state" align="center" label="销售合同号"/>
        <el-table-column min-width="130" prop="price" label="合同金额"/>
        <el-table-column min-width="130" prop="signTime" label="合同日期"/>
        <el-table-column min-width="130" prop="arrivalDate" label="到货日期"/>
        <el-table-column min-width="130" prop="installDate" label="安装日期"/>
        <el-table-column min-width="130" prop="createTime" label="服务等级"/>
        <el-table-column min-width="130" prop="createName" label="服务周期"/>
        <el-table-column min-width="130" prop="createTime1" label="维保金额"/>
        <el-table-column min-width="130" prop="createName1" label="保修开始日"/>
        <el-table-column min-width="130" prop="createName2" label="保修到期日"/>
        <el-table-column min-width="130" prop="name" align="center" label="操作" width="100" fixed="right">
          <template slot-scope="scope">
            <el-button type="text" @click="onEditData(scope.row.id)">编辑</el-button>
            <el-button type="text" @click="onDeleteData(scope.row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <service-contract-log :show-dlog="showDlog" :dialog-title="dialogTitle"
                            @onServiceContractLog="getData"/>
    </div>
  </left-menu>
</template>

<script>
    import leftMenu from '../../../components/haijia/leftMenu/index'
    import serviceContractLog from './components/service-contract-dialog';
    // let dictionaryName = ''
    export default {
        name: 'sales-contract',
        components: {
            serviceContractLog,
            leftMenu
        },
        data() {
            return {
                // getName: '',
                tableData: [{
                    code: 'FWHT00001',
                    name: '王毅',
                    machineName: '1#清花机',
                    num: 5,
                    state: 'XSHT00001',
                    price: '350',
                    signTime: '2019-10-01',
                    arrivalDate: '2019-10-08',
                    installDate: '2019-10-15',
                    createTime: '一等',
                    createName: '1年',
                    createTime1: '860',
                    createName1: '2019-10-01',
                    createName2: '2020-10-01'
                }],
                multipleSelection: [],
                disabled: true,
                showDlog: false,
                // deleteModalStatus: false,
                // deleteModalMsg: '',
                // deleteMsg: '',
                arr: [],
                title: {
                    addTxt: '新增',
                    editTxt: '编辑'
                },
                formInline: {
                    code: ''
                },
                dialogTitle: '',
                menuIndex: 0,
                menuTitle: [
                    {name: '待提交', num: 22},
                    {name: '待审核', num: 18},
                    {name: '已审核', num: 9},
                    {name: '已关闭', num: 2}
                ],
            }
        },
        methods: {

            //子组件传参
            getData(...val) {
                let [log] = [...val]
                this.showDlog = log
            },
            onQuery() {
            },
            //新增
            onAddData() {
                this.dialogTitle = this.title.addTxt
                this.showDlog = true
            },
            //编辑
            onEditData(id) {
                this.dialogTitle = this.title.editTxt
                this.showDlog = true
            },
            // 批量删除
            onDeleteBatchData() {
                this.$confirm('确定删除?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$message({
                        type: 'success',
                        message: '刪除成功！'
                    });
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
                    this.$message({
                        type: 'success',
                        message: '删除成功！'
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
