<template>
  <el-dialog
    :title="dialogTitle"
    :visible="showModal"
    width="700"
    :before-close="onClose">
    <div>
      <el-steps :active="3" align-center v-if="showProgress">
        <el-step title="已签到" description="签到完毕！"/>
        <el-step title="已开工" description="正在加油干！"/>
        <el-step title="暂停施工" description="缺货状态，待补货"/>
        <el-step title="已完成" description="施工完成，待确认"/>
        <el-step title="已确认" description="已被确认无误"/>
      </el-steps>
      <el-tabs v-model="activeName" @tab-click="handleClick" :tab-position="tabPosition">
        <el-tab-pane label="派工" name="paigong">
          <div>
            <el-row>
              <el-col :span="12">
                <div class="flexBox">
                  <div class="flex-label">安装负责人：</div>
                  <div class="flex-content">张雨桐</div>
                </div>
              </el-col>
              <el-col :span="12">
                <div class="flexBox">
                  <div class="flex-label">协同人员：</div>
                  <div class="flex-content">张雨桐</div>
                </div>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <div class="flexBox">
                  <div class="flex-label">调试开始日期：</div>
                  <div class="flex-content">2019-07-14</div>
                </div>
              </el-col>
              <el-col :span="12">
                <div class="flexBox">
                  <div class="flex-label">调试结束日期：</div>
                  <div class="flex-content">2019-07-14</div>
                </div>
              </el-col>
            </el-row>
            <el-row>
              <el-col>
                <div class="flexBox">
                  <div class="flex-label">备注：</div>
                  <div class="flex-content">张雨桐</div>
                </div>
              </el-col>
            </el-row>
          </div>
        </el-tab-pane>
        <el-tab-pane label="报工" name="baogong">
          <div>
            <el-row>
              <el-col :span="12">
                <div class="flexBox">
                  <div class="flex-label">工单编号：</div>
                  <div class="flex-content">007746554</div>
                </div>
              </el-col>
              <el-col :span="12">
                <div class="flexBox">
                  <div class="flex-label">客户：</div>
                  <div class="flex-content">张雨桐</div>
                </div>
              </el-col>
              <el-col :span="12">
                <div class="flexBox">
                  <div class="flex-label">客户地址：</div>
                  <div class="flex-content">上海市浦东新区</div>
                </div>
              </el-col>
              <el-col :span="12">
                <div class="flexBox">
                  <div class="flex-label">联系人：</div>
                  <div class="flex-content">张雨桐</div>
                </div>
              </el-col>
              <el-col :span="12">
                <div class="flexBox">
                  <div class="flex-label">联系电话：</div>
                  <div class="flex-content">1546557546</div>
                </div>
              </el-col>
              <el-col :span="12">
                <div class="flexBox">
                  <div class="flex-label">设备机型：</div>
                  <div class="flex-content">B1-22147</div>
                </div>
              </el-col>
              <el-col :span="12">
                <div class="flexBox">
                  <div class="flex-label">调试台数：</div>
                  <div class="flex-content">2</div>
                </div>
              </el-col>
              <el-col :span="12">
                <div class="flexBox">
                  <div class="flex-label">车速（转）：</div>
                  <div class="flex-content">22147</div>
                </div>
              </el-col>
              <el-col :span="12">
                <div class="flexBox">
                  <div class="flex-label">门幅：</div>
                  <div class="flex-content">2</div>
                </div>
              </el-col>
              <el-col :span="12">
                <div class="flexBox">
                  <div class="flex-label">钢扣动程：</div>
                  <div class="flex-content">22147</div>
                </div>
              </el-col>
              <el-col :span="12">
                <div class="flexBox">
                  <div class="flex-label">水泵：</div>
                  <div class="flex-content">B0417</div>
                </div>
              </el-col>
              <el-col :span="12">
                <div class="flexBox">
                  <div class="flex-label">备注：</div>
                  <div class="flex-content">需要两台水泵</div>
                </div>
              </el-col>
              <el-col :span="12">
                <div class="flexBox">
                  <div class="flex-label">调试开始日期：</div>
                  <div class="flex-content">2019-07-14</div>
                </div>
              </el-col>
              <el-col :span="12">
                <div class="flexBox">
                  <div class="flex-label">调试结束日期：</div>
                  <div class="flex-content">2019-07-14</div>
                </div>
              </el-col>
            </el-row>
          </div>
        </el-tab-pane>
        <el-tab-pane label="签到" name="qiandao">
          <div>
            <el-row>
              <el-col :span="24">
                <div class="flexBox">
                  <div style="width: 100%;">
                    <el-carousel trigger="click" height="380px">
                      <el-carousel-item v-for="(item,index) in imgUrl" :key="index">
                        <img style="width: 100%;" :src="item.url"/>
                      </el-carousel-item>
                    </el-carousel>
                  </div>
                </div>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="8">
                <div class="flexBox">
                  <div class="flex-label">签到时间：</div>
                  <div class="flex-content">2019-11-12 15:33:02</div>
                </div>
              </el-col>
              <el-col :span="8">
                <div class="flexBox">
                  <div class="flex-label">签到地址：</div>
                  <div class="flex-content">御桥路BHC中环</div>
                </div>
              </el-col>
              <el-col :span="8">
                <div class="flexBox">
                  <div class="flex-label">系统时间：</div>
                  <div class="flex-content">2019-07-14 14:55:21</div>
                </div>
              </el-col>
            </el-row>
          </div>
        </el-tab-pane>
        <el-tab-pane label="评价" name="pingjia">
          <el-row>
            <el-col :span="12">
              <div class="flexBox">
                <div class="flex-label">安装进度：</div>
                <div class="flex-content">已完成</div>
              </div>
            </el-col>
            <el-col :span="12">
              <div class="flexBox">
                <div class="flex-label">服务态度：</div>
                <div class="flex-content">非常满意</div>
              </div>
            </el-col>
            <el-col :span="12">
              <div class="flexBox">
                <div class="flex-label">技术水平：</div>
                <div class="flex-content">非常满意</div>
              </div>
            </el-col>
            <el-col :span="12">
              <div class="flexBox">
                <div class="flex-label">及时性：</div>
                <div class="flex-content">非常满意</div>
              </div>
            </el-col>
            <el-col :span="24">
              <div class="flexBox">
                <div class="flex-label">客户意见：</div>
                <div class="flex-content">各方面都很满意！五星好评</div>
              </div>
            </el-col>
          </el-row>
        </el-tab-pane>
      </el-tabs>
    </div>
    <!--<div slot="footer" class="dialog-footer">-->
    <!--<el-button @click="onClose">取 消</el-button>-->
    <!--&lt;!&ndash;<el-button @click="resetForm">重置</el-button>&ndash;&gt;-->
    <!--<el-button type="primary" @click="onDefinite('ruleForm')" :disabled="disabled">提 交</el-button>-->
    <!--</div>-->
  </el-dialog>
