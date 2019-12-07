<template>
    <el-dialog
            :title="dialogTitle"
            :visible="showModal"
            width="30%"
            :before-close="onClose"
            :close-on-click-modal="false">
        <div>
            <el-form  :show-message="true" :model="dataForm" ref="dataForm" :rules="rules" label-width="100px" >
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="名称" prop="name">
                            <el-input v-model="dataForm.name" placeholder="请输入名称"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="编码" prop="code">
                            <el-input v-model="dataForm.code" placeholder="请输入编码"onkeyup="value=value.replace(/[\u4e00-\u9fa5]/ig,'')"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="设备机型" prop="machineModelId">
                            <el-select v-model="dataForm.machineModelId" placeholder="请选择设备机型" style="width:100%">
                                <el-option v-for="item in machineModelList" :key="item.id" :label="item.name"
                                           :value="item.id"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="生产厂商" prop="manufacturer">
                            <el-input v-model="dataForm.manufacturer" placeholder="请输入生产厂商"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="出厂日期" prop="prodTime">
                            <el-date-picker
                                    value-format="yyyy-MM-dd"
                                    v-model="dataForm.prodTime"
                                    type="date"
                                    class="input-style"
                                    placeholder="请选择日期"
                            />
                            <!-- https://element.eleme.cn/#/zh-CN/component/date-picker#ri-qi-ge-shi(年月日)-->
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="条码" prop="barCode">
                            <el-input v-model="dataForm.barCode" placeholder="请输入条码"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="状态" prop="state">
                            <el-select v-model="dataForm.state" placeholder="请选择状态" style="width: 100%;">
                                <el-option label="启用" :value="1"></el-option>
                                <el-option label="停用" :value="0"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
<!--                    <el-col :span="12">-->
<!--                        <el-form-item label="备注" prop="remark">-->
<!--                            <el-input v-model="dataForm.remark" placeholder="请输入内容"type="textarea" :rows="2"></el-input>-->
<!--                        </el-form-item>-->
<!--                    </el-col>-->
                </el-row>
            </el-form>
        </div>
        <div slot="footer" class="dialog-footer">
            <el-button @click="onClose">取 消</el-button>
            <el-button type="primary" @click="onDefinite('dataForm')" :disabled="disabled">提 交</el-button>
        </div>
    </el-dialog>
</template>

<script>
  // import { moduleAxios } from '@/api/haijia/machine'
  import { validateNull } from '@/utils/validator'
  // import { publicAxios } from '@/api/haijia/public'
  import { machineDetail, machineModelList, machineSave } from '../../../../api/haijia/machine'
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
        machineModelList: [],
        dataForm:{
          id: '',
          name:'',
          code:'',
          machineModelId:'',
          manufacturer: '',
          prodTime: '',
          barCode: '',
          state: 1,
        },
        rules:{
          name: [
            {required: true, validator: validateNull,trigger: 'change'}
          ],
          code: [
            {required: true, validator:validateNull,trigger: 'change'}
          ],
          // machineModelId:  [
          //   {required: true, validator:validateNull,trigger: 'change'}
          // ],
        }
      }
    },
    created() {

    },

    methods: {
      //获取配件分类的是数据
      getMachineModelList() {
        machineModelList().then(res => {
          if (res.data.status === 200) {
            this.machineModelList = res.data.res
          }
        })
      },
      onDefinite: function() {
        this.$refs.dataForm.validate((valid) => {
          if (valid) {
            machineSave({
              id: this.dataForm.id,
              name: this.dataForm.name,
              code: this.dataForm.code,
              machineModelId: this.machineModelList.find(y => y.id === this.dataForm.machineModelId).id,
              machineModelCode: this.machineModelList.find(y => y.id === this.dataForm.machineModelId).code,
              machineModelName: this.machineModelList.find(y => y.id === this.dataForm.machineModelId).name,
              manufacturer: this.dataForm.manufacturer,
              prodTime: this.dataForm.prodTime,
              barCode: this.dataForm.barCode,
              state: this.dataForm.state,
            }).then(res => {
              if(res.data.status === 200){
                this.$message({
                  message: res.data.message,
                  type: 'success'
                })
                this.$emit('onMachineDlog','showDlog', true)
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
        this.getMachineModelList ()
        if (newVal) {
          if (this.dialogTitle == '编辑') {
            this.dataForm.id =this.logId
            machineDetail({id: this.logId}).then(res => {
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
    .input-style {
        width: 100%
    }

</style>

