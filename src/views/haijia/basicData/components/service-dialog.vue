<template>
    <div>
        <el-dialog
                :title="dialogTitle"
                :visible="serviceLog"
                :close-on-click-modal="false"
                :before-close="onClose"
                width="30%">
            <el-form :model="dataForm" :show-message="false" :rules="rules" ref="dataForm" label-width="100px">
                <el-form-item label="配置名称" prop="name">
                    <el-input v-model="dataForm.name" placeholder="请输入配置名称"></el-input>
                </el-form-item>
                <el-form-item label="url地址" prop="url">
                    <el-input v-model="dataForm.url" placeholder="请输入url地址"></el-input>
                </el-form-item>
                <el-form-item label="类别" prop="category">
                    <el-input v-model="dataForm.category" placeholder="请输入类别"></el-input>
                </el-form-item>
                <el-form-item label="服务地址" prop="serviceHostId">
                    <el-select v-model="dataForm.serviceHostId" filterable placeholder="请选择服务地址" style="width: 100%;">
                        <el-option
                                v-for="item in serviceHostList"
                                :key="item.id"
                                :label="item.host"
                                :value="item.id">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="备注" prop="remark">
                    <el-input v-model="dataForm.remark" type="textarea" :rows="2" placeholder="请输入内容"></el-input>
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
  import { moduleAxios } from '../../../../api/system/module'

  export default {
    name: 'service-dialog',
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
        serviceLog: false,
        disable: false,
        typeId: null,
        serviceHostList: [],
        dataForm: {
          id: '',
          name: '',
          url: '',
          category: '',
          serviceHostId: '',
          remark: ''
        },
        rules: {
          name: [
            { required: true, validator: validateNull, trigger: 'change' }
          ],
          url: [
            { required: true, validator: validateNull, trigger: 'change' }
          ]
        }
      }
    },
    created() {
      // this.getServiceHostList();

    },
    watch: {
      showDlog(newVal) {
        this.serviceLog = newVal
        if (newVal) {
          this.getServiceHostList();
          if(this.dialogTitle == '编辑') {
            this.dataForm.id =this.logId
            moduleAxios.serviceDetail({id:this.logId}).then(res=> {
              if(res.data.status === 200) {
                this.dataForm = res.data.res;
              }
            })
          }else if(this.dialogTitle == '新增') {
            this.dataForm.id = ''
          }
        }
      }
    },
    methods: {
      //获取服务地址数据
      getServiceHostList() {
        moduleAxios.serviceHostList({}).then(res => {
          if (res.data.status === 200) {
            this.serviceHostList = res.data.res
            this.dataForm.serviceHostId=res.data.res[0].id
          }
        })
      },
      //提交
      onDefinite() {
        this.$refs.dataForm.validate((valid) => {
          if (valid) {
            moduleAxios.serviceSave({
              id: this.dataForm.id,
              name: this.dataForm.name,
              url: this.dataForm.url,
              category: this.dataForm.category,
              serviceHostId: this.dataForm.serviceHostId,
              remark: this.dataForm.remark
            }).then(res => {
              if (res.data.status === 200) {
                this.$message({
                  message: res.data.message,
                  type: 'success'
                })
                this.resetForm()
                this.$emit('onServiceLog', 'showDlog', true)
              }
            });
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
        this.$refs.dataForm.resetFields()
      },
      //取消
      onClose() {
        this.resetForm()
        this.$emit('onServiceLog', 'showDlog', false)
      }
    }
  }
</script>

<style scoped>

</style>

