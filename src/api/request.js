//对于axios进行二次封装
import axios from 'axios'
//引入进度条
import nprogress from 'nprogress';
//引入进度条的样式
import 'nprogress/nprogress.css';
//在当前模块中引入store
import store from '@/store';
//1.利用axios对象的方法create,去创建一个axios实例
//2.request就是axios，只不过稍微配置一下
const requests = axios.create({
    //配置对象
    //基础路径,发请求的时候,路径中会出现api
    baseURL: '/api',
    //代表请求超过的时间
    timeout: 5000,
});
//请求拦截器：在发请求之前，请求拦截器可以检测到，可以在请求发出去之前做些事情
requests.interceptors.request.use((config) => {
    //config:配置对象,对象中有个属性很重要,headers请求头
    //请求头添加一个字段(userTempId):和后台老师商量好了
    if (store.state.detail.uuid_token) {
        config.headers.userTempId = store.state.detail.uuid_token;
    }
    //需要携带token给服务器
    if (store.state.user.token) {
        config.headers.token = store.state.user.token
    }
    //进度条开始
    nprogress.start();
    return config;
})

//响应拦截器
requests.interceptors.response.use((res) => {
    //成功的回调函数：服务器响应数据回来以后，响应拦截器可以检测到
    //进度条结束
    nprogress.done();
    return res.data;
}, (err) => {
    //响应失败的回调函数
    return Promise.reject(new Error('fail'));
})

//对外暴露
export default requests;