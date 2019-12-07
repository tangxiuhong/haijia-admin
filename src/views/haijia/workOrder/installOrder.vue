<template>
  <div>
    <left-menu
      @on-menu="onMenu"
      :menu-title="menuTitle"
      :menu-index="menuIndex"
      :number="'num'"
      :title="'name'"
    >
      <div slot="right_menu">
        <el-row>
          <el-col :span="12">
            <!--<el-button v-model="dialogTitle" type="primary" @click="onAddData">{{ title.addTxt }}</el-button>-->
            <el-button v-model="dialogTitle" type="primary">刷新</el-button>
            <!--<el-button v-model="dialogTitle" type="primary" @click="onDeleteData">{{ title.deleteTxt }}</el-button>-->
          </el-col>
          <el-col :span="12" align="right">
            <el-form :inline="true" :model="formInline" class="demo-form-inline">
              <el-form-item>
                <el-input v-model="formInline.name" placeholder="请输入用户姓名"
                          v-on:keyup.enter.native="onQuery"/>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="onQuery">查询</el-button>
              </el-form-item>
            </el-form>
          </el-col>
        </el-row>
        <el-table
          :v-loading="loading"
          :data="tableData"
          border
          style="width: 100%">
          <el-table-column
            fixed="left"
            prop="code"
            label="工单编号"
            min-width="150">
          </el-table-column>
          <el-table-column
            prop="customerName"
            label="客户名称"
            min-width="120">
          </el-table-column>
          <el-table-column
            prop="address"
            label="客户地址"
            min-width="150">
          </el-table-column>
          <el-table-column
            prop="contactName"
            label="客户联系人"
            min-width="120">
          </el-table-column>
          <el-table-column
            prop="contractId"
            label="销售合同"
            min-width="120">
          </el-table-column>
          <el-table-column
            prop="machineModelName"
            label="设备机型"
            min-width="120">
          </el-table-column>
          <el-table-column
            prop="num"
            label="安装数量"
            min-width="120">
          </el-table-column>
          <el-table-column
            prop="requestStartTime"
            label="要求开始日期"
            min-width="120">
          </el-table-column>
          <el-table-column
            fixed="right"
            label="操作"
            align="center"
            width="150">
            <template slot-scope="scope">
              <!--派工-->
              <el-button v-show="dispatchedBut" @click="onDispatchedData(scope.row)" type="text"
                         size="small" v-model="dialogTitle">{{title.dispatchedTxt}}
              </el-button>
              <!--查看-->
              <el-button v-show="showBut" @click="onShowData(scope.row)" type="text" size="small"
                         v-model="dialogTitle">{{title.showTxt}}
              </el-button>
              <!--取消-->
              <el-button v-show="cancelBut" @click="onCancelData(scope.row)" type="text" size="small"
                         v-model="dialogTitle">{{title.cancelTxt}}
              </el-button>
              <!--报工-->
              <el-button v-show="reportWorkBut" @click="onReportData(scope.row)" type="text" size="small"
                         v-model="dialogTitle">{{title.reportWorkTxt}}
              </el-button>
              <!--审核-->
              <el-button v-show="examineBut" @click="onExamineData(scope.row)" type="text" size="small"
                         v-model="dialogTitle">{{title.examineTxt}}
              </el-button>

            </template>
          </el-table-column>
        </el-table>
        <!--审核-->
        <examine-dlog
          :examine-dlog="examineDlog"
          :dialog-title="dialogTitle"
          @onExamineDlog="getData"
          :log-id="logId"
        ></examine-dlog>
        <!--派工弹框-->
        <dispatched-dlog
          :dispatched-dlog="dispatchedDlog"
          :dialog-title="dialogTitle"
          @onDispatchedDlog="getData"
          :log-id="logId"
        ></dispatched-dlog>
        <!--报工弹框-->
        <report-work-dlog
          :report-work-dlog="reportWorkDlog"
          :dialog-title="dialogTitle"
          @onReportWorkDlog="getData"
          :log-id="logId"
        ></report-work-dlog>
        <!--评价-->

        <!--查看弹框-->
        <see-dlog
          :show-progress="showProgress"
          :orderShowDlog="orderShowDlog"
          :dialog-title="dialogTitle"
          @onOrderShowDlog="getData"
          :log-id="logId"
        ></see-dlog>
      </div>
    </left-menu>
  </div>

</template>

