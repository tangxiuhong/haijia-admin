<template>
  <div>
    <el-dialog
      :title="dialogTitle"
      :visible="showModal"
      :close-on-click-modal="false"
      :before-close="onClose"
      width="50%"

    >
      <el-form ref="FeedbackShowForm" :model="FeedbackShowForm" :show-message="true" label-width="100px">
        <el-row>
          <el-col :span="24">
            <el-form-item label="问题描述" prop="code">
              <el-input v-model="FeedbackShowForm.code" disabled type="textarea" :row="2"/>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="客户名称" prop="name">
              <el-input v-model="FeedbackShowForm.name" disabled style="width:100%"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="联系电话" prop="state">
              <el-input v-model="FeedbackShowForm.state" disabled style="width:100%">
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="所属公司" prop="price">
              <el-input v-model=" FeedbackShowForm.price" disabled></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="创建时间" prop="signTime">
              <el-input v-model=" FeedbackShowForm.price" disabled></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="问题来源" prop="machineName">
              <el-input v-model="FeedbackShowForm.machineName" disabled style="width:100%">
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="状态" prop="num">
              <el-input v-model=" FeedbackShowForm.num" disabled/>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="处理人" prop="xsrq">
              <el-input v-model="FeedbackShowForm.xsrq" disabled>
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="处理时间" prop="arrivalDate">
              <el-input
                v-model="FeedbackShowForm.arrivalDate"
                disabled>
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="处理意见" prop="installDate">
              <el-input
                v-model="FeedbackShowForm.installDate"
                disabled
                type="textarea"
                :row=2
              >
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <span slot="footer">
        <el-button @click="onClose('FeedbackShowForm')">取消</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
    export default {
        name: 'sales-contract-dialog',
        props: {
            showDlog: {
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
                FeedbackShowForm: {
                    code: '',
                    name: '',
                    machineName: '',
                    num: '未处理',
                    state: '',
                    price: '',
                    xsrq: '',
                    signTime: '',
                    arrivalDate: '',
                    installDate: '',
                    createTime: '',
                    createName: '',
                },
            }
        },
        watch: {
            showDlog(newVal) {
                this.showModal = newVal
            }
        },
        methods: {
            //取消
            onClose() {
                this.$emit('onFeedbackShowLog', 'showDlog', false)
                this.showModal = false
            }
        }
    }
</script>

<style scoped>

</style>
