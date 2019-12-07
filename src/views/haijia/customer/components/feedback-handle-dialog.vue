<template>
  <div>
    <el-dialog
      :title="dialogTitle"
      :visible="showModal"
      :close-on-click-modal="false"
      :before-close="onClose"
      width="50%"
    >
      <el-form ref="feedbackHandleForm" :model="feedbackHandleForm" :show-message="true" :rules="rules"
               label-width="100px">
        <el-row>
          <el-col :span="12">
            <el-form-item label="处理人" prop="arrivalDate">
              <el-input v-model="feedbackHandleForm.arrivalDate" disabled/>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="处理时间" prop="installDate">
              <el-input
                v-model="feedbackHandleForm.installDate"
                disabled
                class="input-style"
                style="width:100%"
              />
              <!--              </el-date-picker>-->
              <!--              <el-date-picker-->
              <!--                v-model="feedbackHandleForm.installDate"-->
              <!--                type="date"-->
              <!--                disabled-->
              <!--                class="input-style"-->
              <!--                style="width:100%"-->
              <!--              >-->
              <!--              </el-date-picker>-->
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="处理意见" prop="createTime">
              <el-input
                v-model="feedbackHandleForm.createTime"
                type="textarea"
                :row="2"
                placeholder="请输入处理意见">
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <span slot="footer">
          <el-button @click="onClose('feedbackHandleForm')">取消</el-button>
          <el-button @click="resetForm('feedbackHandleForm')">重置</el-button>
          <el-button type="primary" @click="onDefinite('feedbackHandleForm')">提交</el-button>
        </span>
    </el-dialog>
  </div>
</template>

<script>
    import {validateNull} from '../../../../utils/validator'

    export default {
        name: 'feedback-handle-dialog',
        props: {
            handleDlog: {
                type: Boolean,
                default: false
            },
            dialogTitle: {
                type: String,
                default: ''
            }
        },
        data() {
            return {
                showModal: false,
                feedbackHandleForm: {
                    arrivalDate: '',
                    installDate: '',
                    createTime: ''
                },
                rules: {
                    createTime: [
                        {required: true, validator: validateNull, trigger: 'change'}
                    ]
                }
            }
        },
        watch: {
            handleDlog(newVal) {
                this.showModal = newVal
            }
        },
        methods: {
            //提交
            onDefinite() {
                this.$refs.feedbackHandleForm.validate((valid) => {
                    if (valid) {
                        alert('已提交')
                        this.resetForm()
                        this.$emit('onfeedbackHandleLog', 'handleDlog', false)
                        this.showModal = false
                    } else {
                        this.$message({
                            message: '请填写完整信息！',
                            type: 'warning'
                        })
                        return false
                    }
                })
            },
            //重置
            resetForm() {
                this.$refs.feedbackHandleForm.resetFields()
            },
            //取消
            onClose() {
                this.resetForm()
                this.$emit('onfeedbackHandleLog', 'handleDlog', false)
                this.showModal = false
            }
        }
    }
</script>

<style scoped>

</style>
