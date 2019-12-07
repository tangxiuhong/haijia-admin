<template>
  <el-dialog
    :title="dialogTitle"
    :visible="showModal"
    :close-on-click-modal="false"
    width="30%"
    :before-close="onClose">
    <div class="form-width-95">
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="120px" class="demo-ruleForm"
               :show-message="true">
        <el-form-item label="维修工程师" prop="customerName">
          <el-select v-model="customerName" filterable placeholder="请选择" style="width: 100%;">
            <el-option
              v-for="item in ruleForm.customerName"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="维修日期" prop="startTime">
          <el-date-picker
            style="width: 100%;"
            v-model="ruleForm.startTime"
            type="datetime"
            :picker-options="pickerOptions"
            placeholder="选择日期时间">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="备注" prop="contractId">
          <el-input type="textarea" v-model="ruleForm.contractId"></el-input>
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
    import { validateNull } from '@/utils/validator'

    export default {
        name: "worderOrder-dialog",
        props: {
            dispatchedDlog: {
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
                        {value: 'val1', label: '晓静'},
                        {value: 'val2', label: '小王'},
                        {value: 'val3', label: '媛媛'},
                        {value: 'val4', label: '玲玲'},
                        {value: 'val5', label: '琳琳'}
                    ],
                    contactName: [
                        {value: 'val1', label: '晓静'},
                        {value: 'val2', label: '小王'},
                        {value: 'val3', label: '媛媛'},
                        {value: 'val4', label: '玲玲'},
                        {value: 'val5', label: '琳琳'}
                    ],
                    contractId: "",
                    startTime: "",
                    endTime: ""
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
                this.$emit('onDispatchedDlog', 'dispatchedDlog', false)
            },
            onDefinite() {
                this.$refs.ruleForm.validate((valid) => {
                    if (valid) {
                        alert('已提交!');
                        this.resetForm();
                        this.$emit('onDispatchedDlog', 'dispatchedDlog', false)
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
            dispatchedDlog(newVal) {
                this.showModal = newVal;
                if (newVal) {

                }
            }
        }
    }
</script>

<style scoped>


</style>
