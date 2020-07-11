<template>
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
  import BScroll from 'better-scroll'
  export default {
    name: "Scroll",
    props:{
      probeType: {
        type: Number,
        dafault:0
      },
      pullUpload: {
        type: Boolean,
        default:false
      }
    },
    data(){
      return{
        scroll: null,
      }
    },
    mounted() {
      this.scroll = new BScroll(this.$refs.wrapper,{
        click:true,
        probeType:this.probeType,
        pullUpLoad:this.pullUpload
      })
      this.scroll.on('scroll',(position) => {
        //console.log(position);
        this.$emit('scroll',position)
      })
      if(this.pullUpload){
        this.scroll.on('pullingUp',() => {
          this.$emit('pullingUp')
        })
      }
    },
    methods:{
      getscrollTo(x,y,time=300){
        this.scroll && this.scroll.scrollTo && this.scroll.scrollTo(x,y,time)
      },
      getrefresh(){
        console.log('------');
        this.scroll && this.scroll.refresh()
      },
      finishPullUp(){
        this.scroll && this.scroll.finishPullUp()
      }
    }
  }
</script>

<style scoped>

</style>
