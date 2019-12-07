<template>
    <div>
        <el-dialog
            :title="dialogTitle"
            :visible="partsSortLog"
            :close-on-click-modal="false"
            :before-close="onClose"
            width="30%">
            <el-form :model="partsSortForm" :show-message="true" :rules="rules" ref="partsSortForm"
                     label-width="100px">
                <el-form-item label="分类名称" prop="name">
                    <el-input v-model="partsSortForm.name" placeholder="请输入名称"></el-input>
                </el-form-item>
                <el-form-item label="分类编码" prop="code">
                    <el-input v-model="partsSortForm.code" placeholder="请输入编码" onkeyup="value=value.replace(/[\u4e00-\u9fa5]/ig,'')"></el-input>
                </el-form-item>
                <el-form-item label="上级分类" prop="typeId">
                    <el-select v-model="partsSortForm.typeId" placeholder="请选择上级分类">
                        <el-option
                            v-for="item in degreeFatherList"
                            :key="item.id"
                            :label="item.name"
                            :value="item.id">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="描述" prop="remark">
                    <el-input v-model="partsSortForm.remark" type="textarea" :rows="2" placeholder="请输入内容"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer">
          <el-button @click="onClose">取消</el-button>
          <el-button type="primary" @click="onDefinite" :disable="disable">提交</el-button>
        </span>
        </el-dialog>

    </div>
</template>

<script>
    import { validateNull } from '../../../../utils/validator'
    import { partsCategoryDetail, partsCategorySave } from '../../../../api/haijia/machine'
    import { degreeFatherList } from '../../../../api/haijia/public'
    export default {
        name: 'parts-sort-dialog',
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
        data () {
            return {
                partsSortLog: false,
                disable: false,
                degreeFatherList: [],
                partsSortForm: {
                    name: '',
                    code: '',
                    typeId: '',
                    remark: ''
                },
                rules: {
                    name: [
                        {required: true, validator: validateNull, trigger: 'change'}
                    ],
                    code: [
                        {required: true, validator: validateNull, trigger: 'change'}
                    ],
                    typeId: [
                        {required: true, validator: validateNull, trigger: 'change'}
                    ]
                }
            }
        },
        created () {
        },
        watch: {
            showDlog (newVal) {
                this.partsSortLog = newVal
                if(newVal){
                    this.getDegreeFatherList()
                    if (this.dialogTitle == '编辑') {
                        this.partsSortForm.id = this.logId
                       partsCategoryDetail({id: this.logId}).then(res => {
                            if (res.data.status === 200) {
                                this.partsSortForm = res.data.res
                            }
                        })
                    } else if (this.dialogTitle == '新增') {
                        this.partsSortForm.id = ''
                    }
                }
            }
        },
        methods: {
            //获取维修等级数据
            getDegreeFatherList () {
                degreeFatherList({"category": "parts_type"}).then(res => {
                    if (res.data.status === 200) {
                        this.degreeFatherList = res.data.res
                    }
                })
            },
            //提交
            onDefinite () {
                this.$refs.partsSortForm.validate((valid) => {
                    if (valid) {
                        partsCategorySave({
                            id: this.partsSortForm.id,
                            name: this.partsSortForm.name,
                            code: this.partsSortForm.code,
                            typeId: this.degreeFatherList.find(x=>x.id===this.partsSortForm.typeId).id,
                            typeName: this.degreeFatherList.find(x=>x.id===this.partsSortForm.typeId).name,
                            remark: this.partsSortForm.remark
                        }).then(res => {
                            if (res.data.status === 200) {
                                this.$message({
                                    message: res.data.message,
                                    type: 'success'
                                })
                                this.resetForm()
                                this.$emit('onPartsSortLog', 'showDlog', true)
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
            //重置
            resetForm () {
                this.$refs.partsSortForm.resetFields()
            },
            //取消
            onClose () {
                this.resetForm()
                this.$emit('onPartsSortLog', 'showDlog', false)
            }
        }
    }
</script>

<style scoped>

</style>
