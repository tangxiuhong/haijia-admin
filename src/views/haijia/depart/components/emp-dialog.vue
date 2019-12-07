<template>
  <div>
    <el-dialog
      :title="dialogTitle"
      :visible="showModal"
      :before-close="onClose"
      width="700px"
      :close-on-click-modal="false"
    >
      <el-form
        ref="dataForm"
        :model="dataForm"
        :rules="rules"
        :show-message="true"
        label-width="80px"
        class="form-width-95"
      >
        <el-row>
          <el-col :span="12">
            <el-form-item label="姓名" prop="name">
              <el-input v-model="dataForm.name" placeholder="请输入姓名"/>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="编码" prop="code">
              <el-input
                v-model="dataForm.code"
                placeholder="请输入编码"
                onkeyup="value=value.replace(/[\u4e00-\u9fa5]/ig,'')"
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="用户名" prop="userName">
              <el-input
                v-model="dataForm.userName"
                placeholder="请输入用户名"
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="密码" prop="password">
              <el-input
                type="password"
                v-model="dataForm.password"
                placeholder="请输入密码"
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="身份证号" prop="idNum">
              <el-input
                v-model="dataForm.idNum"
                placeholder="请输入身份证号"
                maxlength="18"
                onkeyup="value=value.replace(/[\u4e00-\u9fa5]/ig,'')"
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="电话" prop="mobile">
              <el-input v-model="dataForm.mobile" placeholder="请输入电话" maxlength="11"/>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="性别" prop="gender">
              <el-radio-group v-model="dataForm.gender">
                <el-radio :label="0">女</el-radio>
                <el-radio :label="1">男</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="出生日期" prop="birthday">
              <el-date-picker
                value-format="yyyy-MM-dd"
                v-model="dataForm.birthday"
                type="date"
                class="input-style"
                placeholder="请选择日期"
              />
              <!-- https://element.eleme.cn/#/zh-CN/component/date-picker#ri-qi-ge-shi(年月日)-->
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="直接上级" prop="leaderId">
              <el-select clearable v-model="dataForm.leaderId" filterable placeholder="请选择上级姓名" class="input-width-100">
                <el-option
                  v-for="item in tableData"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="岗位" prop="postId">
              <el-select v-model="dataForm.postId" placeholder="请选择岗位" class="input-style">
                <el-option
                  v-for="item in postList"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="所属部门" prop="deptId">
              <el-cascader
                placeholder="请选择所属部门"
                v-model="dataForm.deptId"
                class="input-width-100"
                :options="deptList"
                :props="props"
                @change="onDepart"
              />
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="描述" prop="remark">
              <el-input
                v-model="dataForm.remark"
                type="textarea"
                :row="2"
                placeholder="请输入内容"
                class="input-style"
              />
            </el-form-item>
          </el-col>
          <div class="myImgUpload">
            <span class="wen-zi-style">头像</span>
            <div class="uploadImg">
              <el-upload
                class="upload-demo"
                ref="upload"
                :limit="1"
                list-type="picture-card"
                action="http://47.99.212.180:8085/frame/image/upload"
                :headers="token"
                :on-preview="handlePreview"
                :on-remove="handleRemove"
                :file-list="fileList"
                :multiple="false"
                :on-exceed="handleExceed"
                :on-success="successImg"
                :auto-upload="true">
                <i class="el-icon-plus"></i>
              </el-upload>
            </div>
          </div>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="onClose">取 消</el-button>
        <el-button type="primary" :disabled="disabled" @click="onDefinite">提 交</el-button>
      </div>
    </el-dialog>
    <el-dialog title="图片预览" :visible.sync="dialogVisible">
      <img width="100%" :src="dialogImageUrl" alt="">
    </el-dialog>
  </div>
</template>

