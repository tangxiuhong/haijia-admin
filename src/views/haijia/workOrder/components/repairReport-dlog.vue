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
              <el-input disabled v-model="ruleForm.code"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="客户" prop="contactName">
              <el-input disabled v-model="ruleForm.contactName"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="客户地址" prop="adress">
              <el-input disabled v-model="ruleForm.adress"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="联系人" prop="contact">
              <el-input disabled v-model="ruleForm.contact"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="联系电话" prop="tel">
              <el-input disabled v-model="ruleForm.tel" maxlength="11"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="设备机型" prop="jixing">
              <el-input disabled v-model="ruleForm.jixing"></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item label="故障大类" prop="dalei">
              <el-input disabled v-model="ruleForm.dalei"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="故障类别" prop="leibie">
              <el-input disabled v-model="ruleForm.leibie"></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item label="到厂时间" prop="tofactoryTime">
              <el-input disabled v-model="ruleForm.tofactoryTime"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="维修开始日期" prop="startTime">
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
            <el-form-item label="维修结束日期" prop="endTime">
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
          <el-col :span="24">
            <el-form-item label="故障原因" prop="reason">
              <el-input type="textarea" v-model="ruleForm.reason"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="处理方法" prop="chesu">
              <el-input type="textarea" v-model="ruleForm.chesu"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="拍照上传" prop="getImg">
              <!--<el-input v-model="ruleForm.getImg"></el-input>-->
              <el-upload
                class="upload-demo"
                drag
                action="https://jsonplaceholder.typicode.com/posts/"
                multiple>
                <i class="el-icon-upload"></i>
                <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
                <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
              </el-upload>
            </el-form-item>
          </el-col>
        </el-row>
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
        rules: {
          customerName: [
            {required: true, validator: validateNull, trigger: 'blur'}
          ],
          startTime: [
            {required: true, validator: validateNull, trigger: 'blur'}
          ],
          endTime: [
            {required: true, validator: validateNull, trigger: 'blur'}
          ]
        },
        ruleForm: {
          code: '154351234',
          contactName: '糖糖',
          adress: '上海市浦东新区',
          contact: '小雨',
          tel: '1546543336',
          jixing: 'B-54666',
          dalei:'预警故障',
          leibie:'预警故障',
          reason:'',
          tofactoryTime:'2019-8-14',
          taishu: '21',
          startTime: '2019-10-21',
          endTime: '',
          chesu: '',
          getImg:''
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
        rules:{
          endTime: [
            {required: true, validator: validateNull, trigger: 'blur'}
          ],
          chesu: [
            {required: true, validator: validateNull, trigger: 'blur'}
          ],
          menfu:  [
            {required: true, validator: validateNull, trigger: 'blur'}
          ],
          dongcheng:  [
            {required: true, validator: validateNull, trigger: 'blur'}
          ],
          shuibeng:  [
            {required: true, validator: validateNull, trigger: 'blur'}
          ],
          remark:  [
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
