<style scoped>
  
.box {
  display: flex;
  flex-direction: column;
  justify-content: center;
  /*align-items: center;*/
  padding: 0 20px;
  height: 100px;
  background-image: linear-gradient(0deg, #4D91FF 0%, #2E6BB1 100%);
}

.info {
  color: rgba(255, 255, 255, 0.5);
  font-size: 14px;
  line-height: 20px;
}

.row {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.zj {
  flex: 1 1 auto;
  color: #fff;
  font-size: 34px;
  line-height: 48px;
}

.btn {
  flex: 0 0 60px;
  font-size: 14px;
  color: #fff;
  border: 1px solid #ddd;
  padding: 3px 10px;
  border-radius: 3px;
}

</style>

<template>
  
<div class="box">
  
  <span class="info">账户总资产</span>
  <div class="row">
    <span class="zj" :style="getZjStyle">{{getZj}}</span>
    <span class="btn" @click = "jumpYzzz">银证转账</span>
  </div>

</div>

</template>

<script>

import {
  toMoneyFormat
} from "commons/func.js";

import {
  tdxOpenNativeModule
} from "commons/req.js";
  
export default {

  components: {},
  props: [
    "zj"
  ],
  data() {

    return {};
  },

  methods: {

    jumpYzzz: function(e) {

      e.stopPropagation();
      e.preventDefault();

      tdxOpenNativeModule({
        OpenID: "Stock.yzyw.yzzz"
      });
    }
  },

  computed: {

    getZj: function() {

      return toMoneyFormat(this.zj, 2);
    },

    getZjStyle: function() {

      let wd = $(window).width();
      // alert(`${wd}|${this.zj.length}`);
      let zjw = this.zj.length * 22;
      if(wd < zjw + 100) {
        return {
          fontSize: "26px"
        }
      }
      else {
        return "";
      }
    }
  }
}

</script>