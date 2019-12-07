import store from '@/store'
export default {
    data(){
        return{
            loading: false,
            //新增编辑弹框显示隐藏
            showDlog: false,
            //分页
            pageIndex: 1,
            totalPage: 0,
            pageSize:20,
            pagingNum:[20,50, 100],
            //弹框标题
            title: {
                addTxt: '新增',
                editTxt: '编辑',
                deleteTxt: '删除',
                moduleTxt: '模块',
                roleTxt: '角色',
                dispatchedTxt: '派工',
                reportWorkTxt: '报工',
                showTxt: '查看',
                cancelTxt: '取消',
                examineTxt: '审核'
            },
            dialogTitle: '',
            logId: null,
        }
    },
    mounted() {
        // console.log(componentsTool)
    },
    created () {
        this.getTableData()
    },
    methods: {
        //每页数
        sizeChangeHandle (val) {
            this.pageSize = val
            this.pageIndex = 1
            this.getTableData()
        },
        //当前页
        currentChangeHandle (val) {
            this.pageIndex = val
            this.getTableData()
        },
        // 获取子组件传参数据
        getData (...val) {
            let [showLog, getData] = [...val];
            //showLog为$emit()传过来的父组件里注册子组件时v-bind绑定的值控制子组件是否显示
            this[showLog] = false;
            //getData为$emit()传过来的true和false，因关闭和取消按钮不需要调用getTableData方法更新数据
            if (getData) {
                this.getTableData()
            }
        },
        // 新增
        onAddData () {
            this.dialogTitle = this.title.addTxt
            this.logId = null
            this.showDlog = true
        },
        //编辑
        onEditData (id) {
            this.dialogTitle = this.title.editTxt
            this.logId = id
            this.showDlog = true
        },
    },
    watch: {

    },
}
