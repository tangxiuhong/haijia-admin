<template>
    <el-dialog :title="dialogTitle" :visible.sync="sysRoleUserLog">
        <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox>
        <div style="margin: 15px 0;"></div>
        <el-row>
            <el-checkbox-group v-model="checkedName" @change="handleCheckednNameChange">
                <el-col :span="24">
                    <el-checkbox v-for=" name in tableDate" :label="name" :key="name">{{name}}</el-checkbox>
                </el-col>
            </el-checkbox-group>
        </el-row>
        <div slot="footer">
            <el-button @click="onColse">取消</el-button>
            <el-button type="primary" @click="onDefinite()">提交</el-button>
        </div>
    </el-dialog>
</template>
<script>
    import {moduleAxios} from '@/api/system/module.js'

    export default {
        name: 'SysRoleUserDialog',
        props: {
            dialogTitle: {
                type: String,
                default: ''
            }
        },
        data () {
            return {
                sysRoleUserLog: false,
                isIndeterminate: true,
                checkAll: false,
                checkedName: [],
                tableDate: []
            }
        },
        methods: {
            init (...val) {
                this.sysRoleUserLog = true
            },
            handleCheckAllChange () {
            },
            handleCheckednNameChange () {
            },
            onColse () {
                this.sysRoleUserLog = false
            },
            onDefinite () {
            }
        }
    }
</script>

<style scoped>
    .selBox {
        padding-left: 100px;
    }
</style>
