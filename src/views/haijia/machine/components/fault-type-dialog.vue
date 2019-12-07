<template>
    <el-dialog :title="dialogTitle" :visible="showModal" :before-close="onClose" :close-on-click-modal="false"
               width="30%">
        <el-form :show-message="true" :model="dataForm" :rules="rules" ref="dataForm" label-width="110px">
            <el-form-item label="故障名称" prop="name">
                <el-input v-model="dataForm.name" placeholder="请输入故障名称"></el-input>
            </el-form-item>
            <el-row>
                <el-col :span="12">
                    <el-form-item label="故障大类" prop="typeId">
                        <el-select v-model="dataForm.typeId" placeholder="请选择故障大类">
                            <el-option
                                v-for="item in faultTypeList"
                                :key="item.id"
                                :label="item.name"
                                :value="item.id">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="维修难度" prop="degreeId">
                        <el-select v-model="dataForm.degreeId" placeholder="请选择维修难度">
                            <el-option
                                v-for="item in degreeTypeList"
                                :key="item.id"
                                :label="item.name"
                                :value="item.id">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-form-item label="预计工时(时)" prop="estimateTime">
                <el-input-number v-model="dataForm.estimateTime" placeholder="请输入预计工时" controls-position="right" :min="0"
                          oninput="value=value.replace(/[^\d.]/g,'')"></el-input-number>
            </el-form-item>
            <el-form-item label="描述" prop="remark">
                <el-input type="textarea" :rows=" 2" v-model="dataForm.remark" placeholder="请输入内容"></el-input>
            </el-form-item>
        </el-form>
        <div slot="footer">
            <el-button @click="onClose">取消</el-button>
            <el-button type="primary" @click="onDefinite">提交</el-button>
        </div>
    </el-dialog>
</template>

<script>
    import {validateNull} from '@/utils/validator'
    // import {moduleAxios} from '@/api/haijia/machine'
    // import {publicAxios} from '@/api/haijia/public'
    import { degreeTypeList, faultTypeList } from '../../../../api/haijia/public'
    import { faultDetail, faultSave } from '../../../../api/haijia/machine'

    export default {
        name: 'fault-type-dilog',
        props: {
            showDlog: {
                type: Boolean,
                default: false,
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
                showModal: false,
                faultTypeList: [],
                degreeTypeList: [],
                dataForm: {
                    name: '',
                    typeId: '',
                    typeName:'',
                    degreeId: '',
                    degreeName:'',
                    estimateTime: null,
                    remark: ''
                },
                rules: {
                    name: [
                        {required: true, validator: validateNull, trigger: 'change'}
                    ],
                    typeId: [
                        {required: true, validator: validateNull, trigger: 'change'}
                    ],
                    degreeId: [
                        {required: true, validator: validateNull, trigger: 'change'}
                    ],
                    estimateTime: [
                        {required: true, validator: validateNull, trigger: 'change'}
                    ]
                }
            }
        },
        methods: {
            //获取故障大类数据
            getFaultTypeList () {
              faultTypeList({"category": "fault_class"}).then(res => {
                    if (res.data.status === 200) {
                        this.faultTypeList = res.data.res
                    }
                })
            },
            //获取维修等级数据
            getDegreeTypeList () {
                degreeTypeList({"category": "repair_grade"}).then(res => {
                    if (res.data.status === 200) {
                        this.degreeTypeList = res.data.res
                    }
                })
            },
            //提交
            onDefinite () {
                this.$refs.dataForm.validate((valid) => {
                    if (valid) {
                        faultSave({
                            id: this.dataForm.id,
                            name: this.dataForm.name,
                            typeId: this.faultTypeList.find(x => x.id === this.dataForm.typeId).id,
                            typeName: this.faultTypeList.find(x => x.id === this.dataForm.typeId).name,
                            degreeId:  this.degreeTypeList.find(x => x.id === this.dataForm.degreeId).id,
                            degreeName: this.degreeTypeList.find(x => x.id === this.dataForm.degreeId).name,
                            estimateTime: this.dataForm.estimateTime,
                            remark: this.dataForm.remark
                        }).then(res => {
                            if (res.data.status === 200) {
                                this.$message({
                                    message: res.data.message,
                                    type: 'success'
                                })
                                this.resetForm()
                                this.$emit('onFaultTypeLog', 'showDlog', true)
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
            resetForm () {
                this.$refs.dataForm.resetFields();
                this.dataForm.estimateTime=null;
            },
            onClose () {
                this.resetForm()
                this.$emit('onFaultTypeLog', 'showDlog', false)
            }
        },
        watch: {
            showDlog (newVal) {
                this.showModal = newVal
                if (newVal) {
                    this.getFaultTypeList()
                    this.getDegreeTypeList()
                    if (this.dialogTitle == '编辑') {
                        this.dataForm.id = this.logId
                        faultDetail({id: this.logId}).then(res => {
                            if (res.data.status === 200) {
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

</style>
