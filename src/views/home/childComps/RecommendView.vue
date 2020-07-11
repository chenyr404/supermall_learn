<template>
  <div class="recommend">
    <div v-for="item in recommends" class="recommend-item">
      <a :href="item.link" class="item-view">
        <img :src="item.image" alt="">
        <div class="title">{{item.title}}</div>
      </a>
    </div>
  </div>
</template>

<script>

    export default {
      name: "RecommendView",
      props:{
        recommends: {
          type:Array,
          default() {
            return [];
          }
        }
      }
    }
</script>

<style scoped>
  a{
    color: var(--color-text);
    text-decoration:none;
  }
  .recommend {
    display: flex;
    padding: 25px 10px 25px 10px;
    border-bottom: 10px solid #eee;
    text-align: center;
  }
  .recommend-item{
    flex: 1;
  }

  img{
    width:70%;
  }
  .title{
    text-align: center;
    font-size: 12px;
  }

</style>
