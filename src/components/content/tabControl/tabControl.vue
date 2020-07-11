<template>
    <div class="tab-control">
      <div v-for="(item,index) in titles"
           class="tab-control-item" :class="{active: index == nowindex}" @click="Itemclick(index)">
        <span >{{item}}</span>
      </div>
    </div>
</template>

<script>
    export default {
      name: "tabControl",
      props: {
        titles:{
          type: Array,
          default(){
            return []
          }
        }
      },
      data() {
        return{
          nowindex: 0
        }
      },
      methods:{
        Itemclick(i){
          this.nowindex = i;
          this.$emit('tabClick',i);
        }
      }
    }
</script>

<style scoped>
  .tab-control {
    display: flex;
    text-align: center;
    font-size: 15px;
    background-color: #fff;
  }
  .tab-control-item{
    flex: 1;
    height: 40px;
    line-height: 40px;
  }
  .tab-control-item span {
    padding-bottom: 7px;
    padding-left: 10px;
    padding-right: 10px;
  }
  .active {
    color: var(--color-hight-text);
  }
  .active span {
    border-bottom: 3px solid var(--color-tint);

  }
</style>
