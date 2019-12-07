<template>
  <div>
    <el-dialog :title="dialogTitle" :visible="showModal" :before-close="onClose" :close-on-click-modal="false" width="30%">
      <el-form :model="faultForm" :show-message="true" :rules="rules" ref="faultForm" label-width="100px">
        <el-form-item label="故障大类" prop="typeName" >
          <el-input v-model="faultForm.typeName" placeholder="请输入故障大类" ></el-input>
        </el-form-item>
        <el-form-item label="描述" prop="remark">
          <el-input type="textarea" :rows="2" v-model="faultForm.remark" placeholder="请输入内容" ></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer">
        <el-button @click="onClose()">取消</el-button>
        <el-button @click="resertForm('faultForm')">重置</el-button>
        <el-button type="primary" @click="onDefinite('faultForm')">提交</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import { validateNull } from '../../../../utils/validator'
  export default {
    name: 'fault-dialog',
    props: {
      showDlog: {
        type: Boolean,
        default: false
      },
      dialogTitle: {
        type: String,
        default: ''
      },
    },
    data() {
      return {
        showModal: false,
        faultForm: {
          typeName: '',
          remark: ''
        },
        rules: {
         typeName:[
           {required: true, validator:validateNull, trigger: 'change'}
         ]
        }
      }
    },
    methods: {
      onDefinite() {
        this.$refs.faultForm.validate( (valid) => {
          if(valid) {
            alert('已提交！')
            this.resertForm()
            this.showModal = false
            this.$emit('onFailLog' ,false)
          }else {
            this.$message({
              message: '请填写完整信息！',
              type: 'warning'
            })
          }
        })
      },
      resertForm() {
        this.$refs.faultForm.resetFields()
      },
      onClose(){
        this.resertForm()
        this.showModal = false,
        this.$emit('onFailLog',false)
      }
    },
    watch: {
      showDlog(newVal) {
        this.showModal = newVal
      }
    }
  }
</script>

<style scoped>

</style>
