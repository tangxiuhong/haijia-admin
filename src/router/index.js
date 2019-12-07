import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)
/* Layout */
import Layout from '@/layout'

/* Router Modules */

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, 则项目将不会显示在侧边栏中
 * alwaysShow: true               if set true, 将始终显示根菜单
 *                                如果不始终设置Show，则当项具有多个子路由时，
 *                                它将成为嵌套模式，否则不显示根菜单
 * redirect: noRedirect           如果设置了noRedirect，则no redirect将不会在breadcrumb中重定向
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar
    noCache: true                if set true, the page will no be cached(default is false)
    affix: true                  if set true, the tag will affix in the tags-view
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
    {
        path: '/redirect',
        component: Layout,
        hidden: true,
        children: [
            {
                path: '/redirect/:path*',
                component: () => import('@/views/redirect/index')
            }
        ]
    },
    {
        path: '/login',
        component: () => import('@/views/login/index'),
        hidden: true
    },
    {
        path: '/auth-redirect',
        component: () => import('@/views/login/auth-redirect'),
        hidden: true
    },
    {
        path: '/404',
        component: () => import('@/views/error-page/404'),
        hidden: true
    },
    {
        path: '/401',
        component: () => import('@/views/error-page/401'),
        hidden: true
    }
]
/**
 * asyncRoutes
 * the routes that need to be dynamically loaded based on user roles
 */
// export const asyncRoutes = []
export const asyncRoutes = [
    // 默认首页
    {
        path: '/',
        component: Layout,
        redirect: '/dashboard',
        parentId: 0,
        meta: {
            icon: 'el-icon-s-home'
        },
        children: [
            {
                path: 'dashboard',
                component: () => import('@/views/dashboard/index'),
                name: 'Dashboard',
                meta: {title: 'Dashboard', icon: 'dashboard', affix: true},
            }
        ]
    },
    {
        path: '/nested',
        // component: () => import('@/views/nested/menu1/index'),
        component: Layout,
        redirect: '/nested/menu1/menu1-1',
        name: 'Nested',
        alwaysShow: true,
        id:211,
        icon: 'el-icon-s-home',
        parentId: 0,
        meta: {
            title: 'Nested',
            icon: 'el-icon-s-home',
            isShIcon: false
        },
        children: [
            {
                path: 'menu1',
                component: () => import('@/views/nested/menu1/index'),
                // component: 'views/nested/menu1/index',
                name: 'Menu1',
                meta: { title: 'Menu1' },
                redirect: '/nested/menu1/menu1-1',
                children: [
                    {
                        path: 'menu1-1',
                        component: () => import('@/views/nested/menu1/menu1-1'),
                        // component: 'views/nested/menu1/menu1-1',
                        name: 'Menu1-1',
                        meta: { title: 'Menu1-1' }
                    },
                    {
                        path: 'menu1-2',
                        component: () => import('@/views/nested/menu1/menu1-2'),
                        // component: 'views/nested/menu1/menu1-2',
                        name: 'Menu1-2',
                        redirect: '/nested/menu1/menu1-2/menu1-2-1',
                        meta: { title: 'Menu1-2' },
                        children: [
                            {
                                path: 'menu1-2-1',
                                component: () => import('@/views/nested/menu1/menu1-2/menu1-2-1'),
                                // component: 'views/nested/menu1/menu1-2/menu1-2-1',
                                name: 'Menu1-2-1',
                                meta: { title: 'Menu1-2-1' }
                            },
                            {
                                path: 'menu1-2-2',
                                component: () => import('@/views/nested/menu1/menu1-2/menu1-2-2'),
                                // component: 'views/nested/menu1/menu1-2/menu1-2-2',
                                name: 'Menu1-2-2',
                                meta: { title: 'Menu1-2-2' }
                            }
                        ]
                    },
                    {
                        path: 'menu1-3',
                        component: () => import('@/views/nested/menu1/menu1-3'),
                        // component: 'views/nested/menu1/menu1-3',
                        name: 'Menu1-3',
                        meta: { title: 'Menu1-3' }
                    }
                ]
            },
            {
                path: 'menu2',
                name: 'Menu2',
                component: () => import('@/views/nested/menu2/index'),
                // component: 'views/nested/menu2/index',
                meta: { title: 'Menu2' }
            }
        ]
    }
];
/*export const asyncRoutes = [
  // 默认首页
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [
      {
        path: 'dashboard',
        component: () => import('@/views/dashboard/index'),
        name: 'Dashboard',
        meta: { title: 'Dashboard', icon: 'dashboard', affix: true }
      }
    ]
  },
  {
    path: '/system',
    component: Layout,
    alwaysShow: true, // will always show the root menu
    name: 'system',
    meta: {
      title: '系统管理',
      icon: 'example',
      // roles: ['admin', 'editor'] // you can set roles in root nav
    },
    children: [
      {
        path: 'module',
        component: () => import('@/views/system/sysModule'),
        name: 'module',
        meta: {
          title: '模块管理',
          // roles: ['admin'] // or you can only set roles in sub nav
          icon: 'lock',
        }
      },
      {
        path: 'user',
        component: () => import('@/views/system/sysUser'),
        name: 'user',
        meta: {
          title: '用户管理',
          // roles: ['admin']
          // if do not set roles, means: this page does not require permission
        }
      },
      {
        path: 'sysRole',
        component: () => import('@/views/system/sysRole'),
        name: 'sysRole',
        meta: {
          title: '角色管理',
          // roles: ['admin'] // or you can only set roles in sub nav
        }
      },
      {
        path: '/sysPara',
        component: () => import('@/views/system/sysPara'),
        name: 'sysPara',
        meta: {
          title: '系统参数'
        }
      }
    ]
  },
  {
    path: '/basicData',
    component: Layout,
    alwaysShow: true, // will always show the root menu
    name: 'basicData',
    meta: {
      title: '基础资料',
      icon: 'documentation',
      // roles: ['admin', 'editor'] // you can set roles in root nav
    },
    children: [
      {
        path: 'dictionary',
        component: () => import('@/views/basicData/dictionary'),
        name: 'dictionary',
        meta: {
          title: '字典管理',
          // roles: ['admin'] // or you can only set roles in sub nav
        }
      }
    ]
  },
  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]*/

const createRouter = () => new Router({
    // mode: 'history', // require service support
    scrollBehavior: () => ({y: 0}),
    // routes: constantRoutes
    routes: constantRoutes.concat(asyncRoutes)
});
const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter () {
    const newRouter = createRouter()
    router.matcher = newRouter.matcher // reset router
}

export default router
