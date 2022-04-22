import { reqGoodInfo, reqAddOrUpdateShopCart } from '@/api'
import { getUUID } from '@/utils/uuid_token'
const state = {
    goodInfo: {},
    //标识游客身份
    uuid_token: getUUID(),
}
const actions = {
    //获取产品信息的action
    async getGoodInfo({ commit }, skuId) {
        let result = await reqGoodInfo(skuId);
        if (result.code == 200) {
            commit('GETGOODINFO', result.data)

        }
    },
    //将产品添加到购物车中
    async addOrUpdateShopCart({ commit }, { skuId, skuNum }) {
        //加入购物车返回的解构
        //加入购物车后（发请求），前台将参数带给服务器
        //服务器写入数据成功，并没有返回其他的数据，只是返回code==200,代表操作成功
        //因为服务器没有返回其他数据，因此不需要三连环存储数据
        let result = await reqAddOrUpdateShopCart(skuId, skuNum);

        //代表服务器加入购物车成功
        if (result.code == 200) {
            //返回的是成功的标记
            return 'ok';
        } else {
            //返回的是失败的标记
            return Promise.reject(new Error('faile'))
        }
    }
}
const mutations = {
    GETGOODINFO(state, value) {
        state.goodInfo = value;
    }
}
//简化数据
const getters = {
    //路径导航简化的数据
    categoryView(state) {
        //state.goodInfo初始状态是个空对象
        //categoryView属性值至少是一个空对象，这样就不会报错
        return state.goodInfo.categoryView || {};
    },
    //简化产品信息的数据
    skuInfo(state) {
        return state.goodInfo.skuInfo || {};
    },
    //产品售卖属性的简化
    spuSaleAttrList(state) {
        return state.goodInfo.spuSaleAttrList || []
    }
}

export default ({
    state,
    actions,
    mutations,
    getters
})

