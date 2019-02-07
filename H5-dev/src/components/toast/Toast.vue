<template>
  <div class="toast text-center" v-if="showWrap" :class="showContent ? 'fadein' : 'fadeout'">
    <span>{{ text }}</span>
  </div>
</template>

<style lang="less" scoped>
.toast {
  position: fixed;
  width: 100%;
  height: 48px;
  top: 0;
  left: 0;
  z-index: 1000;
  > span {
    display: inline-block;
    width: auto;
    min-width: 200px;
    height: 100%;
    background: rgb(50, 50, 50);
    padding: 14px 24px;
    border-radius: 2px;
    color: #fff;
    font-size: 14px;
    box-shadow: 0px 3px 5px -1px rgba(0,0,0,0.2), 0px 6px 10px 0px rgba(0,0,0,0.14), 0px 1px 18px 0px rgba(0,0,0,0.12);
  }
}
.fadein {
  animation: animate_in 0.25s;
}
.fadeout {
  animation: animate_out 0.25s;
  top: -60px;
}
@keyframes animate_in {
  0% {
    top: -60px;
  }
  100%{
    top: 0;
  }
}
@keyframes animate_out {
  0% {
    top: 0;
  }
  100%{
    top: -60px;
  }
}
</style>