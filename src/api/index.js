//当前的模块：API统一管理
import request from './request'
import mockRequest from './mockRequest'

//三级联动的接口
///api/product/getBaseCategoryList GET请求 无参数
//对外暴露一个函数，只要外部调用这个函数，就会向服务器发送ajax请求，获取三级菜单的数据。
export const reqCategoryList = () => request.get(`/product/getBaseCategoryList`);

//获取banner(Home首页轮播图的接口)
export const reqBannerList = () => mockRequest.get('/banner')

// mockRequest({url:'/banner',method:'get'});
//获取floor数据
export const reqFloorList = () => mockRequest.get('/floor')

//获取搜索模块数据 地址：/api/list 请求方式:POST 参数：需要带参数
//当前这个函数需不需要接受外部传递参数
//当前这个接口，给服务器传递参数params，至少是一个空对象
export const reqSearchInfo = (params) => request({ url: '/list', method: 'post', data: params })

//获取商品详情数据 
export const reqGoodInfo = (skuId) => request({ url: `/item/${skuId}`, method: 'get' })

//将产品添加到购物车中（获取更新某一个产品的个数）
///api/cart/addToCart/{ skuId }/{ skuNum }
export const reqAddOrUpdateShopCart = (skuId, skuNum) => request({ url: `/cart/addToCart/${skuId}/${skuNum}`, method: 'post' })

//获取购物车列表的数据
///api/cart/cartList GET请求
export const reqCartList = () => request({ url: '/cart/cartList', method: 'get' })

//删除购物车商品
///api/cart/deleteCart/{skuId} DELETE
export const reqDeleteCartById = (skuId) => request({ url: `/cart/deleteCart/${skuId}`, method: 'delete' })

//切换商品选中状态
///api/cart/checkCart/{skuId}/{isChecked} GET
export const reqUpdateCheckedById = (skuId, isChecked) => request({ url: `/cart/checkCart/${skuId}/${isChecked}`, method: 'get' })

//获取验证码
///api/user/passport/sendCode/{phone} GET
export const reqGetCode = (phone) => request({ url: `/user/passport/sendCode/${phone}`, method: 'get' })

//注册
///api/user/passport/register POST
export const reqUserRegister = (data) => request({ url: '/user/passport/register', method: 'post', data })

//登录
///api/user/passport/login POST
export const reqUserLogin = (data) => request({ url: '/user/passport/login', method: 'post', data })

//获取用户信息【需要带着用户的token向服务器要用户信息】
//URL:/api/user/passport/auth/getUserInfo  method:get 
export const reqUserInfo = () => request({ url: '/user/passport/auth/getUserInfo', method: 'get' });

//退出登录
//URL:/api/user/passport/logout  get
export const reqLogout = () => request({ url: '/user/passport/logout', method: 'get' });

//获取用户地址信息
///api/user/userAddress/auth/findUserAddressList  GET
export const reqAdressInfo = () => request({ url: '/user/userAddress/auth/findUserAddressList', method: 'get' })

//获取商品清单
///api/order/auth/trade GET
export const reqOrderInfo = () => request({ url: '/order/auth/trade', method: 'get' })

//12.提交订单
///api/order/auth/submitOrder?tradeNo={tradeNo} post
export const reqSubmitOrder = (tradeNo,data) => request({url:`/order/auth/submitOrder?tradeNo=${tradeNo}`,data,method:'post'})

//获取订单支付信息
///api/payment/weixin/createNative/{orderId} GET
export const reqPayInfo = (orderId) => request({url:`/payment/weixin/createNative/${orderId}`,method:'get'})

//查询支付订单状态
///api/payment/weixin/queryPayStatus/{orderId}      GET
export const reqPayStatus = (orderId) => request({url:`/payment/weixin/queryPayStatus/${orderId}`,method:'get'})

//获取我的订单列表
///api/order/auth/{page}/{limit}   GET
export const reqMyOrderList = (page,limit) => request({url:`/order/auth/${page}/${limit}`,method:'get'})