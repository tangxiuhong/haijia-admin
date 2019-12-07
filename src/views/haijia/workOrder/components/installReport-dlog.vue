<template>
  <el-dialog
    :title="dialogTitle"
    :visible="showModal"
    :close-on-click-modal="false"
    width="50%"
    :before-close="onClose">
    <div class="form-width-95">
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="120px" class="demo-ruleForm"
               :show-message="true">
        <el-row>
          <el-col :span="12">
            <el-form-item label="工单编号" prop="code">
              <el-input disabled v-model="ruleForm.code"/>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="客户" prop="contactName">
              <el-input disabled v-model="ruleForm.contactName"/>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="客户地址" prop="adress">
              <el-input disabled v-model="ruleForm.adress"/>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="联系人" prop="contact">
              <el-input disabled v-model="ruleForm.contact"/>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="联系电话" prop="tel">
              <el-input disabled v-model="ruleForm.tel" maxlength="11"/>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="设备机型" prop="jixing">
              <el-input disabled v-model="ruleForm.jixing"/>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="调试开始日期" prop="startTime">
              <el-input disabled v-model="ruleForm.startTime"/>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="调试结束日期" prop="endTime">
              <el-date-picker
                v-model="ruleForm.endTime"
                type="datetime"
                placeholder="选择日期时间"
                style="width: 100%;"
                align="right"
                :picker-options="pickerOptions">
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="车速（转）" prop="chesu">
              <el-input v-model="ruleForm.chesu"/>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="门幅" prop="menfu">
              <el-input v-model="ruleForm.menfu"/>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="钢扣动程" prop="dongcheng">
              <el-input v-model="ruleForm.dongcheng"/>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="水泵" prop="shuibeng">
              <el-input v-model="ruleForm.shuibeng"/>
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item label="备注" prop="remark">
          <el-input type="textarea" v-model="ruleForm.remark"/>
        </el-form-item>
      </el-form>
    </div>
    <div slot="footer" class="dialog-footer">
      <el-button @click="onClose">取 消</el-button>
      <el-button @click="resetForm">重置</el-button>
      <el-button type="primary" @click="onDefinite('ruleForm')" :disabled="disabled">提 交</el-button>
    </div>
  </el-dialog>
</template>

<script>
    import {validateNull} from '@/utils/validator'

    export default {
        name: "worderOrder-dialog",
        props: {
            reportWorkDlog: {
                type: Boolean,
                default: false
            },
            dialogTitle: {
                type: String,
                default: ''
            },
            logId: {
                type: Number,
                default: null
            }
        },
        data() {
            return {
                showModal: false,
                disabled: false,
                loading: false,
                ruleForm: {
                    code: '154351234',
                    contactName: '糖糖',
                    adress: '上海市浦东新区',
                    contact: '小雨',
                    tel: '1546543336',
                    jixing: 'B-54666',
                    taishu: '21',
                    startTime: '2019-10-21',
                    endTime: '',
                    chesu: '',
                    menfu: '',
                    dongcheng: '',
                    shuibeng: '',
                    remark: ''
                },
                pickerOptions: {
                    shortcuts: [{
                        text: '今天',
                        onClick(picker) {
                            picker.$emit('pick', new Date());
                        }
                    }, {
                        text: '昨天',
                        onClick(picker) {
                            const date = new Date();
                            date.setTime(date.getTime() - 3600 * 1000 * 24);
                            picker.$emit('pick', date);
                        }
                    }, {
                        text: '一周前',
                        onClick(picker) {
                            const date = new Date();
                            date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
                            picker.$emit('pick', date);
                        }
                    }]
                },
                rules: {
                    startTime: [
                        {required: true, validator: validateNull, trigger: 'blur'}
                    ],
                    endTime: [
                        {required: true, validator: validateNull, trigger: 'blur'}
                    ],
                    chesu: [
                        {required: true, validator: validateNull, trigger: 'blur'}
                    ],
                    menfu: [
                        {required: true, validator: validateNull, trigger: 'blur'}
                    ],
                    dongcheng: [
                        {required: true, validator: validateNull, trigger: 'blur'}
                    ],
                    shuibeng: [
                        {required: true, validator: validateNull, trigger: 'blur'}
                    ],
                    remark: [
                        {required: true, validator: validateNull, trigger: 'blur'}
                    ]
                }
            }
        },
        methods: {
            onClose() {
                this.resetForm()
                this.$emit('onReportWorkDlog', 'reportWorkDlog', false)
            },
            onDefinite() {
                this.$refs.ruleForm.validate((valid) => {
                    if (valid) {
                        alert('已提交!');
                        this.resetForm();
                        this.$emit('onReportWorkDlog', 'reportWorkDlog', false)
                        this.showModal = false
                        this.$refs.ruleForm.resetFields();
                    } else {
                        this.$message({
                            message: '请填写完整信息！',
                            type: 'warning'
                        })
                        return false;
                    }
                })
            },
            resetForm() {
                this.$refs.ruleForm.resetFields();
            }
        },
        watch: {
            reportWorkDlog(newVal) {
                this.showModal = newVal;
                if (newVal) {

                }
            }
        }
    }
</script>

<style scoped>


</style>
