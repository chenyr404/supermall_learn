<template>
    <div class="toast" v-show="isShow" :style="{animationDuration:showDuration + 's'}">
      <div >{{message}}</div>
    </div>
</template>

<script>
    export default {
      name: "Toast",
      data(){
        return {
          message:'',
          isShow :false,
          showDuration:0
        }
      },
      methods: {
        show(message = '',time = 1500){
          this.isShow = true;
          this.message = message
          this.showDuration = time / 1000
          console.log(this.showDuration + ' --- ' +time);
          setTimeout(() => {
            this.isShow = false;
            this.message = ''
          },time-1)
        }
      }
    }
</script>

<style scoped>
  .toast{
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    padding:8px 10px;
    z-index: 999;
    color: #fff;
    background-color: rgba(0, 0, 0, .75);


    animation-name: displaying;
    animation-iteration-count: 1;
    animation-delay: 0s;
  }
  @keyframes displaying {
    0% {
      opacity: 0;
    }
    50%{
      opacity: 1;
    }
    100% {
      opacity: 0;
    }
  }

</style>
