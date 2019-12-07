<template>
  <el-dialog
    :title="dialogTitle"
    :visible.sync="showModal"
    :before-close="onClose"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
  >
    <el-form
      ref="dataForm"
      :model="dataForm"
      :rules="rules"
      label-width="100px"
      class="form-width-95"
      :show-message="true"
    >
      <el-row>
        <el-col :span="12">
          <el-form-item v-if="lastModel" label="上级模块">
            <div>{{ childPName }}</div>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="新增模块" prop="name">
            <el-input v-model="dataForm.name" placeholder="新增模块名称" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="编码" prop="code">
            <el-input
              v-model="dataForm.code"
              onkeyup="value=value.replace(/[\u4e00-\u9fa5]/ig,'')"
              placeholder="请输入数字"
            />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="状态" prop="state" class="select_block">
            <el-select v-model="dataForm.state" placeholder="请选择模块状态">
              <el-option label="启用" :value="1" />
              <el-option label="停用" :value="0" />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="图标样式" prop="iconUrl">
            <div class="iconBox">
              <span
                v-if="dataForm.iconUrl.indexOf('sh-icon')!==-1"
                v-model="dataForm.iconUrl"
                :class="'sh-iconfont' + ' ' + dataForm.iconUrl"
              />
              <i
                v-if="dataForm.iconUrl.indexOf('el-icon')!==-1"
                v-model="dataForm.iconUrl"
                :class="dataForm.iconUrl"
              />
            </div>

            <el-button type="success" size="mini" @click="onIcon">选择</el-button>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="标签" prop="tag">
            <el-input v-model="dataForm.tag" placeholder="请输入标签" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="排序">
            <el-input-number
              v-model="dataForm.sortNum"
              controls-position="right"
              :min="0"
              placeholder="请输入排序"
            />
          </el-form-item>
        </el-col>
        <el-col>
          <el-form-item label="路由" prop="navUrl">
            <el-input v-model="dataForm.navUrl" placeholder="请输入路由" />
          </el-form-item>
        </el-col>
        <el-col>
          <el-form-item label="完整路由" prop="navFullUrl">
            <el-input v-model="dataForm.navFullUrl" placeholder="请输入完整路由" />
          </el-form-item>
        </el-col>
        <el-col>
          <el-form-item label="备注" prop="remark">
            <el-input v-model="dataForm.remark" placeholder="请输入内容" />
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="onClose">取 消</el-button>
      <el-button type="primary" :disabled="disabled" @click="onDefinite">提 交</el-button>
    </div>
    <!--图标选择弹框-->
    <el-dialog title="选择图标" width="400px" :visible.sync="iconVisible" append-to-body>
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="基础图标" name="first">
          <div class="iconList">
            <div v-for="icon in baseIcons" class="iconBorder" @click="selectIconName(icon)">
              <span :class="'sh-iconfont' + ' ' + icon" />
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="其他" name="second">
          <div class="iconList">
            <div v-for="icon in otherIcons" class="iconBorder" @click="selectIconName(icon)">
              <i :class="icon" class="my-icon" />
            </div>
          </div>
        </el-tab-pane>
      </el-tabs>
      <div slot="footer" class="dialog-footer">
        <div v-if="iconUrl==''?seledIconBox=false:true" class="seledIconBox">
          <span class="selTxt">已选择:</span>
          <span v-if="iconUrl.indexOf('sh-icon')!==-1" :class="'sh-iconfont' + ' ' + iconUrl" />
          <i v-if="iconUrl.indexOf('el-icon')!==-1" :class="iconUrl" class="my-icon" />
        </div>

        <el-button @click="onCloseIcon">取 消</el-button>
        <el-button type="primary" @click="onInnerDefinite()">确 定</el-button>
      </div>
    </el-dialog>
  </el-dialog>
</template>

