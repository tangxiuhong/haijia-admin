<template>
    <div class="navbar">
        <hamburger id="hamburger-container" :is-active="sidebar.opened" class="hamburger-container"
                   @toggleClick="toggleSideBar"/>

        <breadcrumb id="breadcrumb-container" class="breadcrumb-container"/>

        <div class="right-menu">

            <template v-if="device!=='mobile'">

                <search id="header-search" class="right-menu-item"/>

                <error-log class="errLog-container right-menu-item hover-effect"/>

                <screenfull id="screenfull" class="right-menu-item hover-effect"/>

                <el-tooltip content="全局尺寸" effect="dark" placement="bottom">
                    <size-select id="size-select" class="right-menu-item hover-effect"/>
                </el-tooltip>

            </template>

            <el-dropdown class="avatar-container right-menu-item hover-effect" trigger="click">
                <div class="flex-head-portrait">
                    <div class="avatar-wrapper">
                        <div class="loginUser">{{userName}}</div>
                        <i class="el-icon-caret-bottom"/>
                        <!--<img src="../../assets/image/user.gif" class="user-avatar">-->
                    </div>
                    <div class="head-portrait"><img src="../../assets/image/user.gif" class="user-avatar"></div>
                </div>


                <el-dropdown-menu slot="dropdown">
                    <router-link to="/profile/index">
                        <el-dropdown-item>Profile</el-dropdown-item>
                    </router-link>
                    <router-link to="/">
                        <el-dropdown-item>Dashboard</el-dropdown-item>
                    </router-link>
                    <a target="_blank" href="https://github.com/PanJiaChen/vue-element-admin/">
                        <el-dropdown-item>Github</el-dropdown-item>
                    </a>
                    <a target="_blank" href="https://panjiachen.github.io/vue-element-admin-site/#/">
                        <el-dropdown-item>Docs</el-dropdown-item>
                    </a>
                    <el-dropdown-item divided>
                        <span style="display:block;" @click="logout">退出</span>
                    </el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
        </div>
    </div>
</template>

<script>
    import {mapGetters, mapActions} from 'vuex'
    import Breadcrumb from '@/components/Breadcrumb'
    import Hamburger from '@/components/Hamburger'
    import ErrorLog from '@/components/ErrorLog'
    import Screenfull from '@/components/Screenfull'
    import SizeSelect from '@/components/SizeSelect'
    import Search from '@/components/HeaderSearch'
    import {removeToken} from "../../utils/auth";

    export default {
        data () {
            return {
                userName: ''
            }
        },
        components: {
            Breadcrumb,
            Hamburger,
            ErrorLog,
            Screenfull,
            SizeSelect,
            Search
        },
        computed: {
            ...mapGetters([
                'sidebar',
                'avatar',
                'device',
                'loginUser'
            ]),
        },
        created () {
            this.getUserInfo()
        },
        methods: {
            toggleSideBar () {
                this.$store.dispatch('app/toggleSideBar')
            },
            logout: async function () {
                removeToken()
                this.$router.go(0)
                this.$store.state.user.isLoadModule = true;
                await this.$router.push(`/login?redirect=${this.$route.fullPath}`);
            },
            getUserInfo () {
                this.$axios.post('frame/user/myInfo', {}).then(res => {
                    if (res.data.status == 200) {
                        this.userName = res.data.res.name
                    }
                })
            }
        }
    }
</script>

<style lang="scss" scoped>
    .navbar {
        height: 50px;
        overflow: hidden;
        position: relative;
        background: #fff;
        box-shadow: 0 1px 4px rgba(0, 21, 41, .08);

        .hamburger-container {
            line-height: 46px;
            height: 100%;
            float: left;
            cursor: pointer;
            transition: background .3s;
            -webkit-tap-highlight-color: transparent;

            &:hover {
                background: rgba(0, 0, 0, .025)
            }
        }

        .breadcrumb-container {
            float: left;
        }

        .errLog-container {
            display: inline-block;
            vertical-align: top;
        }

        .right-menu {
            float: right;
            height: 100%;
            line-height: 50px;

            &:focus {
                outline: none;
            }

            .right-menu-item {
                display: inline-block;
                padding: 0 8px;
                height: 100%;
                font-size: 18px;
                color: #5a5e66;
                vertical-align: text-bottom;

                &.hover-effect {
                    cursor: pointer;
                    transition: background .3s;

                    &:hover {
                        background: rgba(0, 0, 0, .025)
                    }
                }
            }

            .avatar-container {
                .flex-head-portrait {
                    display: flex;
                    height: 100%;
                }
                .avatar-wrapper {
                    position: relative;
                    /*flex-shrink: 0;*/
                    margin-right: 30px;
                    .user-avatar {
                        cursor: pointer;
                        width: 40px;
                        height: 40px;
                        border-radius: 10px;
                    }
                    .loginUser {
                        display: inline-block;
                        height: 100%;
                        vertical-align: text-bottom;
                        color: #2674f0;
                        position: relative;
                        top: -0px;
                        font-size: 12px;
                    }
                    .el-icon-caret-bottom {
                        cursor: pointer;
                        position: absolute;
                        right: -20px;
                        top: 20px;
                        font-size: 12px;
                    }
                }
                .head-portrait {
                    display: flex;
                    vertical-align: middle;
                    align-items: center;
                    width: 40px;
                    img {
                        width: 100%;
                        -webkit-border-radius: 200px;
                        -moz-border-radius: 200px;
                        border-radius: 200px;
                    }
                }
            }
        }
    }
</style>
