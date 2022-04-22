<template>
    <div>
      <!-- 测试upper插件 -->
      <!-- <h1 v-upper="msg"></h1> -->
      <Header />
      <!-- 组件路由出口的地方 -->
      <router-view></router-view>
      <Footer v-show="$route.meta.show"/>
    </div>
</template>

<script>
import Header from './components/Header/index'
import Footer from './components/Footer/index'

export default {
  name: 'App',
  data() {
    return {
      msg: 'abc',
    };
  },
  components:{Header,Footer},
  mounted() {
    //派发一个action||获取商品分类的三级列表的数据
    this.$store.dispatch("categoryList");
  }
}
</script>

<style>

</style>