<script>
    // 引入封装的leftMenu
    import leftMenu from '@/components/haijia/leftMenu/index'
    import dispatchedDlog from './components/installDispatched-dlog';
    import reportWorkDlog from './components/installReport-dlog';
    import seeDlog from './components/installShow-dlog';
    import examineDlog from './components/installExamine-dlog';
    //引入混入对象
    import addAndDel from '@/views/mixin/addAndDel.js'

    export default {
        name: "depart",
        components: {
            dispatchedDlog,
            reportWorkDlog,
            seeDlog,
            examineDlog,
            leftMenu
        },
        mixins: [addAndDel],
        data() {
            return {
                menuTitle: [
                    {name: "待审核", id: 0, num: 15},
                    {name: "待派工", id: 1, num: 5},
                    {name: "待服务", id: 2, num: 1},
                    {name: "待报工", id: 3, num: 0},
                    {name: "待评价", id: 4, num: 15},
                    {name: "已关闭", id: 5, num: 5},
                    {name: "已取消", id: 6, num: 1},
                ],
                dispatchedBut: false,
                reportWorkBut: false,
                examineBut: false,
                showBut: false,
                cancelBut: true,
                menuIndex: 0,
                loading: false,
                tableData: [
                    {
                        code: 'A100054632456',
                        customerName: "王雨虹",
                        address: "上海市浦东新区御桥",
                        contactName: "牟时金",
                        contractId: "1024355465522",
                        machineModelName: "A1-004",
                        requestStartTime: "2019-07-11",
                        num: 24
                    },
                    {
                        code: 'A100054632456',
                        customerName: "黄祥",
                        address: "上海市浦东新区御桥",
                        contactName: "梅梅",
                        contractId: "1024355465522",
                        machineModelName: "A1-004",
                        requestStartTime: "2019-07-11",
                        num: 20
                    }
                ],
                // title: {
                //   addTxt: '新增',
                //   deleteTxt: '删除',
                //   editTxt: '编辑',
                //   dispatchedTxt: '派工',
                //   reportWorkTxt: '报工',
                //   showTxt: '查看',
                //   cancelTxt: '取消',
                //   examineTxt: '审核'
                // },
                // dialogTitle: '',
                formInline: {
                    name: ''
                },
                dispatchedDlog: false,
                reportWorkDlog: false,
                orderShowDlog: false,
                examineDlog: false,
                logId: null,
                showProgress: false,
            }
        },
        methods: {
            getTableData() {

            },
            //子组件传参
            getData(...val) {
                let [showLog, getData] = [...val];
                //showLog为$emit()传过来的父组件里注册子组件时v-bind绑定的值控制子组件是否显示
                this[showLog] = false;
                //getData为$emit()传过来的true和false，因关闭和取消按钮不需要调用getTableData方法更新数据
                if (getData) {
                    this.getTableData()
                }
            },
            onMenu(item, index) {
                this.menuIndex = index;
                this.showProgress = false
                // 派工
                this.dispatchedBut = false,
                    // 报工
                    this.reportWorkBut = false,
                    //  查看
                    this.showBut = false,
                    //  取消
                    this.cancelBut = false,
                    //  审核
                    this.examineBut = false,
                    this.reportWorkBut = false;
                if (item.name == "待审核") {
                    this.cancelBut = true;
                    this.examineBut = true;
                } else if (item.name == "待派工") {
                    this.dispatchedBut = true,
                        this.showProgress = true
                    this.showBut = true;
                } else if (item.name == "待服务") {
                    this.showProgress = true
                    this.cancelBut = true;
                    this.dispatchedBut = true;
                    this.showBut = true;
                } else if (item.name == "待报工") {
                    this.showProgress = true
                    this.showBut = true;
                    this.reportWorkBut = true;
                    this.showBut = true;
                } else if (item.name == "待评价") {
                    this.cancelBut = true;
                    this.showBut = true;
                    this.showBut = true;
                } else if (item.name == "已关闭") {
                    this.cancelBut = true;
                    this.showBut = true;
                } else if (item.name == "已取消") {
                    this.showBut = true;
                }
            },
            //搜索
            onQuery() {
                // alert("搜索")
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
            },
            //派工
            onDispatchedData() {
                this.dialogTitle = this.title.dispatchedTxt
                this.dispatchedDlog = true
                this.logId = null
            },
            //查看
            onShowData() {
                this.dialogTitle = this.title.showTxt
                this.orderShowDlog = true
                this.logId = null
            },
            //报工
            onReportData() {
                this.dialogTitle = this.title.reportWorkTxt
                this.reportWorkDlog = true
                this.logId = null
            },
            //取消
            onCancelData() {
                this.$message({
                    type: 'success',
                    message: '已取消！'
                })
            },
            //审核
            onExamineData() {
                this.dialogTitle = this.title.examineTxt
                this.examineDlog = true
                this.logId = null
            }
        }
    }
</script>

<style scoped>

</style>
