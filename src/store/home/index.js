
import { reqCategoryList, reqBannerList, reqFloorList } from '@/api'
//home模块的仓库
const state = {
    //三级联动的数据
    CATEGORYLIST: [],
    //轮播图数据
    BANNERLIST: [],
    //floor组件的数据
    FLOORLIST: []
};
//mutations:修改state的唯一手段
const mutations = {
    CATEGORYLIST(state, value) {
        state.CATEGORYLIST = value
    },
    BANNERLIST(state, value) {
        state.BANNERLIST = value
    },
    FLOORLIST(state, value) {
        state.FLOORLIST = value
    }
};
//actions:处理action,可以书写自己的业务逻辑,也可以处理异步
const actions = {
    async categoryList({ commit }) {
        let result = await reqCategoryList()
        commit('CATEGORYLIST', result.data)

    },
    //获取首页轮播图数据
    async getBannerList({ commit }) {
        let result = await reqBannerList()
        if (result.code == 200) {
            commit('BANNERLIST', result.data)
        }
    },
    //获取floor数据
    async getFloorList({ commit }) {
        let result = await reqFloorList()
        if (result.code == 200) {
            //提交mutations
            commit('FLOORLIST', result.data)
        }
    }
};
const getters = {}

export default ({
    state,
    mutations,
    actions,
    getters
})