<script>
    import { validateNull } from '../../../utils/validator'
    import {moduleAxios} from '@/api/system/module.js'
    import { moduleDetail, moduleSave } from '../../../api/system/module'

    export default {
        name: 'Dialog',
        props: {
            dialogTitle: {
                type: String,
                default: ''
            },
            logId: {
                type: Number
            },
            showDlog: {
                type: Boolean,
                default: false
            },
            childPName: {
                type: String
            },
            parentName: {
                type: String
            }
        },
        data() {
            return {
                disabled: false,
                showModal: false,
                iconVisible: false,
                dataForm: {
                    code: '',
                    name: '',
                    state: '',
                    tag: '',
                    navFullUrl: '',
                    navUrl: '',
                    parentId: '',
                    sortNum: 0,
                    remark: '',
                    iconUrl: 'sh-icon-pinzhongliaoji'
                },
                rules: {
                    code: [{ required: true, validator: validateNull, trigger: 'blur' }],
                    name: [{ required: true, validator: validateNull, trigger: 'blur' }],
                    state: [{ required: true, validator: validateNull, trigger: 'change' }],
                    tag: [{ required: true, validator: validateNull, trigger: 'blur' }],
                    navFullUrl: [{ required: true, validator: validateNull, trigger: 'blur' }],
                    navUrl: [{ required: true, validator: validateNull, trigger: 'blur' }],
                    parentId: [{ required: true, validator: validateNull, trigger: 'blur' }],
                    remark: [{ required: true, validator: validateNull, trigger: 'blur' }],
                    iconUrl: [{ required: true, validator: validateNull, trigger: ['blur', 'change'] }]
                },
                token: this.$store.state.user.token,
                parentModule: [],
                getID: [],
                inputID: '',
                lastModel: false,
                activeName: 'first',
                baseIcons: ['sh-icon-pinzhongliaoji', 'sh-icon-pinzhongkaitai', 'sh-icon-banzhiguanli', 'sh-icon-technological-parameter', 'sh-icon-gongxuguanli', 'sh-icon-gangweiguanli', 'sh-icon-bianmaguize', 'sh-icon-baoyangleixing', 'sh-icon-gongyipinzhongdingliang', 'sh-icon-gongyiguanli', 'sh-icon-guzhangleixing', 'sh-icon-gongyiluxian', 'sh-icon-jichuziliao', 'sh-icon-jitaifenpei', 'sh-icon-jiaoseguanli', 'sh-icon-icon-test', 'sh-icon-mokuaiguanli', 'sh-icon-measure', 'sh-icon-gongsi', 'sh-icon-peijianguanli', 'sh-icon-kaoqinguizeshezhi', 'sh-icon-paibanguanli', 'sh-icon-pinzhonggongyidan', 'sh-icon-renshiguanli', 'sh-icon-quanxianxiangguanli', 'sh-icon-shebeijixing', 'sh-icon-shengchanbaogong', 'sh-icon-shebeiguanli', 'sh-icon-shengchanguanli', 'sh-icon-sehaoguanli', 'sh-icon-shengchandingdan', 'sh-icon-shebeidanganguanli', 'sh-icon-shengchantongzhidan', 'sh-icon-wuliaoguanli', 'sh-icon-tongjifenxi', 'sh-icon-wuliaofenlei', 'sh-icon-xitongguanli', 'sh-icon-wuliaoshuxing', 'sh-icon-zidian', 'sh-icon-zuzhijiagou', 'sh-icon-zhibanguanli', 'sh-icon-icon-test-copy', 'sh-icon-shucaijiance', 'sh-icon-jijianhesuan', 'sh-icon-guzhanghujiao', 'sh-icon-weixiugongdan', 'sh-icon-renyuanbaobiao', 'sh-icon-banzubaobiao', 'sh-icon-pinzhongbaobiao', 'sh-icon-jitaibaobiao', 'sh-icon-chengbenfenxi', 'sh-icon-guzhangyujing', 'sh-icon-dandingjiance', 'sh-icon-chanchengpindinge', 'sh-icon-huanjingjiance', 'sh-icon-nenghaojiance', 'sh-icon-nenghaodinge', 'sh-icon-jihuapaicheng', 'sh-icon-cushakuguanli', 'sh-icon-peimiandangan', 'sh-icon-pihaoguanli', 'sh-icon-gongyiyujing', 'sh-icon-shujubeifen', 'sh-icon-wuliaozhuisu', 'sh-icon-pinzhongjijiandinge', 'sh-icon-peimianguanli', 'sh-icon-yujingguanli', 'sh-icon-yuanliaodinge', 'sh-icon-zhiliangguanli', 'sh-icon-zhongliangjianyan', 'sh-icon-tairigongfeilirunbiao', 'sh-icon-paichengshitu', 'sh-icon-paichengfabu', 'sh-icon-paichengyunsuan', 'sh-icon-dandingxiaohaodinge', 'sh-icon-zaichanpindinge', 'sh-icon-niandujianyan', 'sh-icon-ziluojianyan', 'sh-icon-zhichengshuaidinge', 'sh-icon-qiangdujianyan', 'sh-icon-peimianpaibaotu', 'sh-icon-huihuadinge', 'sh-icon-huihuaguanli', 'sh-icon-tiaoganjianyan', 'sh-icon-beijianguanli', 'sh-icon-shujujiance', 'sh-icon-shebeibaoyang', 'sh-icon-zhizaoBOMsheji', 'sh-icon-shengchangongxu'],
                otherIcons: ['el-icon-eleme', 'el-icon-delete', 'el-icon-setting', 'el-icon-user', 'el-icon-phone-outline', 'el-icon-more-outline', 'el-icon-star-off', 'el-icon-goods', 'el-icon-warning-outline', 'el-icon-question', 'el-icon-info', 'el-icon-zoom-in', 'el-icon-zoom-out', 'el-icon-remove-outline', 'el-icon-circle-plus-outline', 'el-icon-circle-check', 'el-icon-circle-close', 'el-icon-help', 'el-icon-minus'],
                iconUrl: 'sh-icon-pinzhongliaoji',
                seledIconBox: false,
                unSelIcon: ''
            }
        },
        watch: {
            showDlog: function(newVal) {
                this.showModal = newVal
                this.disabled = false
                if (newVal) {
                    if (this.dialogTitle == '编辑') {
                        moduleDetail({ id: this.logId }).then(res => {
                            if (res.data.status == 200) {
                                this.unSelIcon = res.data.res.iconUrl
                                this.dataForm = res.data.res
                                this.dataForm.iconUrl = String(res.data.res.iconUrl)
                            }
                        })
                    } else if (this.dialogTitle == '新增') {
                        if (!this.logId) {
                            // 顶级新增
                            this.dataForm.parentId = 0
                            this.lastModel = false
                        } else {
                            // 子级新增
                            this.lastModel = true
                            this.dataForm.parentId = this.logId
                        }
                    }
                }
            }
        },
        methods: {
            onDefinite: function() {
                this.disabled = true
                this.$refs.dataForm.validate((valid) => {
                    if (valid) {
                        moduleSave(this.dataForm).then(res => {
                            if (res.data.status == 200) {
                                this.disabled = true
                                this.$message({
                                    message: res.data.message,
                                    type: 'success'
                                })
                                this.$refs.dataForm.resetFields()
                                this.dataForm.sortNum = 0
                                // 第二个值为父组件v-bind绑定的子组件显示隐藏属性，第三个值为控制父组件是否调用getTableData方法更新数据
                                this.$emit('onSysModuleLog', 'showDlog', true)
                                this.$router.go(0)
                            } else {
                                this.disabled = false
                            }
                        })
                    } else {
                        this.$message({
                            type: 'warning',
                            message: '请填写完整信息！'
                        })
                        this.disabled = false
                    }
                })
            },
            onClose() {
                // 第二个值为父组件v-bind绑定的子组件显示隐藏属性，第三个值为控制父组件是否调用getTableData方法更新数据
                this.$emit('onSysModuleLog', 'showDlog', false)
                this.$refs.dataForm.resetFields()
                this.dataForm.sortNum = 0
                this.dataForm.id = null
            },
            onCloseIcon() {
                this.iconVisible = false
            },
            handleClick(tab, event) {
            },
            onIcon() {
                this.iconVisible = true
                this.iconUrl = this.dataForm.iconUrl
            },
            onInnerDefinite() {
                this.iconVisible = false
                this.dataForm.iconUrl = this.iconUrl
            },
            // 点击选择icon
            selectIconName(icon) {
                this.iconUrl = icon
            }
        }
    }
</script>

<style scoped>
  @import "../iconfont/iconfont.css";

  .el-select {
    display: block !important;
  }

  .iconBox {
    width: 60px;
    float: left;
    height: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 3px;
  }

  .my-icon {
    font-size: 22px;
  }

  .iconList {
    border-top: 1px solid #eee;
    border-left: 1px solid #eee;
    width: 100%;
  }

  .iconBorder {
    display: inline-block;
    border-right: 1px solid #eee;
    border-bottom: 1px solid #eee;
    width: 8.33%;
    text-align: center;
    padding: 1.5% 0px;
  }

  .iconBorder:hover {
    background-color: #63a35c;
    color: #fff;
  }

  .seledIconBox {
    display: inline-block;
    padding-right: 20px;
  }

  .selTxt {
    font-size: 14px;
  }
</style>
