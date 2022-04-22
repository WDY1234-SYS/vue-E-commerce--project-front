//search模块的仓库
import { reqSearchInfo } from "@/api"
const state = {
    SEARCHLIST: {}
}
const mutations = {
    GETSEARCHLIST(state, value) {
        state.SEARCHLIST = value
    }
}
const actions = {
    //获取search模块数据
    async getSearchList({ commit }, params = {}) {
        //当前这个reqSearchInfo函数在调用获取服务器数据的时候，至少传递一个参数（空对象）
        //params形参：是当用户派发action的时候，第二个参数传递过来的，
        let result = await reqSearchInfo(params)
        if (result.code == 200) {
            commit('GETSEARCHLIST', result.data)
        }
    }
}
const getters = {
    goodsList(state) {
        return state.SEARCHLIST.goodsList || []
    },
    attrsList(state) {
        return state.SEARCHLIST.attrsList || []
    },
    trademarkList(state) {
        return state.SEARCHLIST.trademarkList || []
    },
}

export default ({
    state,
    mutations,
    actions,
    getters
})