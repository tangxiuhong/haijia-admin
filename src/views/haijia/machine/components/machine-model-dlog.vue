<template>
  <el-dialog
    :title="dialogTitle"
    :visible="showModal"
    width="30%"
    :before-close="onClose"
    :close-on-click-modal="false">
    <div>
      <el-form  :show-message="true" :model="dataForm" ref="dataForm" :rules="rules" label-width="100px" >
        <el-form-item label="名称" prop="name">
          <el-input v-model="dataForm.name" placeholder="请输入名称"></el-input>
        </el-form-item>
        <el-form-item label="编码" prop="code">
          <el-input v-model="dataForm.code" placeholder="请输入编码"onkeyup="value=value.replace(/[\u4e00-\u9fa5]/ig,'')"></el-input>
        </el-form-item>
        <el-form-item label="备注" prop="remark">
          <el-input v-model="dataForm.remark" placeholder="请输入内容"type="textarea" :rows="2"></el-input>
        </el-form-item>
      </el-form>
    </div>
    <div slot="footer" class="dialog-footer">
      <el-button @click="onClose">取 消</el-button>
      <el-button type="primary" @click="onDefinite('dataForm')" :disabled="disabled">提 交</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { validateNull } from '../../../../utils/validator'
import { machineModelDetail, machineModelSave, } from '../../../../api/haijia/machine'
export default {
  name: "machine-dlog",
  props: {
    showDlog: {
      type: Boolean,
      default: false
    },
    dialogTitle: {
      type: String,
      default: ''
    },
    logId:{
      type: Number,
      default:null
    }
  },
  data() {
    return {
      disabled: false,
      showModal: false,
      dataForm:{
        id: '',
        name:'',
        code:'',
        remark:''
      },
      rules:{
        name: [
          {required: true, validator: validateNull,trigger: 'change'}
          ],
        code: [
          {required: true, validator:validateNull,trigger: 'change'}
        ]
      }
    }
  },
  created() {

  },

  methods: {
    onDefinite: function() {
      this.$refs.dataForm.validate((valid) => {
        if (valid) {
          machineModelSave({
            id: this.dataForm.id,
            name: this.dataForm.name,
            code: this.dataForm.code,
            remark: this.dataForm.remark
          }).then(res => {
            if(res.data.status === 200){
              this.$message({
                message: res.data.message,
                type: 'success'
              })
              this.$emit('onMachineModelDlog','showDlog', true)
              this.resetForm();
            }
          })
        } else {
          this.$message({
            message: '请填写完整信息！',
            type: 'warning'
          })
          return false
        }
      })
    },
    resetForm() {
      this.$refs.dataForm.resetFields();
    },
    onClose() {
      this.resetForm();
      this.showModal = false;
      this.$emit('onMachineDlog','showDlog', true)
    }
  },
  watch: {
    showDlog(newVal) {
      this.showModal = newVal
      if (newVal) {
        if (this.dialogTitle == '编辑') {
        this.dataForm.id =this.logId
         machineModelDetail({id: this.logId}).then(res => {
            if(res.data.status === 200)
          {
            this.dataForm = res.data.res
          }
        })
        } else if (this.dialogTitle == '新增') {
          this.dataForm.id = ''
        }
      }
    }
  }
}
</script>

<style scoped>

</style>
