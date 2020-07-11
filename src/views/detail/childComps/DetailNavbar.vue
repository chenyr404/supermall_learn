<template>
    <div>
        <navbar>
          <div slot="left" class="back" @click="backClick">
            <img src="~assets/img/common/back.svg" alt="">
          </div>
          <div slot="center" class="title">
            <div v-for="(item,index) in titles" class="title-item" :class="{active:currentIndex == index}" @click="itemclick(index)">{{item}}</div>
          </div></navbar>
    </div>
</template>

<script>
  import navbar from "components/common/navbar/navbar";
    export default {
      name: "DetailNavbar",
      components:{
        navbar
      },
      data(){
        return{
          titles:['商品','参数','评论','推荐'],
          currentIndex:0
        }
      },
      props:{
        navindex:{
          type:Number,
          default(){
            return 0
          }
        }
      },
      created() {
        console.log(navbar);
      },
      methods:{
        itemclick(index){
          this.currentIndex=index
          this.$emit('titleClick',index)
        },
        backClick(){
          this.$router.back()
        },
        changeitem(index){
          this.currentIndex=index
          //console.log(index);
        }
      }
    }
</script>

<style scoped>
  .title{
    display: flex;
    font-size: 12px;
  }
  .title-item{
    flex: 1;
  }
  .active{
    color: var(--color-hight-text);
  }
  .back{
    margin-top: 9px;
  }
</style>
