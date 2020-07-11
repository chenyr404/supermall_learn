<template>
    <div id="detail">
      <detail-navbar class="detail-nav" @titleClick="titleClick" ref="detailnavbar"></detail-navbar>
      <scroll class="content" ref="scroll" :probe-type="3" @scroll="contentScroll">
        <DetailSwiper :topImages="topImages"></DetailSwiper>
        <detail-base-info :goods="goods"></detail-base-info>
        <detail-shop-info :shop="shop"></detail-shop-info>
        <detail-goods-info :detail-info="detailInfo"  @imageLoad="imageLoad"></detail-goods-info>
        <detail-param-info ref="params" :param-info="paramInfo"></detail-param-info>
        <detail-comment-info ref="comment" :comment-info="commentInfo"></detail-comment-info>
        <goodslist ref="recommends" :goods="recommends"/>
      </scroll>
      <backtop class="backtop"  @click.native="backClick" v-show="isShowBackUp"></backtop>
      <detail-bottom-bar @addToCart="addToCart"></detail-bottom-bar>
    </div>
</template>

<script>
  import DetailNavbar from "./childComps/DetailNavbar";
  import DetailSwiper from "./childComps/DetailSwiper";
  import DetailBaseInfo from "./childComps/DetailBaseInfo";
  import DetailShopInfo from "./childComps/DetailShopInfo";
  import DetailGoodsInfo from "./childComps/DetailGoodsInfo";
  import DetailParamInfo from "./childComps/DetailParamInfo";
  import DetaiImageInfo from "./childComps/DetaiImageInfo";
  import DetailBottomBar from "./childComps/DetailBottomBar";
  import DetailCommentInfo from "./childComps/DetailCommentInfo";

  import Goodslist from "components/content/goods/Goodslist";
  import Scroll from "components/common/scroll/Scroll";


  import {debouce} from "common/utils";
  import {BackTop} from "common/mixin";

  import {getDetail,Goods,Shop,GoodsParam,getRecommend} from "network/detail";

  export default {
      name: "Detail",
      components:{
        DetailNavbar,
        DetailSwiper,
        DetailBaseInfo,
        DetailShopInfo,
        DetailGoodsInfo,
        DetailParamInfo,
        DetaiImageInfo,
        DetailBottomBar,
        DetailCommentInfo,
        Scroll,
        Goodslist,
      },
    mixins:[BackTop],
    data(){
        return{
          iid:null,
          topImages:[],
          goods:{},
          shop:{},
          detailInfo:{},
          paramInfo:{},
          commentInfo:{},
          recommends:[],
          themeTopY:[],
          getThemeTopY:null,
          currentIndex:0,

        }
      },
      created() {
        this.iid = this.$route.query.iid
        getDetail(this.iid).then(res =>{
          //console.log(res);
          const data = res.result
          this.topImages = data.itemInfo.topImages

          this.goods = new Goods(data.itemInfo,data.columns,data.shopInfo.services)

          this.shop = new Shop(data.shopInfo)

          this.detailInfo = data.detailInfo

          this.paramInfo = new GoodsParam(data.itemParams.info,data.itemParams.rule)

          if(data.rate.cRate !== 0){

          this.commentInfo = data.rate.list[0];
        }
          this.$nextTick(() => {

          })
          this.getThemeTopY = debouce(() => {
            this.themeTopY = []
            this.themeTopY.push(0)
            this.themeTopY.push(this.$refs.params.$el.offsetTop-42)
            this.themeTopY.push(this.$refs.comment.$el.offsetTop-42)
            this.themeTopY.push(this.$refs.recommends.$el.offsetTop-42)
            this.themeTopY.push(Number.MAX_VALUE)


          },100)

        })

        getRecommend().then(res => {
          //console.log(res);
          this.recommends = res.data.list
        })
      },
      methods:{
        imageLoad(){
          const refresh = debouce(this.$refs.scroll && this.$refs.scroll.getrefresh,100)
          refresh()
          this.getThemeTopY()
        },
        titleClick(index){
          //console.log(index);
          this.$refs.scroll.getscrollTo(0,-this.themeTopY[index],200)
          //console.log(this.themeTopY[index]);
        },
        contentScroll(position){
         // console.log(Math.floor(-position.y));
          let length = this.themeTopY.length
          for(let i = 0;i < length-1;i++){
            if(this.currentIndex !== i && (i < length && (-position.y) >= this.themeTopY[i] && (-position.y) < this.themeTopY[i+1])){
              this.currentIndex = i
              this.$refs.detailnavbar.changeitem(i)
            }
          }
          this.ListerShowBackTop(position)

        },
        addToCart(){
          const product = {}
          product.image = this.topImages[0];
          product.title = this.goods.title;
          product.desc = this.goods.desc;
          product.price = this.goods.realPrice;
          product.iid = this.iid;
          //console.log(product);
          //this.$store.commit('addCart',product)
          this.$store.dispatch('addCart',product).then(res => {
            this.$toast.show(res,1500);
          })
        }
      },
      updated() {

      },
    mounted() {
        let newRefresh = debouce(this.$refs.scroll.getrefresh,100)

        this.$bus.$on('itemImgLoad',() => {
          newRefresh()
        })
      },
  }
</script>

<style scoped>
  #detail{
    position: relative;
    z-index: 1;
    background-color: #fff;
    height: 100vh;
  }
  .detail-nav{
    position: relative;
    z-index: 9;
    background-color: #fff;
  }
  .content {
    background-color: #fff;
    height: calc(100% - 42px);
  }
</style>
