import router, { asyncRoutes, constantRoutes } from './router';
import store from './store';
import NProgress from 'nprogress'; // progress bar
import 'nprogress/nprogress.css'; // progress bar style
import { getToken } from '@/utils/auth'; // get token from cookie
import Router from 'vue-router';
import addRouter from '@/router/modules/addRouter';

NProgress.configure({ showSpinner: false }); // 进度条
NProgress.start();

router.beforeEach((to, from, next) => {
    const hasToken = getToken();
    // 已登录
    if (hasToken) {
        if (to.path === '/login') {
            next({
                path: '/'
            });
        }
        NProgress.done();
        if (store.state.user.isLoadModule) {
            // 获取登录人的模块
            next();
        } else {
            addRouter(to, next);
        }
    } else { // 未登录
        if (to.path === '/login') {
            router.matcher = new Router({ // 重置路由规则
                routes: constantRoutes.concat(asyncRoutes)
            }).matcher;
            next();
        } else {
            next({
                path: '/login'
            });
        }
    }
});

router.afterEach(() => {
    // finish progress bar
    NProgress.done();
});

