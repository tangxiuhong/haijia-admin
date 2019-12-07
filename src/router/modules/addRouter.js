import routerReference from './router-reference';
import router from '../index';
import axios from 'axios/index';
import store from '@/store';

const addRouter = (to, next) => {
    axios.post('frame/module/myList').then(res => {
        if (res.data.status === 200) {
            store.state.user.isLoadModule=true;
            let list = res.data.res;
            let modObj = [];
            let addRouterList = [];
            list.forEach(item => {
                let arr = {
                    // code: item.code,
                    icon: item.iconUrl,
                    name: item.navUrl,
                    path: item.navUrl,
                    title: item.name,
                    id: item.id,
                    parentId: item.parentId,
                    children: []
                };
                modObj.push(arr);
            });
            generateTreeList(0, addRouterList);
            function generateTreeList (parentId, target) {
                let children = modObj.filter((item) => item.parentId === parentId);
                if (children.length > 0) {
                    children.forEach((item, index) => {
                        item.children = [];
                        target.push(item);
                        generateTreeList(item.id, item.children);
                    });
                }
            }
            addRouterList.forEach((item) => {
                item.component = () => import('../../layout/index.vue');
                item.path = `/${item.path}`;
                item.alwaysShow = item.children.length > 0
                // item.alwaysShow = true; // will always show the root menu
                item.meta = {
                    title: item.title,
                    icon: item.icon,
                    // isShIcon: item.icon.indexOf('sh-icon') !== -1
                    isShIcon: item.icon.indexOf('sh-icon'||'el-icon') !== -1
                    // isShIcon: true
                };
                item.children.forEach(childItem => {
                    // childItem.path = `/${childItem.path}`;
                    childItem.meta = {
                        title: childItem.title,
                        icon: childItem.icon,
                        // isShIcon: childItem.icon.indexOf('sh-icon') !== -1
                        isShIcon: childItem.icon.indexOf('sh-icon'||'el-icon') !== -1
                        // isShIcon: true
                    };
                    childItem.component = routerReference[childItem.path];
                });
            });
            store.state.user.leftMenuList = addRouterList;
            router.addRoutes(addRouterList);
            next({
                ...to
            });
        } else {
            next();
        }
    });
};



export default addRouter;
