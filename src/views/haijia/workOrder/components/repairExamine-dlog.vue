<template>
  <el-dialog
    :title="dialogTitle"
    :visible="showModal"
    :close-on-click-modal="false"
    width="30%"
    :before-close="onClose">
    <!--审核-->
    <div class="form-width-95">
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="120px" class="demo-ruleForm"
               :show-message="true">
        <el-form-item label="保修到期日" prop="contractId">
          <el-input disabled v-model="ruleForm.repairDate"></el-input>
        </el-form-item>
        <el-form-item label="故障大类" prop="customerName">
          <el-select v-model="customerName" filterable placeholder="请选择" style="width: 100%;">
            <el-option
              v-for="item in ruleForm.customerName"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="故障类别" prop="contactName">
          <el-select v-model="contactName" filterable placeholder="请选择" style="width: 100%;">
            <el-option
              v-for="item in ruleForm.contactName"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="服务费" prop="serviceCharge">
          <el-input v-model="ruleForm.serviceCharge"></el-input>
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
      examineDlog: {
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
          customerName: [
            {value: 'val1', label: '危险故障'},
            {value: 'val2', label: '警告故障'},
            {value: 'val3', label: '信号故障'}
          ],
          contactName: [
            {value: 'val1', label: '危险故障'},
            {value: 'val2', label: '警告故障'},
            {value: 'val3', label: '信号故障'}
          ],
          repairDate:"2019-12-11",
          serviceCharge: ""
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
        customerName: '',
        contactName: ''
      }
    },
    methods: {
      onClose() {
        this.resetForm();
        this.$emit('onExamineDlog', 'examineDlog', false)
      },
      onDefinite() {
        this.$refs.ruleForm.validate((valid) => {
          if (valid) {
            alert('已提交!');
            this.resetForm();
            this.$emit('onExamineDlog','examineDlog', false)
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
        this.customerName = '';
        this.contactName = '';
        this.$refs.ruleForm.resetFields();
      }
    },
    watch: {
      examineDlog(newVal) {
        this.showModal = newVal;
        if (newVal) {

        }
      }
    }
  }
</script>

<style scoped>


</style>
