<template>
    <div>
        <el-dialog
            :title="dialogTitle"
            :visible="postLog"
            :close-on-click-modal="false"
            :before-close="onClose"
            width="30%">
            <el-form :model="dataForm" :show-message="true" :rules="rules" ref="dataForm" label-width="100px">
                <el-form-item label="名称" prop="name">
                    <el-input v-model="dataForm.name" placeholder="请输入名称"></el-input>
                </el-form-item>
                <el-form-item label="编码" prop="code">
                    <el-input v-model="dataForm.code" placeholder="请输入编码" onkeyup="value=value.replace(/[\u4e00-\u9fa5]/ig,'')"></el-input>
                </el-form-item>
                <el-form-item label="岗位分类" prop="typeId">
                    <el-select v-model="dataForm.typeId" filterable placeholder="请选择岗位分类">
                        <el-option
                            v-for="item in PostTypeList"
                            :key="item.id"
                            :label="item.name"
                            :value="item.id">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="描述" prop="remark">
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
    import {validateNull} from '@/utils/validator';
    import { postDetail, postSave } from '../../../../api/haijia/basicData'
    import { postTypeList } from '../../../../api/haijia/public'

    export default {
        name: 'post-dialog',
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
                postLog: false,
                disable: false,
                typeId: null,
                PostTypeList: [],
                dataForm: {
                    id: '',
                    name: '',
                    code: '',
                    typeId: '',
                    typeName: '',
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
                    ],
                }
            }
        },
        watch: {
            showDlog (newVal) {
                this.postLog = newVal
                if (newVal) {
                    this.getPostTypeList();
                    if (this.dialogTitle == '编辑') {
                        this.dataForm.id = this.logId
                      postDetail({id: this.logId}).then(res => {
                            if (res.data.status === 200) {
                                console.log('返回值', res.data.res)
                                this.dataForm = res.data.res;
                            }
                        })
                    } else if (this.dialogTitle == '新增') {
                        this.dataForm.id = ''
                    }
                }
            }
        },
        methods: {
            //获取岗位分类数据
            getPostTypeList () {
              postTypeList({"category": "post_type"}).then(res => {
                    if (res.data.status === 200) {
                        this.PostTypeList = res.data.res
                    }
                })
            },
            //提交
            onDefinite () {
                this.$refs.dataForm.validate((valid) => {
                    if (valid) {
                        postSave({
                            id: this.dataForm.id,
                            name: this.dataForm.name,
                            code: this.dataForm.code,
                            typeId: this.PostTypeList.find(x => x.id === this.dataForm.typeId).id,
                            typeName: this.PostTypeList.find(x => x.id === this.dataForm.typeId).name,
                            remark: this.dataForm.remark
                        }).then(res => {
                            if (res.data.status === 200) {
                                this.$message({
                                    message: res.data.message,
                                    type: 'success'
                                })
                                this.resetForm()
                                this.$emit('onPostLog', 'showDlog', true)
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
                this.$refs.dataForm.resetFields();
                this.typeId = null;
            },
            //取消
            onClose () {
                this.resetForm()
                this.$emit('onPostLog', 'showDlog', false)
            }
        }
    }
</script>

<style scoped>

</style>
