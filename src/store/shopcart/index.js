import { reqCartList, reqDeleteCartById, reqUpdateCheckedById } from "@/api"

const state = {
    //购物车列表
    cartList: []
}
const actions = {
    //获取购物车列表的数据
    async getCartList({ commit }) {
        let result = await reqCartList();
        if (result.code == 200) {
            commit('CARTLIST', result.data);
        }
    },
    //删除购物车某一个产品
    async deleteCartListBySkuId({ commit }, skuId) {
        let result = await reqDeleteCartById(skuId);
        if (result.code == 200) {
            return 'ok';
        } else {
            return Promise.reject(new Error('faile'));
        }
    },
    //切换商品选中状态
    async updateCheckedById({ commit }, { skuId, isChecked }) {
        let result = await reqUpdateCheckedById(skuId, isChecked);
        if (result.code == 200) {
            return 'ok';
        } else {
            return Promise.reject(new Error('faile'));
        }
    },
    //删除全部勾选的商品
    deleteAllCheckedCart({ dispatch, getters }) {
        //获取购物车中全部的产品（是一个数组）
        let promiseAll = [];
        getters.cartList.cartInfoList.forEach(item => {
            let promise = item.isChecked == 1 ? dispatch('deleteCartListBySkuId', item.skuId) : '';
            //将每一次返回的promise添加到数组中
            promiseAll.push(promise);
        });
        //只要全部的promise成功就成功，否则失败
        return Promise.all(promiseAll);
    },
    //商品全选
    updateAllCartIsChecked({ dispatch, state }, isChecked) {
        let promiseAll = [];
        state.cartList[0].cartInfoList.forEach(item => {
            let promise = dispatch('updateCheckedById', { skuId: item.skuId, isChecked });
            promiseAll.push(promise);
        });
        return Promise.all(promiseAll);
    }
}
const mutations = {
    CARTLIST(state, value) {
        state.cartList = value;
    }
}
const getters = {
    cartList(state) {
        return state.cartList[0] || {};
    }
}

export default {
    state,
    actions,
    mutations,
    getters
}