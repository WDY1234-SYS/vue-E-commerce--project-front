import Vue from 'vue'
import App from './App.vue'
//三级联动组件---全局组件
import TypeNav from '@/components/TypeNav'
//轮播图组件---全局组件
import Carousel from '@/components/Carousel'
//分页器组件---全局组件
import Pagination from '@/components/Pagination'

import { Button, MessageBox } from 'element-ui';
//第一个参数：全局组件的名字  第二个参数：哪个组件
Vue.component(TypeNav.name, TypeNav)
Vue.component(Carousel.name, Carousel)
Vue.component(Pagination.name, Pagination)
Vue.component(Button.name, Button)

//element-ui还有一张写法，挂载到Vue原型上
Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert;
//引入路由
import router from '@/router'
//引入仓库
import store from './store'
//引入MockServer.js文件-----mock数据
import '@/mock/mockServe'
//引入swiper样式
import 'swiper/css/swiper.css'
//统一接口api文件夹里全部请求函数
import * as API from '@/api'
//引入插件
import VueLazyload from 'vue-lazyload'
import atm from '@/assets/1.gif'
//注册插件
Vue.use(VueLazyload, {
  //懒加载默认的图片
  loading: atm
})

Vue.config.productionTip = false;

//引入自定义插件
import myPlugins from './plugins/myPlugin'
Vue.use(myPlugins, {
  name: 'upper'
});

//引入表单校验插件
import "@/plugins/validate";
new Vue({
  render: h => h(App),
  //注册路由信息：当这里书写router的时候，组件身上都拥有$router和$route属性
  router,
  //注册仓库:组件身上多一个$store属性
  store,
  beforeCreate() {
    //全局事件总线$bus配置
    Vue.prototype.$bus = this;
    //全局API
    Vue.prototype.$API = API;
  },
}).$mount('#app')
