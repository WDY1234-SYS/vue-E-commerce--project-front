//配置路由的地方
import Vue from 'vue'
import VueRouter from 'vue-router'

//引入路由
import routes from './routes'
//引入store
import store from '@/store'
//使用插件
Vue.use(VueRouter)

//先把VueRouter原型对象的push，先保存一份
let originPush = VueRouter.prototype.push
let originReplace = VueRouter.prototype.replace
console.log(originPush)

//重写push|replace方法
//第一个参数：告诉原来push方法,往哪里跳
//call || apply区别
//相同点：都可以调用函数一次，都可以篡改函数的上下文一次
//不同点：call传递参数用逗号隔开，apply传递数组
VueRouter.prototype.push = function (location, resolve, rejet) {
    if (resolve && rejet) {
        originPush.call(this, location, resolve, rejet)
    } else {
        originPush.call(this, location, () => { }, () => { })
    }
}
VueRouter.prototype.replace = function (location, resolve, rejet) {
    if (resolve && rejet) {
        originReplace.call(this, location, resolve, rejet)
    } else {
        originReplace.call(this, location, () => { }, () => { })
    }
}

//配置路由
let router = new VueRouter({
    routes,
    //滚动行为
    scrollBehavior(to, from, savedPosition) {
        // 返回y=0，代表滚动条在最上方
        return { y: 0 }
    },
});

//全局守卫：前置守卫（在路由跳转之间进行判断）
router.beforeEach(async (to, from, next) => {
    //to:获取到要跳转到的路由信息
    //from：获取到从哪个路由跳转过来的信息
    //next: next() 放行  next(path) 放行  
    //方便测试 统一放行
    //  next();
    //获取仓库中的token-----可以确定用户是登录了
    let token = store.state.user.token;
    let name = store.state.user.userInfo.name;
    //用户登录了
    if (token) {
        if (to.path == '/login' || to.path == '/register') {
            next('/');
        } else {
            //已经登陆了,访问的是非登录与注册
            //登录了且拥有用户信息放行
            if (name) {
                next();
            } else {
                //登陆了且没有用户信息
                //在路由跳转之前获取用户信息且放行
                try {
                    //获取用户信息且放行
                    await store.dispatch('getUserInfo');
                    next();
                } catch (error) {
                    //token失效
                    await store.dispatch('userLogOut');
                    next('/login');
                }
            }
        }
    } else {
        //未登录：不能去交易相关、不能去支付相关【pay|paysuccess】、不能去个人中心
        //未登录去上面这些路由-----登录
        let toPath = to.path;
        if (toPath.indexOf('/trade') != -1 || toPath.indexOf('/pay') != -1 || toPath.indexOf('/center') != -1 || toPath.indexOf('/shopcart') != -1) {
            next('/login?redirect=' + toPath);
        } else {
            //去的不是上面这些路由（home|search|shopCart）---放行
            next();
        }

    }
});


export default router;