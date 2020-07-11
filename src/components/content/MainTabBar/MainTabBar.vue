<template>
  <tab-bar>
    <tabbar-item path="/home" activeColor="rgb(239, 71, 15)">
      <img src="~assets/img/tabbar/dehome.svg" alt="" slot="item-icon">
      <img src="~assets/img/tabbar/home.svg" alt="" slot="item-icon-active">
      <div slot="item-text">首页</div>
    </tabbar-item>
    <tabbar-item path="/category" activeColor="rgb(239, 71, 15)">
      <img src="~assets/img/tabbar/detype.svg" alt="" slot="item-icon">
      <img src="~assets/img/tabbar/type.svg" alt="" slot="item-icon-active">
      <div slot="item-text">分类</div>
    </tabbar-item>
    <tabbar-item path="/shoppingcart" activeColor="rgb(239, 71, 15)">
      <img src="~assets/img/tabbar/deshoppint-cart.svg" alt="" slot="item-icon">
      <img src="~assets/img/tabbar/shopping-cart.svg" alt="" slot="item-icon-active">
      <div slot="item-text">购物车</div>
    </tabbar-item>
    <tabbar-item path="/profile" activeColor="rgb(239, 71, 15)">
      <img src="~assets/img/tabbar/deself.svg" alt="" slot="item-icon">
      <img src="~assets/img/tabbar/self.svg" alt="" slot="item-icon-active">
      <div slot="item-text">我的</div>
    </tabbar-item>
  </tab-bar>
</template>

<script>
    import tabBar from "components/common/tabbar/tabBar";
    import TabbarItem from "components/common/tabbar/TabbarItem";

    export default {
        name: "MainTabBar",
        components:{
        tabBar,TabbarItem
      }
    }
</script>

<style scoped>
  .tab-bar-item{
    flex: 1;
    height: 49px;
    font-size: 12px;
    text-align: center;
  }
</style>
