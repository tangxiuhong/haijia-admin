<template>
    <div>
        <el-dialog
                :title="dialogTitle"
                :visible="serviceLevelLog"
                :close-on-click-modal="false"
                :before-close="onClose"
                width="30%">
            <el-form   :model="dataForm"  :show-message="true" :rules="rules" ref="dataForm" label-width="100px" >
                <el-form-item label="名称" prop="name" >
                    <el-input v-model="dataForm.name" placeholder="请输入名称"></el-input>
                </el-form-item>
                <el-form-item label="描述" prop="remarks" >
                    <el-input v-model="dataForm.remarks" type="textarea" :rows="2" placeholder="请输入内容" onkeyup="value=value.replace(/[\u4e00-\u9fa5]/ig,'')"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer">
          <el-button @click="onClose()">取消</el-button>
          <el-button type="primary" @click="onDefinite()" :disable="disable">提交</el-button>
        </span>
        </el-dialog>
    </div>
</template>

<script>

  import { validateNull } from '../../../../utils/validator'

  export default {
    name: 'service-level-dialog',
    props:{
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
        serviceLevelLog: false,
        disable: false,
        dataForm: {
          name: '',
          remarks: ''
        },
        rules:{
          name: [
            { required: true, validator: validateNull ,trigger: 'change'}
          ]
        }
      }
    },
    created() {
    },
    watch: {
      showDlog(newVal) {
        this.serviceLevelLog = newVal
      }
    },
    methods: {
      //提交
      onDefinite() {
        this.$refs.dataForm.validate((valid) => {
          if(valid) {
            alert('已提交')
            this.resetForm()
            this.$emit('onServiceLevelLog',false)
            this.serviceLevelLog = false
          }else {
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
        this.$refs.dataForm.resetFields()
      },
      //取消
      onClose() {
        this.resetForm()
        this.$emit('onServiceLevelLog',false)
        this.serviceLevelLog = false
      }
    }
  }
</script>

<style scoped>

</style>

