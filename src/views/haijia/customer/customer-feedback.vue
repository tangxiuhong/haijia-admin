<template>
  <left-menu @on-menu="onMenu" :menu-title="menuTitle" :menu-index="menuIndex">
    <div slot="right_menu">
      <el-row>
        <el-col :span="24" align="right">
          <el-form :inline="true" :model="formInline" @submit.native.prevent>
            <el-form-item>
              <el-input v-model="formInline.code" placeholder="请输入客户名称" clearable
                        @keyup.enter.native="onQuery"></el-input>
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
      >
        <el-table-column fixed min-width="300" prop="code" label="问题描述">
          <!--              <template slot-scope="scope">-->
          <!--                <span class="name_span" @click="onEditData(scope.row.id)">{{scope.row.name}}</span>-->
          <!--              </template>-->
        </el-table-column>
        <el-table-column min-width="130" prop="name" label="客户名称"/>
        <el-table-column min-width="130" prop="machineName" label="联系电话"/>
        <el-table-column min-width="300" prop="num" label="所属公司"/>
        <el-table-column min-width="130" prop="state" label="创建时间"/>
        <el-table-column min-width="130" prop="price" label="问题来源"/>
        <el-table-column min-width="130" prop="signTime" align="center" label="状态"/>
        <el-table-column min-width="130" prop="arrivalDate" label="处理人"/>
        <el-table-column min-width="130" prop="installDate" label="处理时间"/>
        <el-table-column min-width="300" prop="createTime" label="处理意见"/>
        <el-table-column prop="name" align="center" label="操作" width="100" fixed="right">
          <template slot-scope="scope">
            <el-button type="text" @click="onShowData(scope.row.id)">查看</el-button>
            <el-button type="text" @click="onHandleData(scope.row.id)">处理</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!--      查看-->
      <feedback-show-log :show-dlog="showDlog" :dialog-title="dialogTitle"
                         @onFeedbackShowLog="getData"/>
      <!--    处理-->
      <feedback-handle-log :handle-dlog="handleDlog" :dialog-title="dialogTitle"
                           @onfeedbackHandleLog="getData"/>
    </div>
  </left-menu>
  <!--    <div>哈哈哈</div>-->
</template>

<script>
    import leftMenu from '../../../components/haijia/leftMenu/index'
    import feedbackShowLog from './components/feedback-show-dialog';
    import feedbackHandleLog from './components/feedback-handle-dialog'
    // let dictionaryName = ''
    export default {
        name: 'customer-feedback',
        components: {
            feedbackShowLog,
            feedbackHandleLog,
            leftMenu
        },
        data() {
            return {
                // getName: '',
                tableData: [{
                    code: '1#清花机故障',
                    name: '王毅',
                    machineName: '12302563458',
                    num: '上海市名优纺织股份有限公司',
                    state: '2019-10-01',
                    price: '微信小程序',
                    signTime: '未处理',
                    arrivalDate: '胡宇',
                    installDate: '2019-10-15',
                    createTime: '与2019-10-15安排工程师现场检修'
                }],
                disabled: true,
                showDlog: false,
                handleDlog: false,
                title: {
                    handleText: '处理问题',
                    showTxt: '查看问题'
                },
                formInline: {
                    code: ''
                },
                dialogTitle: '',
                menuIndex: 0,
                num: '',
                menuTitle: [
                    {name: '待处理', num: 12},
                    {name: '已处理', num: 22}
                ],
            }
        },
        methods: {
            getTableData() {
            },
            //子组件传参
            getData(...val) {
                let [showLog, getData] = [...val]
                this[showLog] = false;
                if (getData) {
                    this.getTableData()
                }
            },
            onQuery() {
            },
            //处理问题表单
            onHandleData() {
                this.dialogTitle = this.title.handleText
                this.handleDlog = true
            },
            //查看问题表单
            onShowData(id) {
                this.dialogTitle = this.title.showTxt
                this.showDlog = true
            },
            onMenu(item, index) {
                console.log(item, index)
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
