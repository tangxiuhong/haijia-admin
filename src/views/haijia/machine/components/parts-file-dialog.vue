<template>
  <div>
    <el-dialog :title="dialogTitle" :visible="showModal" width="35%" :close-on-click-modal="false"
               :before-close="onClose">
      <el-form :show-message="true" :model="partsFileForm" :rules="rules" ref="partsFileForm" label-width="80px">
        <el-row>
          <el-col :span="12">
            <el-form-item label="配件名称" prop="name">
              <el-input v-model="partsFileForm.name" placeholder="请输入分类名称"/>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="配件编码" prop="code">
              <el-input v-model="partsFileForm.code" placeholder="请输入分类编码"
                        onkeyup="value=value.replace(/[\u4e00-\u9fa5]/ig,'')"/>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="配件分类" prop="categoryId">
              <el-select v-model="partsFileForm.categoryId" placeholder="请选择配件分类" style="width:100%">
                <el-option v-for="item in categoryList" :key="item.id" :label="item.name"
                           :value="item.id"/>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="计量单位" prop="unitId">
              <el-select v-model="partsFileForm.unitId" placeholder="请选择计量单位" style="width:100%">
                <el-option v-for="item in unitList" :key="item.id" :label="item.name"
                           :value="item.id"/>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="规格" prop="spec">
              <el-input v-model="partsFileForm.spec" placeholder="请输入规格"/>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="条码" prop="barCode">
              <el-input v-model="partsFileForm.barCode" placeholder="请输入条码"/>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="单价" prop="price">
              <el-input-number v-model="partsFileForm.price" placeholder="请输入单价" controls-position="right"
                               :min="0" :step="0.01"/>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="描述" prop="remark">
              <el-input v-model="partsFileForm.remark" type="textarea" :rows="2"
                        placeholder="请输入内容"/>
            </el-form-item>
          </el-col>
          <div class="myImgUpload">
            <span class="wen-zi-style">图片</span>
            <div class="uploadImg">
              <el-upload
                class="upload-demo"
                ref="upload"
                list-type="picture-card"
                action="http://47.99.212.180:8085/frame/image/upload"
                :headers="token"
                :on-preview="handlePreview"
                :on-remove="handleRemove"
                :file-list="fileList"
                :multiple="true"
                :on-success="successImg"
                :auto-upload="true">
                <i class="el-icon-plus"></i>
              </el-upload>
            </div>
          </div>
        </el-row>
      </el-form>
      <div slot="footer">
        <el-button @click="onClose">取消</el-button>
        <el-button type="primary" @click="onDefinite">提交</el-button>
      </div>
    </el-dialog>
    <el-dialog title="图片预览" :visible.sync="dialogVisible">
      <img width="100%" :src="dialogImageUrl" alt="">
    </el-dialog>
  </div>
</template>

