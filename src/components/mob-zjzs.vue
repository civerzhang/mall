<style scoped>
  
  .zjzs {
    display: flex;
    height: 131px;
    background-image: linear-gradient(0deg, #4D91FF 0%, #2E6BB1 100%);
    align-items: center;
    justify-content: center;
    flex-direction: column;
  }

  .zj-span {
    display: flex;
    align-items: center;
    font-size: 14px;
    line-height: 20px;
    color: rgba(255, 255, 255, 0.5);
  }

  .zj {
    font-size: 34px;
    line-height: 48px;
    color: #fff;
  }

  .sy {
    font-size: 14px;
    line-height: 20px;
    color: #fff;
  }

  .zj-show {
    background: url(../res/show.png) center center no-repeat;
  }

  .zj-hide {
    background: url(../res/hide.png) center center no-repeat;
  }

  .zj-show,
  .zj-hide {
    height: 19px;
    width: 19px;
    background-size: 100% 100%;
    margin-left: 5px;
  }

</style>

<template>
  
  <div class="zjzs">
    <div class="zj-span">
      <span>我的理财(元)</span>
      <div :class="zjShowClass" @click="toggleZjShow"></div>
    </div>
    <div class="zj">{{getZj}}</div>
    <div class="sy">
      <span>盈亏</span>
      <span>{{getSy}}</span>
    </div>
  </div>

</template>

<script>

import {
  toMoneyFormat
} from "commons/func.js";
  
export default {

  data() {

    return {
    };
  },

  props: [
    "zj",
    "sy",
    "zjShow",
    "toggleZjShow"
  ],

  methods: {},

  computed: {

    getZj: function() {

      if(this.zjShow) {
        return toMoneyFormat(this.zj, 2);
      }
      else {
        return `****`;
      }
    },

    getSy: function() {

      if(this.zjShow) {
        return toMoneyFormat(this.sy, 2);
      }
      else {
        return `****`;
      }
    },

    zjShowClass: function() {

      if(this.zjShow) {
        return `zj-show`;
      }
      else {
        return `zj-hide`;
      }
    }
  }
}

</script>