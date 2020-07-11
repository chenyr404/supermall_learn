<template>
  <swiper>
    <swiper-item v-for="item in banners">
      <a :href="item.link">
        <img :src="item.image" alt="" @load="imageLoad">
      </a>
    </swiper-item>
  </swiper>
</template>

<script>
  import {Swiper,SwiperItem} from "components/common/swiper"
    export default {
      name: "HomeSwiper",
      components:{
        Swiper,
        SwiperItem
      },
      props:{
        banners: {
          tyep:Array,
          default() {
            return []
          }
        }
      },
      data(){
        return{
          isload:false
        }
      },
      methods:{
        imageLoad(){
            this.$emit('swiperImageLoad')
        }
      }
    }
</script>

<style scoped>

</style>
