<template>
    <div>
        <el-dialog
                title="提示"
                :visible.sync="dialogVisible"
                width="30%"
                :before-close="handleClose">
            <span>{{errorData.message}}</span>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="onConfirmEvent">确 定</el-button>
              </span>
        </el-dialog>
    </div>
</template>
<script>
    import { removeToken } from '../../../utils/auth'

    export default {
        data() {
            return {
                dialogVisible: false,
                errorData: {}
            }
        },
        methods: {
            handleClose(e) {
                this.dialogVisible = false
            },
            onConfirmEvent() {
                // 登录超时
                if (this.errorData.status === 4001) {
                    removeToken()
                    this.$router.go(0)
                    this.$store.state.user.isLoadModule = true
                    this.$router.push('login')
                } else {
                    this.dialogVisible = false
                }
            }
        },
        mounted() {
            this.dialogVisible = this.$store.state.app.errorDialog.showDialog
            this.errorData = this.$store.state.app.errorDialog
        }
    }
</script>
