<template>
    <div class="nav-bar">
      <div class="left"><slot name="left"></slot></div>
      <div class="center"><slot name="center"></slot></div>
      <div class="right"><slot name="right"></slot></div>
    </div>
</template>

<script>
    export default {
        name: "navbar"
    }
</script>

<style scoped>
  .nav-bar {
    display: flex;
    height: 42px;
    line-height: 44px;
    text-align: center;
    box-shadow: 0 1px 1px rgba(150,150,150,.1);
  }
  .left, .right{
    width: 60px;

  }
  .center {
    flex: 1;

  }
</style>
