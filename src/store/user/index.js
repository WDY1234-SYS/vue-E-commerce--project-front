import { reqGetCode, reqUserRegister, reqUserLogin, reqUserInfo, reqLogout } from "@/api"
import { setToken, getToken, removeToken } from '@/utils/token'
const state = {
    //验证码
    code: '',
    token: getToken(),
    userInfo: {}
}
const mutations = {
    GETCODE(state, code) {
        state.code = code
    },
    USERLOGIN(state, token) {
        state.token = token
    },
    GETUSERINFO(state, userInfo) {
        state.userInfo = userInfo
    },
    USERLOGOUT(state) {
        //清除仓库数据
        state.token = '';
        state.userInfo = {};
        //销毁token
        removeToken();
    }
}
const actions = {
    //获取验证码
    async getCode({ commit }, phone) {
        let result = await reqGetCode(phone);
        if (result.code == 200) {
            commit('GETCODE', result.data)
            return 'ok'
        } else {
            return Promise.reject(new Error('faile'))
        }
    },
    //注册用户
    async userRegister({ commit }, user) {
        let result = await reqUserRegister(user)
        if (result.code == 200) {
            return 'ok'
        } else {
            return Promise.reject(new Error('faile'))
        }
    },
    //登录业务
    async userLogin({ commit }, data) {
        let result = await reqUserLogin(data);
        //服务器下发token,用户唯一标识
        //将来经常通过带token找服务器要用户信息进行展示
        if (result.code == 200) {
            commit("USERLOGIN", result.data.token);
            //持久化存储token
            setToken(result.data.token);
            return 'ok';
        } else {
            return Promise.reject(new Error('faile'));
        }
    },
    //获取用户信息
    async getUserInfo({ commit }) {
        let result = await reqUserInfo();
        if (result.code == 200) {
            commit('GETUSERINFO', result.data);
            return 'ok';
        }else{
            return Promise.reject(new Error('faile'));
        }
    },
    //退出登录
    async userLogOut({ commit }) {
        let result = await reqLogout();
        if (result.code == 200) {
            commit('USERLOGOUT');
            return 'ok';
        } else {
            return Promise.reject(new Error('faile'));
        }
    }
}
const getters = {}

export default {
    state,
    mutations,
    actions,
    getters
}