<style scoped>
  
.box {
  height: 50px;
  padding-left:20px;
  padding-right: 20px;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  /*width: 100%;*/
  z-index: 1000;
  background-image: linear-gradient(0deg, #4D91FF 0%, #2E6BB1 100%);
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 14px;
  line-height: 20px;
  color: rgba(255, 255, 255, 0.5);
}

.zj {
  font-size: 16px;
  color: #fff;
}

.more {
  width: 0.8rem;
  height: 0.8rem;
  background: url(../res/arrow.png) center center no-repeat;
  background-size: 100% 100%;
}

</style>

<template>
  
<div class="box" @click="jumpPage">
  <div>
    <span>我的理财</span>
    <span class="zj">{{getZj}}元</span>
  </div>
  <div>
    <span>盈亏</span>
    <span>{{getSy}}</span>
  </div>
  <div class="more"></div>
</div>

</template>

<script>

import { toMoneyFormat } from "commons/func.js";
  
export default {

  data() {
    return {};
  },

  props: [
    "zj",
    "sy",
    "jumpPage",
    "zjShow"
  ],

  computed: {

    getZj: function() {
      if(this.zjShow) {
        return toMoneyFormat(this.zj, 2);
      }
      else {
        return "****";
      }
    },

    getSy: function() {
      if(this.zjShow) {
        return toMoneyFormat(this.sy, 2);  
      }
      else {
        return "****";
      }
    }
  }
}

</script>