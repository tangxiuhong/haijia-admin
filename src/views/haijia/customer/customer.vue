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
                placeholder="请输入客户姓名"
                clearable
                @keyup.enter.native="onQuery"/>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="onQuery">查询</el-button>
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
    </div>
    <el-table
      :v-loading="loading"
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
        prop="typeName"
        label="客户分类"
        min-width="120">
      </el-table-column>
      <el-table-column
        prop="countryName"
        label="省"
        min-width="120">
      </el-table-column>
      <el-table-column
        prop="provinceName"
        label="市"
        min-width="120">
      </el-table-column>
      <el-table-column
        prop="cityName"
        label="区/县"
        min-width="120">
      </el-table-column>
      <el-table-column
        prop="address"
        label="地址"
        min-width="160">
      </el-table-column>
      <el-table-column
        label="联系人:电话"
        min-width="120">
        <template slot-scope="scope">
          <el-popover trigger="hover" placement="top">
            <p v-for="contacts in scope.row.customerContactList">{{contacts.name }}:{{ contacts.mobile }}</p>
            <div slot="reference" class="name-wrapper">
              <el-tag size="medium" v-if="scope.row.customerContactList.length>0">
                <span style="padding-right: 3px;">{{ scope.row.customerContactList[0].name }}:</span>
                {{scope.row.customerContactList[0].mobile}}
              </el-tag>
            </div>
          </el-popover>
        </template>
      </el-table-column>
      <el-table-column
        label="操作"
        align="center"
        width="100"
        fixed="right">
        <template slot-scope="scope">
          <el-button @click="onEditData(scope.row.id)" type="text" size="small">编辑</el-button>
          <el-button @click="onDeleteData(scope.row.id)" type="text" size="small">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="margin-top-10 s1-right">
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
    </div>
    <!--新增编辑弹框-->
    <customer-dlog
      :show-dlog="showDlog"
      :dialog-title="dialogTitle"
      @onMachineDlog="getData"
      :log-id="logId"
    />
  </div>
</template>

<script>
    import customerDlog from './components/customer-dlog';
    //  axios
    import {moduleAxios} from '@/api/haijia/customer.js'
    //引入混入对象
    import addAndDel from '@/views/mixin/addAndDel.js'
    import { customerDelete, customerList } from '../../../api/haijia/customer'

    export default {
        name: "depart",
        mixins: [addAndDel],
        components: {
            customerDlog
        },
        data() {
            return {
                tableData: [
                    {
                        id: null,
                        name: "",
                        code: null,
                        typeName: "",
                        provinceName: "",
                        cityName: "",
                        address: "",
                        customerContactList: [
                            {name: '', mobile: ''}
                        ]
                    }
                ],
                formInline: {
                    name: ''
                }
            }
        },
        created() {
            this.getTableData()
        },
        methods: {
            //  初始化数据
            getTableData() {
                customerList({
                    name: this.queryName,
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
                this.queryName = this.formInline.name
                this.getTableData()
            },
            //删除
            onDeleteData(id) {
                this.$confirm('确定删除?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                   customerDelete({id: id}).then(res => {
                        if (res.data.status == 200) {
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
  .contacts {
    color: #999;
    font-size: 12px;
  }
</style>
