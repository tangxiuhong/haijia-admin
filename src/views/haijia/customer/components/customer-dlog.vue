<template>
  <el-dialog
    :title="dialogTitle"
    :visible="showModal"
    width="40%"
    :before-close="onClose"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
  >
    <div class="form-width-95">
      <el-form :show-message="true" :model="ruleForm" ref="ruleForm" :rules="rules" label-width="90px"
               class="demo-ruleForm">
        <el-row>
          <el-col>
            <el-form-item label="名称" prop="name">
              <el-input v-model="ruleForm.name" placeholder="请输入名称"/>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="编码" prop="code">
              <el-input v-model="ruleForm.code" placeholder="请输入编码"/>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="客户分类" prop="typeId">
              <el-select v-model="ruleForm.typeId" filterable placeholder="请选择客户分类">
                <el-option
                  v-for="item in typeId"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="地区" prop="countryName">
              <div class="areaBox">
                <div class="area">
                  <el-select v-model="ruleForm.countryName" filterable placeholder="省"
                             @change="onCountry">
                    <el-option
                      v-for="item in countryName"
                      :key="item.id"
                      :label="item.name"
                      :value="item.id">
                    </el-option>
                  </el-select>
                </div>
                <div class="area">
                  <el-select v-model="ruleForm.provinceName" filterable placeholder="市" @change="onProvince">
                    <el-option
                      v-for="item in provinceName"
                      :key="item.id"
                      :label="item.name"
                      :value="item.id">
                    </el-option>
                  </el-select>
                </div>
                <div class="area">
                  <el-select v-model="ruleForm.cityName" filterable placeholder="区/县" @change="onCity">
                    <el-option
                      v-for="item in cityName"
                      :key="item.id"
                      :label="item.name"
                      :value="item.id">
                    </el-option>
                  </el-select>
                </div>
              </div>
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item label="详细地址" prop="address">
          <el-input type="textarea" v-model.number="ruleForm.address" placeholder="请输入详细地址"/>
        </el-form-item>
        <el-row v-for="(contact, index) in ruleForm.customerContactList" :key="contact.id">
          <el-col :span="10">
            <el-form-item
              :label="'联系人' + (index+1)"
              :prop="'customerContactList.'+index+'.name'"
              :rules="rules.addName"
            >
              <el-input v-model="contact.name" style="width: 98%;" placeholder="联系人姓名"/>
            </el-form-item>
          </el-col>
          <el-col :span="11">
            <el-form-item
              label-width="60px"
              :label="'电话' + (index+1)"
              :prop="'customerContactList.'+index+'.mobile'"
              :rules="rules.mobile"
            >
              <el-input v-model="contact.mobile" style="width: 98%;" maxlength="11"
                        placeholder="联系人电话"/>
            </el-form-item>
          </el-col>
          <el-col :span="3">
            <el-button @click.prevent="onRemoveTel(contact)">删除</el-button>
          </el-col>
        </el-row>
        <el-form-item>
          <el-button @click="onAddTel" type="success">新增</el-button>
        </el-form-item>

      </el-form>
    </div>
    <div slot="footer" class="dialog-footer">
      <el-button @click="onClose">取 消</el-button>
      <el-button type="primary" @click="onDefinite" :disabled="disabled">提 交</el-button>
    </div>
  </el-dialog>
</template>