<script>
    import {validateNull, validateIdNo, validatePhone, validatePassword} from '@/utils/validator'
    import {deptList, empDetailWrap, empSaveWrap, empPostList} from '@/api/haijia/depart'
    import {getToken} from "@/utils/auth";

    export default {
        name: 'EmpDlog',
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
            tableData: {
                type: Array,
                default: []
            }
        },
        data() {
            return {
                disabled: false,
                showModal: false,
                dialogVisible: false,
                dialogImageUrl: '',
                deptList: [],
                userList: [],
                dataForm: {
                    name: '',
                    code: '',
                    idNum: '',
                    mobile: '',
                    gender: 1,
                    birthday: '',
                    leaderId: '',
                    deptId: '',
                    deptName: '',
                    userId: '',
                    remark: '',
                    postId: '',
                    imageIds: '',
                    imageList: ''
                },
                token: {
                    'auth-token': getToken()
                },
                deleteImg: [],
                imgArr: [],
                fileList: [],

                deptId: '',
                deptName: '',
                leaderName: '',
                props: {
                    expandTrigger: 'hover',
                    checkStrictly: true,
                    label: 'name',
                    value: 'id',
                    children: 'children'
                },
                rules: {
                    name: [
                        {required: true, validator: validateNull, trigger: 'blur'}
                    ],
                    code: [
                        {required: true, validator: validateNull, trigger: 'blur'}
                    ],
                    userName: [
                        {required: true, validator: validateNull, trigger: 'blur'}
                    ],
                    password: [
                        {required: true, validator: validatePassword, trigger: 'change'}
                    ],
                    idNum: [
                        {required: true, validator: validateIdNo, trigger: 'change'}
                    ],
                    mobile: [
                        {required: true, validator: validatePhone, trigger: 'change'}
                    ],
                    gender: [
                        {required: true, validator: validateNull, trigger: 'blur'}
                    ],
                    deptId: [
                        {required: true, validator: validateNull, trigger: 'change'}
                    ],
                    postId: [
                        {required: true, validator: validateNull, trigger: 'change'}
                    ]
                },
                postList: ''
            }
        },
        watch: {
            showDlog(newVal) {
                this.showModal = newVal
                if (newVal) {
                    // 获取部门数据
                    this.getDepart()
                    // 获取岗位数据
                    this.getPostList()
                    this.imgArr = [];
                    this.fileList = [];
                    // eslint-disable-next-line eqeqeq
                    if (this.dialogTitle == '编辑') {
                        this.dataForm.id = this.logId
                        empDetailWrap({id: this.logId}).then(res => {
                            if (res.data.status === 200) {
                                this.dataForm = res.data.res
                                this.deptId = res.data.res.deptId
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
                        // eslint-disable-next-line eqeqeq
                    } else if (this.dialogTitle == '新增') {
                        this.dataForm.id = ''
                    }
                }
            }
        },
        methods: {
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
            handleExceed(){
                this.$message.warning(`当前限制只能上传 1 张头像！`);
            },
            onDepart() {
                const deptIdNum = this.dataForm.deptId.length
                this.deptId = this.dataForm.deptId[deptIdNum - 1]
            },
            // 获取部门数据
            getDepart() {
                deptList().then(res => {
                    if (res.data.status === 200) {
                        const list = res.data.res
                        const showList = list.filter(item => item.state == 1)
                        this.deptName = res.data.res
                        const treeList = []
                        generateTreeList(showList, 0, treeList)
                        this.deptList = treeList
                        getTreeData(treeList)
                    }
                })

                function generateTreeList(src, node, target) {
                    const childern = src.filter((item) => {
                        return item.parentId === node
                    })
                    if (childern.length > 0) {
                        childern.forEach((item) => {
                            item.children = []
                            target.push(item)
                            generateTreeList(src, item.id, item.children)
                        })
                    }
                }

                // 将最后一级children为空的数组设为undefined
                function getTreeData(data) {
                    for (var i = 0; i < data.length; i++) {
                        if (data[i].children.length < 1) {
                            // children若为空数组，则将children设为undefined
                            data[i].children = undefined
                        } else {
                            // children若不为空数组，则继续 递归调用 本方法
                            getTreeData(data[i].children)
                        }
                    }
                    return data
                }
            },
            // 获取用户数据
            getUerList() {

            },
            // 获取岗位数据
            getPostList() {
                empPostList().then(res => {
                    if (res.data.status === 200) {
                        this.postList = res.data.res
                    }
                })
            },
            // 提交
            onDefinite() {
                this.$refs.dataForm.validate((valid) => {
                    if (valid) {
                        if (this.dataForm.leaderId) {
                            this.leaderName = this.tableData.find(x => x.id === this.dataForm.leaderId).name
                        } else {
                            this.dataForm.leaderId = null
                            this.leaderName = null
                        }
                        empSaveWrap({
                            id: this.dataForm.id,
                            name: this.dataForm.name,
                            userName: this.dataForm.userName,
                            password: this.dataForm.password,
                            code: this.dataForm.code,
                            idNum: this.dataForm.idNum,
                            mobile: this.dataForm.mobile,
                            gender: this.dataForm.gender,
                            birthday: this.dataForm.birthday,
                            leaderId: this.dataForm.leaderId,
                            leaderName: this.leaderName,
                            deptId: this.deptId,
                            deptName: this.deptName.find(x => x.id === this.deptId).name,
                            postId: this.dataForm.postId,
                            postName: this.postList.find(x => x.id === this.dataForm.postId).name,
                            remark: this.dataForm.remark,
                            imageIds: this.imgArr,
                        }).then(res => {
                            if (res.data.status === 200) {
                                this.$message({
                                    message: res.data.message,
                                    type: 'success'
                                })
                                this.resetForm()
                                this.$emit('onEmpLog', 'showDlog', true)
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
            // 重置
            resetForm() {
                this.$refs.dataForm.resetFields()
                this.dataForm.gender = 1
                this.dataForm.deptId = ''
                this.dataForm.userId = ''
                this.fileList = []
            },
            onClose() {
                this.resetForm()
                this.$emit('onEmpLog', 'showDlog', false)
            }
        }
    }
</script>

<style scoped>
  .myImgUpload {
    width: 100%;
    overflow: hidden;
  }

  .input-style {
    width: 100%
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
