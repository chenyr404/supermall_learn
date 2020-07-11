<template>
  <div class="shoppingcart">
    <navbar class="nav-bar">
      <div slot="center">购物车({{length}})</div>
    </navbar>
    <cart-list></cart-list>
    <cart-bottom-bar></cart-bottom-bar>
  </div>
</template>

<script>
  import navbar from "components/common/navbar/navbar";
  import CartList from './childComps/CartList';
  import CartBottomBar from './childComps/CartBottomBar';

  import { mapGetters } from 'vuex';


  export default {
    name: 'Shoppingcart',
    data() {
      return {

      }
    },
    components:{
      navbar,
      CartList,
      CartBottomBar
    },
    computed:{
      //mapGetters的第一种用法
      //...mapGetters(['Cartlength','Cartlist']),

      ...mapGetters({
        length:'Cartlength',
        cartlist:'Cartlist'
      })
      //第二种用法
      // ...mapGetters({
      //   length: 'cartLength',
      //   list: 'cartList'
      // })
    }
  }
</script>

<style  scoped>
  .shoppingcart {
    /*position: relative;*/
    height: 100vh;
  }

  .nav-bar {
    background-color: var(--color-tint);
    font-weight: 700;
    color: #fff;
  }

  .cart-list {
    position: absolute;
    top: 44px;
    bottom: 49px;
    width: 100%;
  }
</style>