<script>
    import {validateNull} from '@/utils/validator'
    import addAndDel from '@/views/mixin/addAndDel.js'
    import {getToken} from "@/utils/auth";
    import {unitList} from '@/api/haijia/basicData'
    import {partsCategoryList, partsDetailWrap, partsSaveWrap} from '@/api/haijia/machine'

    export default {
        name: 'PartsFileDialog',
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
            },
            mixins: [addAndDel]
        },
        data() {
            return {
                headers: {},
                showModal: false,
                disabled: false,
                dialogVisible: false,
                dialogImageUrl: '',
                unitList: [
                    {id: null, absUrl: ''}
                ],
                categoryList: [],
                unitId: '',
                partsFileForm: {
                    id: '',
                    name: '',
                    code: '',
                    categoryId: '',
                    categoryCode: '',
                    categoryName: '',
                    unitId: '',
                    unitName: '',
                    spec: '',
                    barCode: '',
                    price: '',
                    remark: '',
                    imageIds: '',
                    imageList: ''
                },
                token: {
                    'auth-token': getToken()
                },
                deleteImg: [],
                imgArr: [],
                fileList: [],
                rules: {
                    name: [
                        {required: true, validator: validateNull, trigger: 'change'}
                    ],
                    code: [
                        {required: true, validator: validateNull, trigger: 'change'}
                    ],
                    categoryId: [
                        {required: true, validator: validateNull, trigger: 'change'}
                    ],
                    unitId: [
                        {required: true, validator: validateNull, trigger: 'change'}
                    ],
                    spec: [
                        {required: true, validator: validateNull, trigger: 'change'}
                    ],
                    price: [
                        {required: true, validator: validateNull, trigger: 'change'}
                    ]
                }
            }
        },
        mounted() {

        },
        methods: {
            // 获取配件分类的是数据
            getPartsCategoryList() {
                partsCategoryList().then(res => {
                    if (res.data.status === 200) {
                        this.categoryList = res.data.res
                    }
                })
            },
            // 获取计量单位的数据
            getUnitList() {
                unitList().then(res => {
                    if (res.data.status === 200) {
                        this.unitList = res.data.res
                    }
                })
            },
            // 重置
            resetForm() {
                this.$refs.partsFileForm.resetFields()
                this.partsFileForm.categoryId = ''
                this.partsFileForm.unitId = ''
                this.fileList = []
            },
            // 取消
            onClose() {
                this.resetForm()
                this.$emit('onPartsFileLog', 'showDlog', true)
            },
            // 图片删除
            handleRemove(file, fileList) {
                if (file.response) {
                    this.deleteImg = file.response.res.id
                } else {
                    this.deleteImg = file.name
                }
                for (let i = 0; i < this.imgArr.length; i++) {
                    if (this.imgArr[i] === this.deleteImg) {
                        this.imgArr.splice(i, 1)
                    }
                }
            },
            // 图片预览
            handlePreview(file) {
                this.dialogImageUrl = file.url;
                this.dialogVisible = true;
            },
            // 图片上传
            successImg(res, res2, res3) {
                this.imgArr = res3.map(item => {
                    if (item.response) {
                        return item.response.res.id
                    } else {
                        return item.name
                    }
                })
            },
            // 提交
            onDefinite() {
                this.$refs.partsFileForm.validate((valid) => {
                    if (valid) {
                        const price = (Math.round(this.partsFileForm.price * 100) / 100).toFixed(2)
                        partsSaveWrap({
                            id: this.partsFileForm.id,
                            name: this.partsFileForm.name,
                            code: this.partsFileForm.code,
                            categoryId: this.categoryList.find(y => y.id === this.partsFileForm.categoryId).id,
                            categoryCode: this.categoryList.find(y => y.id === this.partsFileForm.categoryId).code,
                            categoryName: this.categoryList.find(y => y.id === this.partsFileForm.categoryId).name,
                            unitId: this.unitList.find(y => y.id === this.partsFileForm.unitId).id,
                            unitName: this.unitList.find(y => y.id === this.partsFileForm.unitId).name,
                            barCode: this.partsFileForm.barCode,
                            spec: this.partsFileForm.spec,
                            price: price,
                            remark: this.partsFileForm.remark,
                            imageIds: this.imgArr,
                        }).then(res => {
                            if (res.data.status === 200) {
                                this.$message({
                                    message: res.data.message,
                                    type: 'success'
                                })
                                this.resetForm()
                                this.$emit('onPartsFileLog', 'showDlog', true)
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
            }
        },
        watch: {
            showDlog(newVal) {
                this.showModal = newVal
                this.getUnitList()
                this.getPartsCategoryList()
                if (newVal) {
                    this.imgArr = [];
                    this.fileList = [];
                    if (this.dialogTitle == '编辑') {
                        this.partsFileForm.id = this.logId
                        partsDetailWrap({id: this.logId}).then(res => {
                            if (res.data.status === 200) {
                                this.partsFileForm = res.data.res
                                // 图片上传
                                res.data.res.imageList.forEach((item, index) => {
                                    const arr = {
                                        name: item.id,
                                        url: item.absUrl
                                    }
                                    this.fileList.push(arr)
                                    this.imgArr.push(item.id)
                                })
                            }
                        })
                    } else if (this.dialogTitle == '新增') {
                        this.partsFileForm.id = ''
                    }
                }
            }
        }
    }
</script>

<style scoped>
  .myImgUpload {
    width: 100%;
    overflow: hidden;
  }

  .wen-zi-style {
    float: left;
    width: 80px;
    padding-right: 12px;
    text-align: right;
    font-size: 14px;
    font-weight: bold;
    color: #606266;
    font-family: Helvetica Neue, Helvetica, PingFang SC, Hiragino Sans GB, Microsoft YaHei, Arial, sans-serif;
  }

  .uploadImg {
    float: left;
  }
</style>
