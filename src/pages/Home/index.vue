<template>
  <div>
    <!-- 三级联动组件 -->
    <TypeNav />
    <ListContainer />
    <Recommend />
    <Rank />
    <Like />
    <!-- Floor组件，自己在内部是没有发请求的，数据是父组件给的 -->
    <Floor v-for="(floor,index) in floorList" :key="index" :list="floor"/>
    <Brand />
  </div>
</template>

<script>
import {mapState} from 'vuex'
import ListContainer from "./ListContainer";
import Recommend from "./Recommend";
import Rank from "./Rank";
import Like from "./Like";
import Floor from "./Floor";
import Brand from "./Brand";
export default {
  name: "Home",
  components: { ListContainer, Recommend, Rank, Like, Floor, Brand },
  mounted() {
    //派发action,获取floor组件的数据
    this.$store.dispatch("getFloorList");
  },
  computed: {
    ...mapState({ floorList: (state) => state.home.FLOORLIST }),
  },
};
</script>

<style>
</style>