<template>
    <div v-if="!item.hidden" class="menu-wrapper">
        <!--一级菜单-->
        <template
            v-if="hasOneShowingChild(item.children,item) && (!onlyOneChild.children||onlyOneChild.noShowingChildren)&&!item.alwaysShow">
            <app-link v-if="onlyOneChild.meta" :to="resolvePath(onlyOneChild.path)">
                <!--一级展示-->
                <el-menu-item :index="resolvePath(onlyOneChild.path)" :class="{'submenu-title-noDropdown':!isNest}">
                    <!--昇虹icon-->
                    <div v-if="item.meta && item.meta.isShIcon" class="flex-left">
                        <!--<div :class="sidebar.opened?iconBar:iconBarState">-->
                        <div :class="iconState">
                            <i :class="`sh-iconfont ${item.meta.icon} iconColor`"></i>
                        </div>
                        <item v-if="toggleBar" :title="onlyOneChild.meta.title"/>
                    </div>
                    <!--其他icon-->
                    <div v-else class="flex-left">
                        <!--<div :class="sidebar.opened?iconBar:iconBarState">-->
                        <div :class="iconState">
                            <i :class="`${item.meta.icon} iconColor`"></i>
                        </div>
                        <item v-if="toggleBar" :title="onlyOneChild.meta.title"/>
                    </div>
                </el-menu-item>
            </app-link>
        </template>

        <el-submenu v-else ref="subMenu" :index="resolvePath(item.path)" popper-append-to-body>
            <!--二级展示-->
            <template slot="title">
                <!--昇虹icon-->
                <div v-if="item.meta && item.meta.isShIcon" class="flex-left">
                    <div :class="iconState">
                        <i :class="`sh-iconfont ${item.meta.icon} iconColor`"></i>
                    </div>
                    <item v-if="toggleBar" :title="item.meta.title"/>
                </div>
                <!--其他icon-->
                <div v-else class="flex-left">
                    <div :class="iconState">
                        <i :class="`${item.meta.icon} iconColor`"></i>
                    </div>
                    <!--一级其他图标nav-->
                    <item v-if="toggleBar" :title="item.meta.title"/>
                </div>
            </template>
            <sidebar-item
                v-for="(child, childIndex) in item.children"
                :key="childIndex"
                :is-nest="true"
                :item="child"
                :base-path="resolvePath(child.path)"
                class="nest-menu"
                @mouseover="mouse"
            />
        </el-submenu>
    </div>
</template>

<script>
    import path from 'path'
    import {isExternal} from '@/utils/validate'
    import Item from './Item'
    import AppLink from './Link'
    import FixiOSBug from './FixiOSBug'
    import {mapGetters} from 'vuex'

    export default {
        name: 'SidebarItem',
        components: {Item, AppLink},
        mixins: [FixiOSBug],
        computed: {
            ...mapGetters(['sidebar'])
        },
        props: {
            // route object
            item: {
                type: Object,
                required: true
            },
            isNest: {
                type: Boolean,
                default: false
            },
            basePath: {
                type: String,
                default: ''
            },
            icon: {
                type: String,
                default: ''
            },
            title: {
                type: String,
                default: ''
            }
        },
        data () {
            // To fix https://github.com/PanJiaChen/vue-admin-template/issues/237
            // TODO: refactor with render function
            this.onlyOneChild = null
            return {
                toggleBar: false,
                iconBar: 'icon-bar',
                iconBarState: 'icon-bar-state',
                iconState:''
            }
        },
        mounted () {

        },
        methods: {
            mouse(){
                console.log("kkk")
            },
            hasOneShowingChild (children = [], parent) {
                if (this.sidebar.opened) {
                    this.toggleBar = true
                    this.iconState=this.iconBar
                }else{
                    if(parent.parentId==0){
                        this.toggleBar = false
                        this.iconState=this.iconBarState
                    }else{
                        this.toggleBar = true
                        this.iconState=this.iconBar
                    }

                }
                const showingChildren = children.filter((item, index) => {
                    if (item.hidden) {
                        return false
                    } else {
                        // Temp set(will be used if only has one showing child)
                        this.onlyOneChild = item
                        return true
                    }
                })

                // When there is only one child router, the child router is displayed by default
                if (showingChildren.length === 1) {
                    return true
                }

                // Show parent if there are no child router to display
                if (showingChildren.length === 0) {
                    this.onlyOneChild = {...parent, path: '', noShowingChildren: true}
                    // console.log(this.onlyOneChild,"55555")
                    return true
                }

                return false
            },
            resolvePath (routePath) {
                if (isExternal(routePath)) {
                    return routePath
                }
                if (isExternal(this.basePath)) {
                    return this.basePath
                }
                return path.resolve(this.basePath, routePath)
            }
        }
    }
</script>
<style scoped>
    .menu-wrapper .sh-iconfont {
        font-family: "sh-iconfont" !important;
        font-size: 16px;
        font-style: normal;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
    }

    .icon-bar {
        width: 20px;
        text-align: center;
        margin-right: 10px;
    }

    .iconColor {
        color: #bfcbd9 !important;
    }

    .icon-bar-state {
        width: 100%;
        text-align: center;
    }

    .flex-left {
        display: flex;
    }
</style>
