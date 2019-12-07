<template>
  <el-dialog
    :title="dialogTitle"
    :visible="showModal"
    width="700"
    :close-on-click-modal="false"
    :before-close="onClose">
    <div>
      <el-form :show-message="true" :model="dataForm" ref="dataForm" :rules="rules" label-width="100px"
               class="demo-ruleForm form-width-95">
        <el-row>
          <el-col :span="12">
            <el-form-item label="上级部门" v-if="lastModel">
              <div>{{childPName}}</div>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="部门名称" prop="name">
              <el-input placeholder="请输入部门名称" v-model="dataForm.name"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="编码" prop="code">
              <el-input v-model="dataForm.code"
                        placeholder="请输入编码"
                        onkeyup="value=value.replace(/[\u4e00-\u9fa5]/ig,'')"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="简称" prop="shortName">
              <el-input v-model="dataForm.shortName" placeholder="请输入简称"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="排序" prop="sortNum">
              <el-input-number v-model=" dataForm.sortNum" controls-position="right" :min="0"
                               style="width: 100%;"/>
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
        </el-row>
      </el-form>
    </div>
    <div slot="footer" class="dialog-footer">
      <el-button @click="onClose">取 消</el-button>
      <el-button type="primary" @click="onDefinite()" :disabled="disabled">提 交</el-button>
    </div>
  </el-dialog>
</template>

<script>
    import {deptSave, deptDetail} from '../../../../api/haijia/depart'
    import {validateNull} from '../../../../utils/validator'

    export default {
        name: "machinemp-dlog",
        props: {
            showDlog: {
                type: Boolean,
                default: false
            },
            dialogTitle: {
                type: String,
                default: ""
            },
            logId: {
                type: Number,
                default: null
            },
            childPName: {
                type: String,
            }
        },
        data() {
            return {
                // parentName:'',
                lastModel: false,
                // parentName: '',
                disabled: false,
                showModal: false,
                dataForm: {
                    id: null,
                    name: '',
                    code: '',
                    shortName: '',
                    state: '',
                    sortNum: '',
                    parentId: ''
                },
                rules: {
                    name: [{required: true, validator: validateNull, trigger: 'change'}],
                    code: [{required: true, validator: validateNull, trigger: 'change'}],
                    shortName: [{required: true, validator: validateNull, trigger: 'change'}],
                    parentId: [{required: true, validator: validateNull, trigger: 'blur'}],
                    state: [{required: true, validator: validateNull, trigger: 'blur'}],
                }
            }
        },
        methods: {
            onDefinite() {
                this.$refs.dataForm.validate((valid) => {
                    if (valid) {
                        deptSave(this.dataForm).then(res => {
                            if (res.data.status === 200) {
                                this.$message({
                                    message: res.data.message,
                                    type: 'success'
                                });
                                this.resetForm()
                                //第二个值为父组件v-bind绑定的子组件显示隐藏属性，第三个值为控制父组件是否调用getTableData方法更新数据
                                this.$emit('onMachineDlog', 'showDlog', true)
                            }
                        })
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
                this.$refs.dataForm.resetFields();
                this.dataForm.sortNum=0;
            },
            onClose() {
                this.resetForm();
                this.$emit('onMachineDlog', 'showDlog', true)
            }
        },
        watch: {
            showDlog(newVal) {
                this.showModal = newVal;
                if (newVal) {
                    if (this.dialogTitle == '编辑') {
                        deptDetail({id: this.logId}).then(res => {
                            if (res.data.status === 200) {
                                this.dataForm = res.data.res
                                this.lastModel = false
                            }
                        })
                    } else if (this.dialogTitle == '新增') {
                        if (!this.logId) {
                            this.dataForm.parentId = 0;
                            this.lastModel = false
                        } else {
                            this.dataForm.parentId = this.logId;
                            this.lastModel = true
                        }
                    }
                }
            }
        }
    }
</script>

<style scoped>

</style>