</template>

<script>
    export default {
        name: "workOrder-dialog",
        props: {
            orderShowDlog: {
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
            showProgress: {
                type: Boolean,
                default: false
            }
        },
        data() {
            return {
                showModal: false,
                disabled: false,
                loading: false,
                tableData: [
                    {
                        code: 'A100054632456',
                        customerName: "王雨虹",
                        address: "上海市浦东新区御桥",
                        contactName: "牟时金",
                        contractId: "1024355465522",
                        machineModelName: "A1-004",
                        startTime: "2019-07-11",
                        endTime: "2019-07-11",
                        num: 24
                    },
                    {
                        code: 'A100054632456',
                        customerName: "黄祥",
                        address: "上海市浦东新区御桥",
                        contactName: "梅梅",
                        contractId: "1024355465522",
                        machineModelName: "A1-004",
                        startTime: "2019-07-11",
                        endTime: "2019-07-11",
                        num: 20
                    }
                ],
                activeName: 'paigong',
                tabPosition: 'top',
                imgUrl: [
                    {url: require("../../../../assets/image/img/img1.jpg")},
                    {url: require("../../../../assets/image/img/img2.jpg")},
                    {url: require("../../../../assets/image/img/img3.jpg")},
                ]
            }
        },
        methods: {
            onClose() {
                this.$emit('onOrderShowDlog', 'orderShowDlog', false)
            },
            handleClick() {

            }
        },
        watch: {
            orderShowDlog(newVal) {
                this.showModal = newVal;
                if (newVal) {

                }
            }
        }
    }
</script>

<style scoped>
  .flexBox {
    display: flex;
    line-height: 3em;
    font-size: 14px;
    width: 100%;
  }

  .flex-label {
    width: 120px;
    text-align: right;
    margin-right: 10px;
  }

  .flex-content {
    width: calc(100% - 130px);
  }

  .el-carousel__item h3 {
    color: #475669;
    font-size: 14px;
    opacity: 0.75;
    line-height: 150px;
    margin: 0;
  }

  .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }

  .el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
  }
</style>
