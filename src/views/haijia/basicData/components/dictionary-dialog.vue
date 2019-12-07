<template>
  <div>
    <el-dialog
      :title="dialogTitle"
      :visible.sync="showModal"
      :close-on-click-modal="false"
      :before-close="onClose"
      width="30%"
    >
      <el-form
        ref="dictionaryForm"
        :model="dictionaryForm"
        :show-message="true"
        :rules="rules"
        label-width="80px"
        v-loading="loading">
        <el-form-item label="名称" prop="name" class="inputLength">
          <el-input v-model="dictionaryForm.name" placeholder="请输入名称"/>
        </el-form-item>
        <el-form-item label="编码" prop="code" class="inputLength">
          <el-input v-model="dictionaryForm.code" placeholder="请输入编码"
                    onkeyup="value=value.replace(/[\u4e00-\u9fa5]/ig,'')"/>
        </el-form-item>
        <el-form-item label="排序" prop="sortNum">
          <el-input-number v-model=" dictionaryForm.sortNum" controls-position="right" :min="0"/>
        </el-form-item>
        <el-form-item label="备注" prop="remark" class="inputLength">
          <el-input v-model="dictionaryForm.remark" type="textarea" :rows="2" placeholder="请输入内容"/>
        </el-form-item>
      </el-form>
      <span slot="footer">
        <el-button @click="onClose">取 消</el-button>
        <el-button type="primary" @click="onSubmit" :disabled="disabled">提 交</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
    import {validateNull} from '@/utils/validator'
    import { dictDetail, dictSave } from '../../../../api/haijia/basicData'

    export default {
        name: 'Dialog',
        props: {
            dialogTitle: {
                type: String
            },
            showDlog: {
                type: Boolean,
                default: false
            },
            dictionaryName: {
                type: Object,
                default: {}
            },
            logId: {
                type: Number,
                default: null
            }
        },
        data() {
            return {
                loading: false,
                disabled: false,
                showModal: false,
                dictionaryData: [],
                dictionaryForm: {
                    id: '',
                    name: '',
                    code: '',
                    sortNum: 0,
                    remark: '',
                    category: ''
                },
                rules: {
                    name: [
                        {required: true, validator: validateNull, trigger: 'change'}
                    ],
                    code: [
                        {required: true, validator: validateNull, trigger: 'change'}
                    ]
                }
            }
        },
        methods: {
            onSubmit: function () {
                this.disabled = false
                this.loading = true
                this.$refs.dictionaryForm.validate((valid) => {
                    if (valid) {
                        dictSave({
                            name: this.dictionaryForm.name,
                            code: this.dictionaryForm.code,
                            sortNum: this.dictionaryForm.sortNum,
                            remark: this.dictionaryForm.remark,
                            category: this.dictionaryForm.category,
                            id: this.dictionaryForm.id
                        }).then(res => {
                            if (res.data.status == 200) {
                                this.disabled = true
                                this.loading = false
                                this.$refs.dictionaryForm.resetFields()
                                this.$emit('onDictionaryLog', 'showDlog', true)
                                this.showModal = false
                                this.$message({
                                    message: res.data.message,
                                    type: 'success'
                                })
                            } else {
                                this.disabled = false
                                this.loading = false
                            }
                        })
                    } else {
                        this.$message({
                            message: '请填写完整信息！',
                            type: 'warning'
                        })
                        this.disabled = false
                        this.loading = false
                        return false
                    }
                })
            },
            onClose() {
                this.$refs.dictionaryForm.resetFields()
                this.$emit('onDictionaryLog', 'showDlog', false)
            }
        },
        watch: {
            showDlog(newVal) {
                this.showModal = newVal
                if (newVal) {
                    this.disabled = false
                    this.dictionaryForm.category = this.dictionaryName.code
                    if (this.dialogTitle == '编辑') {
                        this.loading = true
                        this.dictionaryForm.id = this.logId
                        // 再次新增时，打开dialog
                        this.showModal = true
                      dictDetail({id: this.logId}).then(res => {
                            if (res.data.status == 200) {
                                this.loading = false
                                this.dictionaryForm.name = res.data.res.name,
                                this.dictionaryForm.code = res.data.res.code,
                                this.dictionaryForm.sortNum = res.data.res.sortNum,
                                this.dictionaryForm.remark = res.data.res.remark
                            }
                        })
                    } else if (this.dialogTitle == '新增') {
                        this.dictionaryForm.id = ''
                        this.showModal = true
                    }
                }
            }
        }
    }
</script>

<style scoped>
  .inputLength {
    width: 80%
  }
</style>
