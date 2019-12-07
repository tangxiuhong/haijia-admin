<template>
    <div>
        <el-dialog
                :title="dialogTitle"
                :visible="serviceCycleLog"
                :close-on-click-modal="false"
                :before-close="onClose"
                width="30%">
            <el-form   :model="dataForm"  :show-message="true" :rules="rules" ref="dataForm" label-width="100px" >
                <el-form-item label="名称" prop="name" >
                    <el-input v-model="dataForm.name" placeholder="请输入名称"></el-input>
                </el-form-item>
                <el-form-item label="月数" prop="months" >
                    <el-input-number v-model="dataForm.months" placeholder="请输入月数" controls-position="right" :step="1" :min="1"></el-input-number>
                </el-form-item>
                <el-form-item label="描述" prop="remarks" >
                    <el-input v-model="dataForm.remarks" type="textarea" :rows="2" placeholder="请输入内容"></el-input>
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
    name: 'service-cycle-dialog',
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
        serviceCycleLog: false,
        disable: false,
        dataForm: {
          name: '',
          months: '',
          remarks: ''
        },
        rules:{
          name: [
            { required: true, validator: validateNull ,trigger: 'change'}
          ],
          months:  [
            { required: true, validator: validateNull ,trigger: 'change'}
          ]
        }
      }
    },
    created() {
    },
    watch: {
      showDlog(newVal) {
        this.serviceCycleLog = newVal
      }
    },
    methods: {
      //提交
      onDefinite() {
        this.$refs.dataForm.validate((valid) => {
          if(valid) {
            alert('已提交')
            this.resetForm()
            this.$emit('onServiceCycleLog',false)
            this.serviceCycleLog = false
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
        this.$emit('onServiceCycleLog',false)
        this.serviceCycleLog = false
      }
    }
  }
</script>

<style scoped>

</style>

