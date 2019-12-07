<template>
    <div>
        <el-dialog
                :title="dialogTitle"
                :visible="unitLog"
                :close-on-click-modal="false"
                :before-close="onClose"
                width="30%">
            <el-form :model="unitForm" :show-message="true" :rules="rules" ref="unitForm" label-width="120px">
                <el-form-item label="名称" prop="name">
                    <el-input v-model="unitForm.name" placeholder="请输入名称"></el-input>
                </el-form-item>
                <el-form-item label="编码" prop="code">
                    <el-input v-model="unitForm.code" placeholder="请输入编码" onkeyup="value=value.replace(/[\u4e00-\u9fa5]/ig,'')"></el-input>
                </el-form-item>
                <el-form-item label="基准计量单位" prop="isBase">
                    <el-radio v-model="unitForm.isBase" :label="1">是</el-radio>
                    <el-radio v-model="unitForm.isBase" :label="0">否</el-radio>
                </el-form-item>
                <el-form-item label="小数位数" prop="preci">
                    <el-input-number  v-model="unitForm.preci" placeholder="请输入小数位数" controls-position="right"
                                      :max="100"  :min="0" style="width: 34%"></el-input-number>
                </el-form-item>
                <el-form-item label="排序" prop="sortNum">
                    <el-input-number v-model="unitForm.sortNum" controls-position="right" :min="0" style="width: 35%"></el-input-number>
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
  import { unitDetail, unitSave } from '../../../../api/haijia/basicData'

  export default {
    name: 'unit-dialog',
    props: {
      showDlog: {
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
        unitLog: false,
        disable: false,
        unitForm: {
          id: '',
          name: '',
          code: '',
          isBase: 1,
          preci: '',
          sortNum: 0
        },
        rules: {
          name: [
            { required: true, validator: validateNull, trigger: 'change' }
          ],
          code: [
            { required: true, validator: validateNull, trigger: 'change' }
          ],
          isBase: [
            { required: true, validator: validateNull, trigger: 'change' }
          ],
          preci: [
            { required: true, validator: validateNull, trigger: 'change' }
          ]
        }
      }
    },
    watch: {
      showDlog(newVal) {
        this.unitLog = newVal
        if (newVal)  {
          if (this.dialogTitle == '编辑') {
            this.unitForm.id = this.logId
            unitDetail({id: this.logId}).then(res => {
              if (res.data.status === 200){
                this.unitForm.code = res.data.res.code;
                this.unitForm.name = res.data.res.name;
                this.unitForm.isBase = res.data.res.isBase === true ? 1 : 0;
                this.unitForm.preci = res.data.res.preci;
                this.unitForm.sortNum = res.data.res.sortNum;
              }
            })
          }else if (this.dialogTitle ='新增') {
            this.unitForm.id = ''
          }
        }
      }
    },
    methods: {
      //提交
      onDefinite() {
        this.$refs.unitForm.validate((valid) => {
          if (valid) {
          unitSave({
              id: this.unitForm.id,
              name: this.unitForm.name,
              code: this.unitForm.code,
              isBase: this.unitForm.isBase === 1,
              preci: this.unitForm.preci,
              sortNum: this.unitForm.sortNum
            }).then(res => {
              if (res.data.status === 200) {
                this.$message({
                  message: res.data.message,
                  type: 'success'
                })
                this.resetForm()
                this.$emit('onUnitLog','showDlog' ,true)
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
      //重置
      resetForm() {
        this.$refs.unitForm.resetFields()
      },
      //取消
      onClose() {
        this.resetForm()
        this.$emit('onUnitLog','showDlog' ,false)
      }
    }
  }
</script>

<style scoped>

</style>
