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
                            <el-input v-model="formInline.name" clearable  placeholder="请输入设备名称" v-on:keyup.enter.native="onQuery"/>
                        </el-form-item>
                        <el-form-item>
                            <el-button type="primary" @click="onQuery">查询</el-button>
                        </el-form-item>
                    </el-form>
                </el-col>
            </el-row>
        </div>
        <el-table
                :data="tableData"
                border
                style="width: 100%">
            <el-table-column
                    prop="name"
                    label="名称"
                    min-width="150">
            </el-table-column>
            <el-table-column
                    prop="code"
                    label="编码"
                    min-width="120">
            </el-table-column>
            <el-table-column
                    prop="machineModelName"
                    label="设备机型"
                    min-width="120">
            </el-table-column>
            <el-table-column
                    prop="manufacturer"
                    label="生产厂商"
                    min-width="120">
            </el-table-column>
            <el-table-column
                    prop="prodTime"
                    label="出厂日期"
                    min-width="120">
            </el-table-column>
            <el-table-column
                    prop="state"
                    label="状态"
                    min-width="120">
                <template slot-scope="scope">
                    <span class="stateTrue" v-if="scope.row.state==1" type="primary" size="mini">启用</span>
                    <span class="stateFalse" v-if="scope.row.state==0" type="info" size="mini">停用</span>
                </template>
            </el-table-column>
            <el-table-column
                    align="center"
                    label="操作"
                    width="100"
                    fixed="right">
                <template slot-scope="scope">
                    <el-button @click="onEditData(scope.row)" type="text" size="small">编辑</el-button>
                    <el-button @click="onDeleteData(scope.row)" type="text" size="small">{{ title.deleteTxt }}</el-button>
                </template>
            </el-table-column>
        </el-table>
        <div class="margin-top-10 s1-right">
            <el-pagination
                    @size-change="sizeChangeHandle"
                    @current-change="currentChangeHandle"
                    :current-page=" pageIndex"
                    :page-sizes="pagingNum"
                    :page-size="pageSize"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="totalPage"
            >
            </el-pagination>
        </div>
        <!--新增编辑弹框-->
        <machine-dlog :show-dlog="showDlog" :dialog-title="dialogTitle" :log-id="logId" @onMachineDlog="getData"></machine-dlog>
    </div>
</template>

<script>
  import machineDlog from './components/machine-dlog';
  import addAndDel from '@/views/mixin/addAndDel'
  import { machineDelete, machineList } from '../../../api/haijia/machine'
  export default {
    name: "machine",
    components: {
      machineDlog
    },
    mixins: [addAndDel],
    data() {
      return {
        tableData: [],
        title: {
          addTxt: '新增',
          deleteTxt: '删除',
          editTxt:'编辑'
        },
        dialogTitle: '',
        formInline: {
          name: ''
        },
        showDlog: false,
        logId:null,
        pageIndex: 1,
        pageSize: 20,
        pagingNum: [20,50,100],
        totalPage: 0
      }
    },

    mounted() {
      this.getTableData();
    },
    methods: {
      //获取数据
      getTableData(){
        this.loading = true;
        machineList({
          pageIndex: this.pageIndex,
          pageSize: this.pageSize,
        }).then(res => {
          if(res.data.status === 200){
            this.tableData = res.data.res,
              this.totalPage = res.data.count,
              this.loading = false
          }
        })
      },
      //每页数
      sizeChangeHandle(val) {
        this.pageSize = val
        this.pageIndex = 1
        this.getTableData()
      },
      //当前页数
      currentChangeHandle(val) {
        this.pageIndex = val
        this.getTableData()
      },
      //获取数据
      getData(...val){
        let [showLog,getData]=[...val]
        this[showLog]=false;
        if(getData) {
          this.getTableData()
        }
      },
      //搜索
      onQuery() {
        machineList({
          pageIndex: this.pageIndex,
          pageSize: this.pageSize,
          name: this.formInline.name
        }).then(res => {
          if(res.data.status === 200){
            this.tableData = res.data.res,
              this.totalPage = res.data.count
          }
        })
      },
      //新增
      onAddData() {
        this.logId=null
        this.dialogTitle = this.title.addTxt
        this.showDlog = true
      },
      //编辑
      onEditData(row) {
        this.logId=row.id
        this.dialogTitle = this.title.editTxt
        this.showDlog = true
      },
      //删除
      onDeleteData(row) {
        this.$confirm('确定删除?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
        machineDelete({id: row.id}).then(res => {
            if (res.data.status == 200) {
              this.getTableData()
              this.$message({
                type: 'success',
                message: '删除成功!'
              })
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