<script>
    import {validateNull, validatePhoneTwo} from "@/utils/validator";
    // import {moduleAxios} from "@/api/haijia/customer.js"
    import { customerArea, customerDetail, customerSave, customerType } from '../../../../api/haijia/customer'

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
            logId: {
                type: Number,
                default: null
            }
        },
        data() {
            return {
                disabled: false,
                showModal: false,
                ruleForm: {
                    id: '',
                    name: '',
                    code: '',
                    customerContactList: [
                        {name: '', mobile: '', createTime: ''}
                    ],
                    typeId: '',
                    typeName: '',
                    provinceName: '',
                    countryName: '',
                    cityName: '',
                    address: ''
                },
                rules: {
                    name: [
                        {required: true, validator: validateNull, trigger: 'blur'}
                    ],
                    code: [
                        {required: true, validator: validateNull, trigger: 'blur'}
                    ],
                    typeId: [
                        {required: true, validator: validateNull, trigger: 'blur'}
                    ],
                    provinceName: [
                        {required: true, validator: validateNull, trigger: 'change'}
                    ],
                    cityName: [
                        {required: true, validator: validateNull, trigger: 'change'}
                    ],
                    countryName: [
                        {required: true, validator: validateNull, trigger: 'change'}
                    ],
                    address: [
                        {required: true, validator: validateNull, trigger: 'change'}
                    ],
                    addName: [
                        {required: true, validator: validateNull, trigger: 'blur'}
                    ],
                    mobile: [
                        {required: true, validator: validatePhoneTwo, trigger: ['blur', 'change']}
                    ]
                },
                typeId: null,
                provinceName: null,
                cityName: null,
                countryName: null,
                areaID: null,
                countryId: null,
                disCity: false,
                disCounty: false,
            }
        },

        methods: {
            // 删除联系人
            onRemoveTel(item) {
                const index = this.ruleForm.customerContactList.indexOf(item)
                if (this.ruleForm.customerContactList.length < 2) {
                    this.$message({
                        type: 'warning',
                        message: '至少保留一位联系人！'
                    })
                } else {
                    if (index !== -1) {
                        this.ruleForm.customerContactList.splice(index, 1)
                    }
                }

            },
            // 新增联系人
            onAddTel() {
                this.ruleForm.customerContactList.push({
                    name: '',
                    mobile: '',
                    key: Date.now(),
                    createTime: Date.now()
                })
            },
            onDefinite() {
                this.$refs.ruleForm.validate((valid) => {
                    if (valid) {
                        customerSave({
                            id: this.logId,
                            name: this.ruleForm.name,
                            code: this.ruleForm.code,
                            customerContactList: this.ruleForm.customerContactList,
                            typeId: this.ruleForm.typeId,
                            typeName: this.typeId.find(x => x.id === this.ruleForm.typeId).name,
                            provinceName: this.ruleForm.provinceName,
                            countryName: this.ruleForm.countryName,
                            cityName: this.ruleForm.cityName,
                            countryId: this.countryId,
                            areaId: this.areaID,
                            address: this.ruleForm.address
                        }).then(res => {
                            if (res.data.status == 200) {
                                this.$message({
                                    type: 'success',
                                    message: res.data.message
                                })
                                this.resetForm(true);
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
            resetForm(fun) {
                this.$refs.ruleForm.resetFields();
                this.$emit('onMachineDlog', 'showDlog', fun)
                this.ruleForm.typeId = '';
                this.ruleForm.provinceName = '';
                this.ruleForm.cityName = '';
                this.ruleForm.customerContactList = [
                    {name: '', mobile: '', createTime: ''}
                ];
            },
            onClose() {
                this.resetForm(false)
            },
            // 省
            getCountry(countryName) {
                return customerArea({parentId: 0}).then(res => {
                    if (res.data.status == 200) {
                        this.countryName = res.data.res
                        if (countryName) {
                            this.ruleForm.countryName = res.data.res[0].name
                            const initAreaId = res.data.res[0].id
                            this.getProvince(initAreaId)
                        }
                    }
                })
            },
            onCountry(id) {
                this.countryName.forEach((item, index) => {
                    if (id === item.id) {
                        this.ruleForm.countryName = this.countryName[index].name
                    }
                })
                this.cityName = '';
                if (id) {
                    this.getProvince(id)
                }
                this.ruleForm.cityName = '';
                this.ruleForm.provinceName = '';
            },
            // 市
            getProvince(id) {

                // this.areaID = id;
                this.countryId = id;
                return customerArea({parentId: id}).then(res => {
                    if (res.data.status === 200) {
                        this.provinceName = res.data.res
                        const initAreaId = res.data.res[0].id
                        this.getCity(initAreaId)
                        if (this.dialogTitle == '新增') {
                            this.ruleForm.provinceName = this.provinceName[0].name
                        }
                    }
                })
            },
            onProvince(id) {
                this.ruleForm.cityName = '';
                this.provinceName.forEach((item, index) => {
                    if (id === item.id) {
                        this.ruleForm.provinceName = this.provinceName[index].name
                    }
                })
                if (id) {
                    this.getCity(id)
                }
            },
            // 区/县
            getCity(id) {
                this.areaID = id;
                return customerArea({parentId: id}).then(res => {
                    if (res.data.status == 200) {
                        this.rules.cityName = [
                            {required: false, validator: validateNull, trigger: 'change'}
                        ]
                        this.cityName = res.data.res
                        // eslint-disable-next-line eqeqeq
                        if (this.dialogTitle == '新增') {
                            this.ruleForm.cityName = this.cityName[0].name
                        }
                    }
                })
            },
            onCity(id) {
                this.cityName.forEach((item, index) => {
                    if (id === item.id) {
                        this.ruleForm.cityName = this.cityName[index].name
                    }
                })
            },
            // 客户分类
            getTypeName() {
                customerType().then(res => {
                    if (res.data.status == 200) {
                        this.typeId = res.data.res
                    }
                })
            }
        },
        watch: {
            showDlog(newVal) {
                this.showModal = newVal;
                if (newVal) {
                    if (this.dialogTitle == "新增") {
                        // 省市区调用
                        this.getCountry(true)
                        // this.ruleForm.provinceName = this.provinceName[0].name
                        // this.ruleForm.cityName = this.cityName[0].name
                        // 客户分类调用
                        this.getTypeName()

                    } else if (this.dialogTitle == "编辑") {
                        customerDetail({id: this.logId}).then(res => {
                            if (res.data.status == 200) {
                                this.ruleForm = res.data.res
                                // 省市区调用
                                this.getCountry(false)
                                this.getProvince(res.data.res.countryId)
                                this.getCity(res.data.res.areaId)
                                // 客户分类调用
                                this.getTypeName()
                            }
                        })
                    }

                }
            }
        }
    }
</script>

<style scoped>
  .areaBox {
    width: 100%;
    display: flex;
  }

  .area {
    flex: 1;
    margin-right: 10px;
  }

  .area:last-child {
    margin-right: 0px;
  }

  .fixedContact {
    display: flex;
  }

  .addContact {
    flex: 1;
  }
</style>
