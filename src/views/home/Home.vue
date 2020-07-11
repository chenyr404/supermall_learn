<template>
  <div id="home">
    <navbar class="home-nav"><div slot="center">购物街</div></navbar>
    <tab-control :titles="['流行','新款','精选']"
                 @tabClick="tabClick" ref="tabcontrol1"
                 class="tabcon" v-show="isTabFixed"/>
    <Scroll class="content" ref="scroll"
            :probe-type="3" @scroll="contentScroll"
            :pull-upload="true"
            @pullingUp="loadMore">
      <HomeSwiper :banners="banners" @swiperImageLoad="ImageLoad"/>
      <RecommendView :recommends="recommends"/>
      <PopularView/>
      <tab-control :titles="['流行','新款','精选']"
                   @tabClick="tabClick" ref="tabcontrol2" />
      <Goodslist :goods="showgoods"/>
    </Scroll>
    <backtop class="backtop" @click.native="backClick" v-show="isShowBackUp"/>
  </div>
</template>

<script>
  import navbar from "components/common/navbar/navbar";
  import tabControl from "components/content/tabControl/tabControl";
  import Goodslist from "components/content/goods/Goodslist";
  import Scroll from "components/common/scroll/Scroll";

  import HomeSwiper from "./childComps/HomeSwiper";
  import RecommendView from "./childComps/RecommendView";
  import PopularView from "./childComps/PopularView";

  import {BackTop} from "common/mixin";
  import {debouce} from "common/utils";
  import {getHomeMultidata,getHomeGoods} from "network/homereq";


  export default {
      name: "Home",
      components:{
        Scroll,
        navbar,
        HomeSwiper,
        RecommendView,
        PopularView,
        tabControl,
        Goodslist
      },
    mixins:[BackTop],
    data(){
        return{
          banners:[],
          recommends:[],
          goods: {
            'pop': {page: 0,list:[]},
            'new': {page: 0,list:[]},
            'sell':{page: 0,list:[]}
          },
          currentType: 'pop',
          tabOffsetTop:0,
          isTabFixed: false,
          nowposition:0
        }
      },
    created() {
      this.getHomeMultidata();
      this.getHomeGoods('pop');
      this.getHomeGoods('new');
      this.getHomeGoods('sell');
    },
    mounted() {
      //监听图片加载完成
      const refresh = debouce(this.$refs.scroll && this.$refs.scroll.getrefresh,50)
      this.$bus.$on('itemimageLoad',() => {
        refresh()
      })
    },
    computed:{
        showgoods(){
          return this.goods[this.currentType].list
        },

      },
    activated() {
      this.$refs.scroll.getrefresh()
      this.$refs.scroll.getscrollTo(0,this.nowposition,0)
    },
    deactivated() {
      console.log(this.$refs.scroll);
      this.nowposition = this.$refs.scroll.scroll.y
    },
    methods:{
        /**
         * 事件监听
         */
        ImageLoad(){
          this.tabOffsetTop = this.$refs.tabcontrol2.$el.offsetTop
          //console.log(this.$refs.tabcontrol.$el.offsetTop);
        },
        loadMore(){
          this.getHomeGoods(this.currentType)
        },
        tabClick(index){
         //console.log(index);
          switch (index) {
            case 0:
              this.currentType = 'pop'
              this.$refs.scroll.getscrollTo(0,-this.tabOffsetTop)
              break
            case 1:
              this.currentType = 'new'
              this.$refs.scroll.getscrollTo(0,-this.tabOffsetTop)
              break
            case 2:
              this.currentType = 'sell'
              this.$refs.scroll.getscrollTo(0,-this.tabOffsetTop)
          }
          this.$refs.tabcontrol1.nowindex = index
          this.$refs.tabcontrol2.nowindex = index
        },
        contentScroll(position){

          this.isTabFixed = (-position.y) > this.tabOffsetTop

          this.ListerShowBackTop(position)
          //this.nowposition = -position.y
          //console.log(position.y +" -- "+ this.nowposition);
        },

        /**
         * 网络请求
         */
        getHomeMultidata(){
          getHomeMultidata().then(res => {
            this.banners = res.data.banner.list;
            this.recommends = res.data.recommend.list;
            this.$refs.scroll.getrefresh()
          })
        },
        getHomeGoods(type) {
          const page = this.goods[type].page + 1;
          getHomeGoods(type,page).then(res => {
            this.goods[type].list.push(...res.data.list)
            //this.goods[type].list.concat(res.data.list)
            this.goods[type].page += 1

            this.$refs.scroll.finishPullUp()
          })
        }
      }
  }
</script>

<style scoped>

  #home{
    height: 100vh;
    position: relative;
  }

  .home-nav {
    color: #fff;
    background-color: var(--color-tint);
    box-shadow: 0px 2px 10px rgba(100,100,100,.2);
  }

  .tabcon {
    margin-top: -2px;
    position: relative;
    box-shadow: 0px 1px 10px rgba(100,100,100,.2);
    z-index: 9;
  }

  .content {
    position: absolute;
    /*height: calc(100% - 93px);*/
    overflow: hidden;
    top:42px;
    bottom: 49px;
    left: 0;
    right: 0;
  }

</style>
