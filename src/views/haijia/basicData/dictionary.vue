<template>
  <div class="flex_menu">
    <left-menu
      :menu-title="menuTitle"
      :menu-index="menuIndex"
      :number="'num'"
      :title="'name'"
      @on-menu="onMenu"
    >
      <div slot="right_menu">
        <el-row>
          <el-col :span="24" class="but_tab_space" solt-scope="scope">
            <el-button type="primary" @click="onAddData">{{ title.addTxt }}</el-button>
            <el-button type="danger" :disabled="this.multipleSelection.length ===0" @click="onDeleteBatchData">删除
            </el-button>
          </el-col>
          <el-col :span="24">
            <el-table
              :data="dictionaryData"
              border
              class="butTabSpace"
              @selection-change="handleSelectionChange"
            >
              <el-table-column type="selection" width="55"/>
              <el-table-column prop="name" label="名称">
                <!--              <template slot-scope="scope">-->
                <!--                <span class="name_span" @click="onEditData(scope.row.id)">{{scope.row.name}}</span>-->
                <!--              </template>-->
              </el-table-column>
              <el-table-column prop="code" label="编码"/>
              <el-table-column prop="sortNum" align="center" label="排序"/>
              <el-table-column prop="remark" label="备注"/>
              <el-table-column prop="name" align="center" label="操作" :min-width="100">
                <template slot-scope="scope">
                  <el-button type="text" @click="onEditData(scope.row.id)">编辑</el-button>
                  <el-button type="text" @click="onDeleteData(scope.row.id)">删除</el-button>
                </template>
              </el-table-column>
            </el-table>
          </el-col>
        </el-row>
        <dictionary-log :show-dlog="showDlog" :dialog-title="dialogTitle" :dictionary-name="dictionaryName"
                        :log-id="logId" @onDictionaryLog="getData"/>
      </div>
    </left-menu>
  </div>
</template>

<script>
    import dictionaryLog from './components/dictionary-dialog.vue'
    // 引入封装的leftMenu
    import leftMenu from '@/components/haijia/leftMenu/index'
    //ajax
    import { dictCategories, dictDelete, dictDeleteBatch, dictList } from '../../../api/haijia/basicData'

    export default {
        name: 'Dictionary',
        components: {
            dictionaryLog,leftMenu
        },
        data() {
            return {
                getName: '',
                dictionaryData: [],
                multipleSelection: [],
                disabled: true,
                showDlog: false,
                deleteModalStatus: false,
                deleteModalMsg: '',
                deleteMsg: '',
                arrDelete: [],
                title: {
                    addTxt: '新增',
                    editTxt: '编辑'
                },
                dialogTitle: '',
                menuIndex: 0,
                menuTitle: [],
                codeList: [],
                category: '',
                logId: null,
                dictionaryName: {}
            }
        },
        mounted() {
            this.getTableData()
        },
        methods: {
            // 初始数据
            getTableData() {
              dictCategories().then(res => {
                    if (res.data.status == 200) {
                        this.menuTitle = res.data.res
                        this.getName = this.menuTitle[this.menuIndex].name
                        this.dictionaryName = this.menuTitle[this.menuIndex]
                        this.getList()
                    }
                })
            },
            getList() {
                dictList({category: this.menuTitle[this.menuIndex].code}).then(res => {
                    if (res.data.status == 200) {
                        this.dictionaryData = res.data.res
                    }
                })
            },
            // 子组件传参
            getData(...val) {
                const [showLog, getData] = [...val]
                // showLog为$emit()传过来的父组件里注册子组件时v-bind绑定的值控制子组件是否显示
                this[showLog] = false
                // getData为$emit()传过来的true和false，因关闭和取消按钮不需要调用getTableData方法更新数据
                if (getData) {
                    this.getList()
                }
            },
            // 新增
            onAddData() {
                this.dialogTitle = this.title.addTxt
                this.showDlog = true
                this.logId = null
            },
            // 编辑
            onEditData(id) {
                this.dialogTitle = this.title.editTxt
                this.logId = id
                this.showDlog = true
            },
            // 批量删除
            onDeleteBatchData() {
                this.$confirm('确定删除?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                  dictDeleteBatch(this.arrDelete).then(res => {
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
                    })
                })
            },
            // 单个删除
            onDeleteData(id) {
                this.$confirm('确定删除？', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonClass: '取消',
                    type: 'warning'
                }).then(() => {
                  dictDelete( {id: id}).then(res => {
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
            // 选择事件
            handleSelectionChange(val) {
                this.multipleSelection = val
                const arr = []
                for (let i = 0; i < val.length; i++) {
                    arr.push(val[i].id)
                }
                this.arrDelete = arr
                this.disabled = true
            },
          onMenu: function(item, index) {
            this.dictionaryName = item
            this.getName = item.name
            this.menuIndex = index
            dictList({ category: item.code }).then(res => {
              if (res.data.status == 200) {
                this.dictionaryData = res.data.res
              }
            })
          }
        }
    }
</script>
<style scoped>
  .flex_menu {
    width: 100%;
    overflow: hidden;
  }

  .left_menu {
    max-width: 180px;
    min-width: 180px;
    float: left;
    /*border-right: 1px solid #eee;*/
    text-align: center;
  }

  .in_left_menu {

  }

  .right_menu {
    float: right;
    width: calc(100% - 200px);
  }

  .in_left_menu > div {
    cursor: pointer;
    padding: 5px 0px;
    line-height: 2em;
    border: 1px solid #eee;
    border-bottom: 0px;
    color: #999;
    background: #fafafb;
  }

  .in_left_menu > div:last-child {
    border-bottom: 1px solid #eee;
  }

  .checkedStyle {

    border-right: 0px !important;
    color: #000 !important;
    background: #fff !important;
  }

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
